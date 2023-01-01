import { FileTreeNode } from "./FileTreeNode";
import { User } from "./model/User";

export class FileTree {
	private user: User;
	private root: FileTreeNode

	constructor(user: User){
		this.user = user
		this.root = new FileTreeNode(null, 'root')
	}

	getRoot(){
		return this.root
	}

	getNodeAtPath(path:string){
		if(path === '/'){
			return this.getRoot()
		}

	}
}
