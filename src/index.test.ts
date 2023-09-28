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

  it('Test invalid Transaction Id spaces', async () => {
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
