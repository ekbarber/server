import express from 'express';
import bodyParser from 'body-parser';

import Debug from 'debug';
import UserController from '../../controller';
import { User } from '../../model/User';



const debug = Debug('nextcloud:routes:api:v2');
const router = express.Router();

router.put('/users/:userName', bodyParser.json(), (req, res)=>{
    const userName = req.params.userName;
    debug({
        body: req.body
    })
    const key = req.body.key as "email"
    const value = req.body.value as string
    const user = UserController.lookupByUserName(userName);
    if(!user){
        res.statusCode = 404;
        res.send('user not found');
        return
    }
    user[key] = value
    res.send({ocs:{
        meta:{
            status:'ok',
            statucode: 200,
            message:'OK'
        }
    }})
})

export = router;