import { BaseModel } from "./BaseModel";

export interface IUser{
    userName: string
}

export class User extends BaseModel implements IUser  {
    userName: string
    constructor(userName:string){
        super()
        this.userName = userName
    }
}