import { BaseModel } from "./BaseModel";
import { v4 as uuid } from 'uuid';


export default interface IFile{
	id?: string,
	name: string
}
export class File extends BaseModel{
	id: string
	name: string

	constructor(fileProps:IFile){
		super()
		if(fileProps.id){
			this.id = fileProps.id
		}else{
			this.id = this.generateUuid()
		}
		this.name = fileProps.name
	}

	generateUuid(){
		return uuid();
	}
}
