import { Backup } from "../entities/backup";
import { encryptedData, publicKey } from "./test.data";


describe('Backup Entity', () => {

  it('should test backup constructor', () => {
    const backupObj = Backup.fromData(encryptedData);
    expect(backupObj.publicKey).toBe(publicKey)
  });

  it('should throw an error when data is not correct', () => {
    expect(()=> Backup.fromData('not a backup string')) .toThrow()
  });
});