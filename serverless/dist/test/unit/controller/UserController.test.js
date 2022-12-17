"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const UserController_1 = require("../../../lib/controller/UserController");
const User_1 = require("../../../lib/model/User");
describe('UserController', () => {
    it('return undefined when a user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const uc = new UserController_1.UserController();
        (0, chai_1.expect)(uc.lookupByUserName('eddie')).to.be.undefined;
    }));
    it('return a user when a user does exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const uc = new UserController_1.UserController();
        const user = new User_1.User({ userName: 'eddie' });
        uc.saveUser(user);
        (0, chai_1.expect)(uc.lookupByUserName('eddie')).to.be.eq(user);
    }));
});
