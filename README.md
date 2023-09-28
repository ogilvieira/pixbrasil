# PIX BR 🇧🇷

[![Tests](https://github.com/ogilvieira/pixbrasil/actions/workflows/main.yml/badge.svg)](https://github.com/ogilvieira/pixbrasil/actions/workflows/main.yml)
[![npm-version](https://img.shields.io/npm/v/pixbrasil?color=brightgreen&label=npm%20package)](https://www.npmjs.com/package/pixbrasil)

Gerador de código do Pix Brasileiro estático. Para gerar o QrCode indicamos usar o pacote [node-qrcode](https://github.com/soldair/node-qrcode) ou qualquer outro que desejar.

[en] Brazilian Pix static code generator. To generate the QrCode, we recommend using the [node-qrcode](https://github.com/soldair/node-qrcode) package or another package you wish.

## Installation / Instalação
```
yarn add pix-br
// or
npm install pix-br --save
```

## Usage / Uso
```typescript
import { PixBR } from 'pixbrasil';
// const { PixBR } = require('pixbrasil');

const pixCode = PixBR({
  key: 'person@email.com', //or any PIX key
  name: 'João da Silva',
  city: 'SAO PAULO',
  transactionId: 'PIXBR_TRANSACTION_ID', //optional, max 25 characters
  message: 'E O Pix, Nada Ainda?', //optional
  amount: 13.37 //optional
})

console.log(pixCode); // '00020126420014BR.GOV.BCB.PIX...'
```
## Options / Opções
|Option|Default|Description|
|------|----|-----------|
|payloadVersion (optional) | "01" | Payload Version, string with 2 numbers. |
|key| undefined | The pix key, such as: CPF, CNPJ, E-mail or random key |
|city (optional) | undefined | Uppercase city name with max 15 characters |
|name| undefined | The merchant name |
|amount (optional) | undefined | A positive number or none for open value |
|transactionId (optional) | *** | A string with 25 characters just including A-Z (uppercase withou accents) and numbers |
|postalCode (optional) | undefined | A string with exact 8 characters (See: [CEP](https://pt.wikipedia.org/wiki/C%C3%B3digo_de_Endere%C3%A7amento_Postal) the brazilian postal code.) |
|currencyCode (optional) | "986" | See [ISO-4217](https://pt.wikipedia.org/wiki/ISO_4217) |
|countryCode (optional) | "BR" | See [ISO-3166-1 alfa 2](https://pt.wikipedia.org/wiki/ISO_3166-1) |

## Specs / Especificação
Especificação baseada nos documentos do Bacen: [Manual do BR Code](https://www.bcb.gov.br/content/estabilidadefinanceira/spb_docs/ManualBRCode.pdf) e [Manual de Padrões
para Iniciação do Pix 2.6.3](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/II_ManualdePadroesparaIniciacaodoPix.pdf)
