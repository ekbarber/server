import sqlite3 from 'sqlite3'

let db: sqlite3.Database;


export function setupDb(){
	return new Promise((resolve, reject)=>{
		db = new sqlite3.Database('nextcloud.sqlite', (err)=>{
			if(err){
				return reject(err)
			}
			db.run(`CREATE TABLE IF NOT EXISTS user (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				userId text UNIQUE,
				name text,
				email text UNIQUE,
				password text
			)`,(err)=>{
				if(err){
					return reject(err)
				}
				return resolve(db)
			})
		})
	})
}

export function getDb(): sqlite3.Database{
	return db;
}

