"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const Identifiers_1 = require("../dependency_injection/constants/Identifiers");
const errorHandler_1 = require("../handlers/errorHandler");
const errorConstants_1 = require("../common/constants/errorConstants");
const EncryptPassword_1 = require("../utils/EncryptPassword");
let ParentRegistryService = class ParentRegistryService {
    constructor() { }
    createParent(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundParent = yield this.userRepository.findOnebyQuery({ email: user.email });
                if (foundParent) {
                    console.log("Email already exists");
                    return Promise.reject(errorHandler_1.fillErrorResponse(409, errorConstants_1.EMAIL_ALREADY_EXISTS, 'There is an existing account related to this email address'));
                }
                const passwordEncrypted = yield EncryptPassword_1.encryptPassword.encryptPassword(user.password);
                user.password = passwordEncrypted;
                const createdUser = yield this.userRepository.create(user);
                return Promise.resolve(createdUser);
            }
            catch (error) {
                return Promise.reject(errorHandler_1.fillErrorResponse(500, errorConstants_1.INTERNAL_SERVER_ERROR, 'Internal server error', error));
            }
        });
    }
    authenticateProvider(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundProvider = yield this.userRepository.findOnebyQuery({ email: user.email });
                if (foundProvider && (yield EncryptPassword_1.encryptPassword.comparePassword(user.password, foundProvider.password))) {
                    return Promise.resolve(foundProvider);
                }
                else {
                    return Promise.reject(errorHandler_1.fillErrorResponse(401, errorConstants_1.INVALID_CREDENTIALS, 'Invalid user name or password.', 'Invalid user name or password.'));
                }
            }
            catch (error) {
                return Promise.reject(errorHandler_1.fillErrorResponse(500, errorConstants_1.INTERNAL_SERVER_ERROR, 'Internal server error', error));
            }
        });
    }
};
__decorate([
    inversify_1.inject(Identifiers_1.default.UserRepository)
], ParentRegistryService.prototype, "userRepository", void 0);
ParentRegistryService = __decorate([
    inversify_1.injectable()
], ParentRegistryService);
exports.default = ParentRegistryService;
//# sourceMappingURL=SecurityService.js.map