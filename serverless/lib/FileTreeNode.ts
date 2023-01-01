export class FileTreeNode{
	private parent: FileTreeNode|null;
	private children: Map<string, FileTreeNode>;
	public name: string
	constructor(parent: FileTreeNode|null, name:string){
		this.parent = parent
		this.children = new Map();

		this.name = parent === null ? 'root' : name
	}

	isRoot(){
		return this.parent === null
	}
	addChild(child: FileTreeNode){
		if(this.children.has(child.name)){
			throw new Error('file already exists with name ' + child.name)
		}
		this.children.set(child.name, child)
		return child;
	}
	removeChild(child:FileTreeNode){

	}
	getChildren(): Array<FileTreeNode>{
		return Array.from(this.children.values())
	}
}
