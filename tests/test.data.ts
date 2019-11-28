export const testPublicKey = '03f4c207a45a212b36d8bb08c05a72c59d4e4734aee7cb276d8de4133e764fa650';
export const testDate = '2019-11-14T19:48:45.940Z';
// export const testPrivateKey = 'aae95adabdd61b9d3cec73f0932e05b1f1ce2aba2f198b6eaabfbc5d1b5667d3'


export const authData = {
  pubKey:
  testPublicKey,
  date: testDate,
  sig:
    '3cc802c9c74fb43df75918f25c7d53343058d9dfc86c0614fc6325477d4b0b162880ebb345813d7ac33cf2618513af5aca9d7dd10bdf647750b8c2df405d3ad5'
};

export const encryptedData = {
  keys: [
    {
      pubKey: testPublicKey,
      cipher: 'cipher text of encryption key',
    }
  ],
  data: 'some encrypted data'
};