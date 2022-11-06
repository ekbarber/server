import { BaseModel } from "./BaseModel";
import { Email } from "./Email";

export interface IUser{
    userName: string
    email?:Email
}

export class User extends BaseModel implements IUser  {
    userName: string
    email?: Email
    constructor(userProps:IUser){
        super()
        this.userName = userProps.userName
        this.email = userProps.email
    }
}