import bcrypt from 'bcrypt'
const PW_SALT_ROUNDS = 10;
export type HashedPassword = string

export async function hashPw(plainTextPassword:string):Promise<HashedPassword>{
    const hashedPw: HashedPassword = await bcrypt.hash(plainTextPassword, PW_SALT_ROUNDS);
    return hashedPw
}

export function checkPw(plaintext:string, hashed:string){
	return bcrypt.compareSync(plaintext, hashed)
}
