import * as bcrypt from 'bcryptjs';

class EncryptPassword {

    /**
     * @param {string} password The password to be encrypted.
     * @returns A promise with encrypted password (string) or rejected with an Error.
     */
    public async encryptPassword(password: string): Promise<any> {
        try {
            const salt = await bcrypt.genSalt(12);
            const hash = await bcrypt.hash(password, salt);
            return Promise.resolve(hash);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * @param {string} password The password to be encrypted.
     * @param {string} savedPassword The password to be compared against.
     * @returns A promise with the comparison (boolean) or rejected with an Error.
     */
    public async comparePassword(password: string, savedPassword: string): Promise<any> {
        try {
            const result = await bcrypt.compare(password, savedPassword);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }

}

const encryptPassword = new EncryptPassword;
export { encryptPassword };