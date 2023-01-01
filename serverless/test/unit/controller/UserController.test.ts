import { expect } from 'chai';
import  UserController from '../../../lib/controller/UserController';
import { User } from '../../../lib/model/User';
import { Email } from '../../../lib/model/Email';


const uc = UserController
describe('UserController', ()=>{

    it.skip('return undefined when a user does not exist', async()=>{
        expect(uc.lookupByUserName('eddie')).to.be.undefined
    })
    it.skip('return a user when a user does exist', async()=>{
        const user = new User({userName: 'eddie'});
        uc.saveUser(user);

        expect(uc.lookupByUserName('eddie')).to.be.eq(user)
    })

    it.skip('should update the email address correctly', async ()=>{
        const user = new User({userName: 'eddie'});

        user.email = Email.createPrimary('test@example.com');

        uc.saveUser(user);
//todo: fix test
//        expect(uc.lookupByUserName('eddie')?.email).to.be.eql('test@example.com')
    })
})
