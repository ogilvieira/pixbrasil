import { PixBR, PixBRParams } from "./index";

describe('Pix BR generator: Payload', () => {

  it('Test invalid payload version', async () => {
    const param: PixBRParams = {
      payloadVersion: '02',
      key: 'ogilvieira@gmail.com',
      name: 'Gilmair Vieira',
      city: 'SAO PAULO',
    };

    expect(() => PixBR(param)).toThrow();
  })

  it('Valid Payload', async () => {
    const response = PixBR({
      payloadVersion: '01',
      key: 'ogilvieira@gmail.com',
      name: 'Gilmair Vieira',
      city: 'SAO PAULO',
    });
    expect(response).toBe(
      '00020126420014BR.GOV.BCB.PIX0120ogilvieira@gmail.com5204000053039865802BR5914GILMAIR VIEIRA6009SAO PAULO62070503***6304097A'
    );
  });
});

describe('Pix BR generator: Currency Code', () => {
  it('Test invalid Currency Codes', async () => {
    const param: PixBRParams = {
      key: 'ogilvieira@gmail.com',
      name: 'Gilmair Vieira',
      city: 'SAO PAULO',
      currencyCode: 'BRL'
    };

    expect(() => PixBR(param)).toThrow();
  })

  it('Valid Currency', async () => {
    const response = PixBR({
        key: 'ogilvieira@gmail.com',
        name: 'Gilmair Vieira',
        city: 'SAO PAULO',
        currencyCode: '986'
    });
    expect(response).toBe(
      '00020126420014BR.GOV.BCB.PIX0120ogilvieira@gmail.com5204000053039865802BR5914GILMAIR VIEIRA6009SAO PAULO62070503***6304097A'
    );
  });
});

describe('Pix BR generator: Country Code', () => {
  it('Test invalid Country Code', async () => {
    const param: PixBRParams = {
      key: 'ogilvieira@gmail.com',
      name: 'Gilmair Vieira',
      city: 'SAO PAULO',
      countryCode: '55'
    };

    expect(() => PixBR(param)).toThrow();
  })

  it('Valid Country Code', async () => {
    const response = PixBR({
        key: 'ogilvieira@gmail.com',
        name: 'Gilmair Vieira',
        city: 'SAO PAULO',
        amount: 324.12,
        countryCode: 'BR',
    });
    expect(response).toBe(
      '00020126420014BR.GOV.BCB.PIX0120ogilvieira@gmail.com5204000053039865406324.125802BR5914GILMAIR VIEIRA6009SAO PAULO62070503***6304567B'
    );
  });
});

describe('Pix BR generator: Amount', () => {
  it('Test negative Amount', async () => {
    const param: PixBRParams = {
      key: 'ogilvieira@gmail.com',
      name: 'Gilmair Vieira',
      city: 'SAO PAULO',
      amount: -10.00
    };

    expect(() => PixBR(param)).toThrow();
  })

  it('Valid Amount', async () => {
    const response = PixBR({
        key: 'ogilvieira@gmail.com',
        name: 'Gilmair Vieira',
        city: 'SAO PAULO',
        amount: 324.12
    });
    expect(response).toBe(
      '00020126420014BR.GOV.BCB.PIX0120ogilvieira@gmail.com5204000053039865406324.125802BR5914GILMAIR VIEIRA6009SAO PAULO62070503***6304567B'
    );
  });

});

describe('Pix BR generator: Transaction Id', () => {
  it('Test invalid Transaction Id spaces', async () => {
    const param: PixBRParams = {
      key: 'ogilvieira@gmail.com',
      name: 'Gilmair Vieira',
      city: 'SAO PAULO',
      transactionId: "PIXbr 1337"
    };

    expect(() => PixBR(param)).toThrow();
  })

  it('Test invalid Transaction Id accents', async () => {
    const param: PixBRParams = {
      key: 'ogilvieira@gmail.com',
      name: 'Gilmair Vieira',
      city: 'SAO PAULO',
      transactionId: "PÍXbrã1337"
    };

    expect(() => PixBR(param)).toThrow();
  })

  it('Test invalid Transaction Id lower case', async () => {
    const param: PixBRParams = {
      key: 'ogilvieira@gmail.com',
      name: 'Gilmair Vieira',
      city: 'SAO PAULO',
      transactionId: 'PIXbr1337',
    };

    expect(() => PixBR(param)).toThrow();
  });

  it('Valid Transaction ID', async () => {
    const response = PixBR({
      key: 'ogilvieira@gmail.com',
      name: 'Gilmair Vieira',
      city: 'SAO PAULO',
      transactionId: 'PIXBR1337',
    });

    expect(response).toBe(
      '00020126420014BR.GOV.BCB.PIX0120ogilvieira@gmail.com5204000053039865802BR5914GILMAIR VIEIRA6009SAO PAULO62130509PIXBR133763043CA1'
    );
  });
});

