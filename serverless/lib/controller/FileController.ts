import fs from 'fs'
import path from 'path'
import Debug from "debug";

import { File } from '../model/File';
import { getDb } from '../db';

const debug = Debug('nextcloud:filecontroller')

const fileDir = path.resolve('./files/');
if(!fs.existsSync(fileDir)){
	fs.mkdirSync(fileDir)
}

class FileController {

	async createNewFile(name: string, data: Buffer){

		const file = new File({name});
		fs.writeFileSync(path.join(fileDir, file.id), data);
		await this.saveFile(file);
		return file;
	}

	async saveFile(file: File){
		const db = getDb();
		return new Promise((resolve, reject)=>{
			debug({
				msg: 'saving file',
				file
			})
			const query = `
			INSERT INTO file(id, name)
			VALUES (?, ?)
			`
			db.run(query, [file.id, file.name], (err)=>{
				if(err){
					reject(err)
				}
				resolve(file)
			})

		})
	}
}

export default new FileController()
