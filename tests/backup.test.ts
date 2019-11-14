import { Backup } from "../entities/backup";
import { encryptedData, testPublicKey } from "./test.data";


describe('Backup Entity', () => {

  it('should test backup constructor', () => {
    const backupObj = Backup.fromData(encryptedData);
    expect(backupObj.publicKey).toBe(testPublicKey)
  });

  it('should throw an error when data is not correct', () => {
    expect(()=> Backup.fromData('not a backup string')) .toThrow()
  });
});