describe('Pix BR generator: Postal Code', () => {
  it('Test invalid PostalCode', async () => {
    const param: PixBRParams = {
      key: 'ogilvieira@gmail.com',
      name: 'Gilmair Vieira',
      city: 'SAO PAULO',
      postalCode: '05210-130'
    };

    expect(() => PixBR(param)).toThrow();
  })

  it('Valid Postal Code', async () => {
    const response = PixBR({
        key: 'ogilvieira@gmail.com',
        name: 'Gilmair Vieira',
        city: 'SAO PAULO',
        postalCode: '05210130',
        amount: 324.12,
        countryCode: 'BR',
    });

    expect(response).toBe(
      '00020126420014BR.GOV.BCB.PIX0120ogilvieira@gmail.com5204000053039865406324.125802BR5914GILMAIR VIEIRA6009SAO PAULO61080521013062070503***630426F5'
    );
  });
});

describe('Pix BR generator: Message', () => {
  it('Valid Message', async () => {
    const response = PixBR({
        key: 'ogilvieira@gmail.com',
        name: 'Gilmair Vieira',
        city: 'SAO PAULO',
        message: 'Incrível como o PIX BR funciona :)',
    });

    expect(response).toBe(
      '00020126800014BR.GOV.BCB.PIX0120ogilvieira@gmail.com0234Incrivel como o PIX BR funciona :)5204000053039865802BR5914GILMAIR VIEIRA6009SAO PAULO62070503***6304501D'
    );
  });
});

const baseParams: PixBRParams = {
  key: 'ogilvieira@gmail.com',
  name: 'Gilmair Vieira',
  city: 'SAO PAULO',
};

const readEMV = (payload: string, id: string): string | undefined => {
  let i = 0;
  while (i < payload.length) {
    const fieldId = payload.substring(i, i + 2);
    const size = Number(payload.substring(i + 2, i + 4));
    const value = payload.substring(i + 4, i + 4 + size);
    if (fieldId === id) { return value; }
    i += 4 + size;
  }
  return undefined;
}

describe('Pix BR generator: Field sizes', () => {
  it('Truncates long message to fit merchant account field (max 99)', async () => {
    const response = PixBR({ ...baseParams, message: 'x'.repeat(120) });
    const merchantAccount = readEMV(response, '26');

    expect(response.substring(6, 8)).toBe('26');
    expect(Number(response.substring(8, 10))).toBeLessThanOrEqual(99);
    expect(merchantAccount).toBe('0014BR.GOV.BCB.PIX0120ogilvieira@gmail.com0253' + 'x'.repeat(53));
  });

  it('Test key too long for merchant account field', async () => {
    expect(() => PixBR({ ...baseParams, key: 'a'.repeat(78) })).toThrow();
  });

  it('Removes non ASCII characters from message', async () => {
    const response = PixBR({ ...baseParams, message: 'oi 😀 ção' });
    expect(readEMV(readEMV(response, '26')!, '02')).toBe('oi  cao');
  });

  it('Test non ASCII key', async () => {
    expect(() => PixBR({ ...baseParams, key: 'joão@email.com' })).toThrow();
  });

  it('Normalizes before truncating name', async () => {
    const decomposed = 'Á'.repeat(25);
    const response = PixBR({ ...baseParams, name: decomposed });
    expect(readEMV(response, '59')).toBe('A'.repeat(25));
  });
});

describe('Pix BR generator: Strict formats', () => {
  it('Test invalid payload version containing 01', async () => {
    expect(() => PixBR({ ...baseParams, payloadVersion: '0101' })).toThrow();
  });

  it('Test country code with extra characters', async () => {
    expect(() => PixBR({ ...baseParams, countryCode: 'BR US' })).toThrow();
  });

  it('Test currency code with extra characters', async () => {
    expect(() => PixBR({ ...baseParams, currencyCode: '986 1' })).toThrow();
  });

  it('Test postal code with extra characters', async () => {
    expect(() => PixBR({ ...baseParams, postalCode: '05210130 abc' })).toThrow();
  });
});

describe('Pix BR generator: Amount limits', () => {
  it('Test NaN amount', async () => {
    expect(() => PixBR({ ...baseParams, amount: NaN })).toThrow();
  });

  it('Test Infinity amount', async () => {
    expect(() => PixBR({ ...baseParams, amount: Infinity })).toThrow();
  });

  it('Test amount longer than 13 characters', async () => {
    expect(() => PixBR({ ...baseParams, amount: 1e12 })).toThrow();
  });

  it('Accepts amount with exactly 13 characters', async () => {
    const response = PixBR({ ...baseParams, amount: 9999999999.99 });
    expect(readEMV(response, '54')).toBe('9999999999.99');
  });
});

describe('Pix BR generator: Required fields', () => {
  it('Test empty key', async () => {
    expect(() => PixBR({ ...baseParams, key: '' })).toThrow();
  });

  it('Test empty name', async () => {
    expect(() => PixBR({ ...baseParams, name: '' })).toThrow();
  });

  it('Test empty city', async () => {
    expect(() => PixBR({ ...baseParams, city: '   ' })).toThrow();
  });
});
