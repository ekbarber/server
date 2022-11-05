import { expect } from 'chai';
import { UserController } from '../../../lib/controller/UserController';
import { User } from '../../../lib/model/User';



describe('UserController', ()=>{
    
    it('return a user for username eddie', async()=>{
        const uc = new UserController();
        expect(uc.lookupByUserName('eddie')).to.eql(new User('eddie'))
    })
})