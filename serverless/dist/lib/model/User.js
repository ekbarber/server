"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const BaseModel_1 = require("./BaseModel");
class User extends BaseModel_1.BaseModel {
    constructor(userProps) {
        super();
        this.userName = userProps.userName;
    }
}
exports.User = User;
