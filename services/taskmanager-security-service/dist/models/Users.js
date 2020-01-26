"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBEntityModel_1 = require("./DBEntityModel");
var UsersTypes;
(function (UsersTypes) {
    UsersTypes["ADMIN"] = "ADMIN";
    UsersTypes["INSTRUCTOR"] = "INSTRUCTOR";
    UsersTypes["SECRETARY"] = "SECRETARY";
})(UsersTypes = exports.UsersTypes || (exports.UsersTypes = {}));
class Users extends DBEntityModel_1.DBEntityModel {
}
exports.Users = Users;
//# sourceMappingURL=Users.js.map