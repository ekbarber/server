import { BaseModel } from "./BaseModel";

export interface IUser{
    userName: string
    email?:string
}

export class User extends BaseModel implements IUser  {
    userName: string
    email:string | undefined
    constructor(userProps:IUser){
        super()
        this.userName = userProps.userName
        this.email = userProps.email
    }
}