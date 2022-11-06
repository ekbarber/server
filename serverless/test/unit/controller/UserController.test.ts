import { expect } from 'chai';
import { UserController } from '../../../lib/controller/UserController';
import { User } from '../../../lib/model/User';



describe('UserController', ()=>{
    
    it('return undefined when a user does not exist', async()=>{
        const uc = new UserController();
        expect(uc.lookupByUserName('eddie')).to.be.undefined
    })
    it('return a user when a user does exist', async()=>{
        const uc = new UserController();
        const user = new User({userName: 'eddie'});
        uc.saveUser(user);

        expect(uc.lookupByUserName('eddie')).to.be.eq(user)
    })

    it('should update the email address correctly', ()=>{
        const uc = new UserController();
        const user = new User({userName: 'eddie'});

        user.email = 'test@example.com';

        uc.saveUser(user);

        expect(uc.lookupByUserName('eddie')?.email).to.be.eql('test@example.com')
    })
})