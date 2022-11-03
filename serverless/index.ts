import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

import Debug from 'debug';
import { resolveTypeReferenceDirective } from 'typescript';

const debug = Debug('nextcloud')

const app = express();

interface User{
    username: string
}
declare module 'express-session' {
    interface SessionData {
      user: User;
    }
  }

app.use(session({
    secret:'nextcloud'
}))
//app.use()
app.set('view engine', 'pug');
app.use(express.static('resources'));

app.use((req, res, next)=>{
    req.url = req.url.replace('index.php/', '')
    next()
})

app.get('/', (req, res)=> {
    if(!req.session.user){
        res.redirect('/login')
        return;
    }
    const userState = {"userId":"eddie","message":null,"messageId":null,"messageIsPredefined":false,"icon":null,"clearAt":null,"status":"online","statusIsUserDefined":false}
    const data = {
        title:'Nextcloud Serverless', 
        content:req.session.user?.username, 
        userId:'eddie',
        userStatusInitialState: Buffer.from(JSON.stringify(userState)).toString('base64'),
        profileEnabled:Buffer.from(JSON.stringify({"profileEnabled":true})).toString('base64')
    }
    res.render('index', data)
});

app.get('/login', (req, res)=>{
    const props = {
        bodyId: 'body-login'
    }
    res.render('login', props)
})

app.post('/login', bodyParser.urlencoded({ extended: false }), (req, res) =>{
    const user = {
        username: req.body?.user
    }
    req.session.user = user;
    res.redirect('/')
})

app.get('/logout', (req, res)=>{
    delete req.session.user
    res.redirect('/login');
})

app.listen(3000)