"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../model/User");
class UserController {
    constructor() {
        this.users = new Map();
    }
    lookupByUserName(userName) {
        const user = this.users.get(userName);
        return user;
    }
    createUser(userProps) {
        return new User_1.User(userProps);
    }
    saveUser(user) {
        this.users.set(user.userName, user);
        return user;
    }
}
exports.UserController = UserController;
