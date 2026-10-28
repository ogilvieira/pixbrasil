import { crc16ccitt } from 'crc';

export interface PixBRParams {
  payloadVersion?: string;
  key: string;
  city: string;
  name: string;
  amount?: number;
  transactionId?: string;
  message?: string;
  postalCode?: string;
  currencyCode?: string; //ISO-4217
  countryCode?: string; //ISO-3166-1 alfa 2
}

export function PixBR({
  payloadVersion = '01',
  key,
  city,
  name,
  amount,
  transactionId = '***',
  message,
  postalCode,
  currencyCode = '986',
  countryCode = 'BR'
}: PixBRParams) {

  if(payloadVersion !== '01') { throw Error("Payload Version: not supported."); }
  if(!/^[A-Z]{2}$/.test(countryCode)) { throw Error("Country Code: must be 2 uppercase characters (ISO-3166 alfa 2)."); }
  if(typeof currencyCode === 'string' && !/^[0-9]{3}$/.test(currencyCode)) { throw Error("Currency Code: must be a string with 3 numbers between 000 and 999 (ISO-4217)."); }
  if(postalCode !== undefined && !/^[0-9]{8}$/.test(postalCode)){ throw Error("Postal Code: must be 8 numbers.")}
  if(amount !== undefined && (!Number.isFinite(amount) || amount < 0)) { throw Error("Amount: must be a positive decimal number."); }
  if(amount && amount.toFixed(2).length > 13) { throw Error("Amount: must have max 13 characters."); }
  if(transactionId !== '***' && (transactionId.length > 25 || !/^[A-Z0-9]{1,25}$/.test(transactionId))){ throw Error("Transaction ID: must have max 25 characters just including A-Z (uppercase without accents) and numbers."); }
  if(!key || !/^[\x21-\x7E]+$/.test(key)) { throw Error("Key: must be a non empty string without spaces or special characters."); }

  const normalizedName = normalizePayloadString(name, 25);
  const normalizedCity = normalizePayloadString(city, 15);
  if(!normalizedName) { throw Error("Name: must not be empty."); }
  if(!normalizedCity) { throw Error("City: must not be empty."); }

  const keyStrPayload = [createEMV('00', 'BR.GOV.BCB.PIX'), createEMV('01', key)];
  const merchantAccountSize = keyStrPayload.join('').length;
  if(merchantAccountSize > MAX_EMV_VALUE_SIZE) { throw Error(`Key: must have max ${MAX_EMV_VALUE_SIZE - (merchantAccountSize - key.length)} characters.`); }

  // Message shares the 99 characters of field 26 with GUI and key
  const messageMaxSize = MAX_EMV_VALUE_SIZE - merchantAccountSize - 4;
  const normalizedMessage = message ? normalizePayloadString(message, messageMaxSize, false) : '';
  if( normalizedMessage ) { keyStrPayload.push(createEMV('02', normalizedMessage)); }

  const strPayload: string = [
    createEMV('00', payloadVersion),
    createEMV('26', keyStrPayload.join('')),
    createEMV('52', '0000'),
    createEMV('53', currencyCode),
    (amount ? createEMV('54', amount.toFixed(2)) : ''),
    createEMV('58', countryCode),
    createEMV('59', normalizedName),
    createEMV('60', normalizedCity),
    (postalCode ? createEMV('61', postalCode) : ''),
    createEMV('62', createEMV('05', transactionId)),
    '6304'
  ].filter(a => !!a).join('');

  const crcPayload = crc16ccitt(strPayload).toString(16).toUpperCase().padStart(4, '0');
  const payloadPIX = `${strPayload}${crcPayload}`;

  return payloadPIX;
}

const MAX_EMV_VALUE_SIZE = 99;

const createEMV = (keyId: string, keyValue: string): string => {
  const length = keyValue.length.toString().padStart(2, '0');
  return `${keyId}${length}${keyValue}`;
}

const normalizePayloadString = ( str: string, maxSize: number = Infinity, upper: boolean = true ) => {
  const res = String(str)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7E]/g, '')
    .trim()
    .substring(0, maxSize)
    .trim();

  return upper ? res.toUpperCase() : res;
}

export default PixBR;

