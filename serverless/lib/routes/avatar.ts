import { Router } from 'express';
import Debug from 'debug';
import AvatarController from '../controller/AvatarController';

const debug = Debug('nextcloud:routes:avatar');
const AvatarRouter = Router();

AvatarRouter.get('/:userId/:size', (req, res)=>{
    debug({
        test:'ed'
    })
    const user = req.session.user;
    const avatarStream = AvatarController.generateAvatar(user?.userName?.substring(0, 1) || '?');

   avatarStream.pipe(res)
})
export = AvatarRouter;

