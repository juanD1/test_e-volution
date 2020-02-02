"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
class EncryptPassword {
    /**
     * @param {string} password The password to be encrypted.
     * @returns A promise with encrypted password (string) or rejected with an Error.
     */
    encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt.genSalt(12);
                const hash = yield bcrypt.hash(password, salt);
                return Promise.resolve(hash);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    /**
     * @param {string} password The password to be encrypted.
     * @param {string} savedPassword The password to be compared against.
     * @returns A promise with the comparison (boolean) or rejected with an Error.
     */
    comparePassword(password, savedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield bcrypt.compare(password, savedPassword);
                return Promise.resolve(result);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
}
const encryptPassword = new EncryptPassword;
exports.encryptPassword = encryptPassword;
//# sourceMappingURL=EncryptPassword.js.map