import { expect } from 'chai';
import { User } from '../../../lib/model/User';
import { FileTree } from '../../../lib/FileTree';
import { FileTreeNode } from '../../../lib/FileTreeNode';

describe('FileTree', ()=>{
	it('should create an empty file tree', ()=>{
		const user: User = {} as User;
		const tree = new FileTree(user)

		expect(tree).to.be.instanceOf(FileTree)
		expect(tree.getRoot()).to.be.instanceOf(FileTreeNode)
		expect(tree.getRoot().getChildren()).to.be.lengthOf(0)
	})

	it('should create an empty file tree', ()=>{
		const user: User = {} as User;
		const tree = new FileTree(user)

		expect(tree).to.be.instanceOf(FileTree)
		expect(tree.getRoot()).to.be.instanceOf(FileTreeNode)
		expect(tree.getRoot().getChildren()).to.be.lengthOf(0)
	})
})
