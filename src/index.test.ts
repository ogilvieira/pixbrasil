import { PixBR, PixBRParams } from "./index";

describe('Payload Version', () => {

  it('Test invalid payload version', async () => {
    const param: PixBRParams = {
      payloadVersion: '02',
      key: 'ogilvieira@gmail.com',
      name: 'Gilmair Vieira',
      city: 'SAO PAULO',
    };

    expect(() => PixBR(param)).toThrow();
  })


  it('Test invalid Currency Codes', async () => {
    const param: PixBRParams = {
      key: 'ogilvieira@gmail.com',
      name: 'Gilmair Vieira',
      city: 'SAO PAULO',
      currencyCode: 'BRL'
    };

    expect(() => PixBR(param)).toThrow();
  })

  it('Test invalid Country Codes', async () => {
    const param: PixBRParams = {
      key: 'ogilvieira@gmail.com',
      name: 'Gilmair Vieira',
      city: 'SAO PAULO',
      countryCode: '55'
    };

    expect(() => PixBR(param)).toThrow();
  })

  it('Test invalid Amount', async () => {
    const param: PixBRParams = {
      key: 'ogilvieira@gmail.com',
      name: 'Gilmair Vieira',
      city: 'SAO PAULO',
      amount: -10.00
    };

    expect(() => PixBR(param)).toThrow();
  })

  it('Test invalid Transaction Id', async () => {
    const param: PixBRParams = {
      key: 'ogilvieira@gmail.com',
      name: 'Gilmair Vieira',
      city: 'SAO PAULO',
      transactionId: "Lorem ipsum dolor sit amet."
    };

    expect(() => PixBR(param)).toThrow();
  })

  it('Valid Payload', async () => {
    const response = PixBR({
        key: 'ogilvieira@gmail.com',
        name: 'Gilmair Vieira',
        city: 'SAO PAULO',
    });
    expect(response).toBe(
      '00020126420014BR.GOV.BCB.PIX0120ogilvieira@gmail.com5204000053039865802BR5914GILMAIR VIEIRA6009SAO PAULO62070503***6304097A'
    );
  });

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
