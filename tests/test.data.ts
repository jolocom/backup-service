export const testPublicKey = '03f4c207a45a212b36d8bb08c05a72c59d4e4734aee7cb276d8de4133e764fa650';
export const testDate = '2019-11-14T19:48:45.940Z';
// export const testPrivateKey = 'aae95adabdd61b9d3cec73f0932e05b1f1ce2aba2f198b6eaabfbc5d1b5667d3'


export const authData = {
  pubKey:
  testPublicKey,
  date: testDate,
  sig:
    '3043022035b2d043167ec6603dcd4f323b19e71405f5355ab7ce8dd8c91f4fdc6494ca1a021f628ee7e0c24af05cf5f134d0bc97a9680a9d4551b845143945fc49158f4ba2'
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