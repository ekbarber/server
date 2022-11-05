import express from 'express';
import session, { Store } from 'express-session';
import compression from 'compression';
const FileStore = require('session-file-store')(session);
import bodyParser from 'body-parser';
import _, { omit } from 'lodash';
import Debug from 'debug';

import initialStates from './config/initialStates.json'
import { User } from './lib/model/User';
import { UserController } from './lib/controller/UserController';
const debug = Debug('nextcloud')

const app = express();

const userController = new UserController();

declare module 'express-session' {
    interface SessionData {
      user: User;
    }
  }

  interface TemplateProps{
    title: String,
    userId: String,
    userName?: String,
    initialStates: Object,
    bodyId?: String,
    appId?: String
  }
declare global {
  namespace Express { 
    export interface Request {
      templateProps?: TemplateProps
    }
  }
}
app.use(compression())
app.use(session({
    secret:'nextcloud',
    store: new FileStore()
}))
app.use((req, res, next)=>{
  req.templateProps = {
    title:'Nextcloud Serverless',  
    userId:'eddie',
    userName:req.session.user?.userName,
    initialStates: _.mapValues(initialStates, (stateType: any) => _.mapValues(stateType, (state: any)=>Buffer.from(JSON.stringify(state)).toString('base64')))
  }
  next();
})
app.set('view engine', 'pug');
app.use(express.static('resources'));

app.use((req, res, next)=>{
    req.url = req.url.replace('index.php/', '')
    next()
})

app.get('/', (req, res)=> {
    debug({session: req.session})
    if(!req.session.user){
        res.redirect('/login')
        return;
    }
    debug({initialStates})

    res.render('dashboard', req.templateProps)
});

app.get('/login', (req, res)=>{
    const props = {
        bodyId: 'body-login'
    }
    res.render('login', _.merge( req.templateProps, props))
})

app.post('/login', bodyParser.urlencoded({ extended: false }), (req, res) =>{
    const user = userController.createUser({userName: req.body.userName})
    req.session.user = user;
    req.session.save((err)=>{
      if(err){
        throw `could not save session: ${err}`
      }
      res.redirect('/')
    })
})

app.get('/logout', (req, res)=>{
    delete req.session.user
    res.redirect('/login');
})

app.get('/settings/user', (req, res)=>{
  const props = _.merge(req.templateProps, {
    appId: 'settings'
  })
  res.render('settings-user', props)
  return;
})

app.listen(3000)