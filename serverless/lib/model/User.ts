import { HashedPassword } from "../util";
import { BaseModel } from "./BaseModel";
import { Email } from "./Email";


export default interface IUser{
    userName: string
    email?:Email
    password?: HashedPassword
}

export class User extends BaseModel implements IUser  {
    userName: string
    email?: Email
    password?: HashedPassword
    constructor(userProps:IUser){
        super()
        this.userName = userProps.userName
        this.email = userProps.email
        this.password = userProps.password
        
    }
}