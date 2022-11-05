import { BaseModel } from "./BaseModel";

export interface IUser{
    userName: string
}

export class User extends BaseModel implements IUser  {
    userName: string
    constructor(userProps:IUser){
        super()
        this.userName = userProps.userName
    }
}