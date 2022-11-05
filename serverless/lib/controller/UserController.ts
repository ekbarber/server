import { User } from "../model/User";

export class UserController{
    
    lookupByUserName(userName:string): User{
        return new User(userName)
    }
}