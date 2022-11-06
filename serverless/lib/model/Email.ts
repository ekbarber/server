import { BaseModel } from "./BaseModel";

type EmailName = "primary" | "additiona_email";
export class Email extends BaseModel{
    name: String
    value: String
    scope: String
    verified: boolean
    constructor(name: EmailName, value: String, scope:String, verified = false){
        super()
        this.name = name;
        this.value = value;
        this.scope = scope;
        this.verified = verified
    }

    static createPrimary(email: String):Email{
        return new Email('primary', email, 'v2-federated')
    }
}