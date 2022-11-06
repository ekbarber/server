import Debug from "debug";
import { isThisTypeNode } from "typescript";
import { IUser, User } from "../model/User";

const debug = Debug('nextcloud')

export class UserController{
    users:Map<string, User> = new Map();
    lookupByUserName(userName:string): User | undefined{
        const user = this.users.get(userName);
        return user
    }
    createUser(userProps: IUser):User{
        return new User(userProps);
    }
    saveUser(user:User):User{
        debug({
            msg:'saving user',
            user
        })
        this.users.set(user.userName, user);
        return user;
    }
}