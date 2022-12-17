import Debug from "debug";
import IUser, { User } from "../model/User";
import { getDb } from '../db';
import { Email } from "../model/Email";

const debug = Debug('nextcloud')

class UserController{
    users:Map<string, User> = new Map();
    async lookupByUserName(userName:string): Promise<User|undefined>{
		const db = getDb();
        return new Promise((resolve, reject)=>{
            db.get('SELECT * FROM user WHERE name = ?', [userName], (err, row)=>{
				if(err){
					throw err
				}
				debug({row})
				if(!row){
					resolve(undefined)
					return;
				}
				const user = new User({
					userName: row.name,
					email: Email.createPrimary(row.email),
					password: row.password
				})
				resolve(user)
			})
        })
    }


    createUser(userProps: IUser):User{
        return new User(userProps);
    }
    async saveUser(user:User):Promise<User>{
		const db = getDb();
		return new Promise((resolve, reject)=>{
			debug({
				msg:'saving user',
				user
			})
			db.run('INSERT INTO user(name, email, password) VALUES(?, ?, ?)', [user.userName, user.email?.value, user.password], (err)=>{
				if(err){
					reject(err)
				}
				resolve(user)
			})
		})

    }
}
export default new UserController()
