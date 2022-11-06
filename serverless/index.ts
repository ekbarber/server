import express from 'express';
import session, { Store } from 'express-session';
import compression from 'compression';
const FileStore = require('session-file-store')(session);
import bodyParser from 'body-parser';
import _, { omit } from 'lodash';
import Debug from 'debug';

import initialStates from './config/initialStates.json'
import { User } from './lib/model/User';
import UserController  from './lib/controller';
import v2ApiRouter from "./lib/routes/api/v2"
const debug = Debug('nextcloud')

const app = express();

declare module 'express-session' {
    interface SessionData {
      user: User;
      lastLogin: Date
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

function getInitialStates(user:User){
  return _.merge({}, initialStates, {
    settings:{
      personalInfoParameters:{
        emailMap:{
          primaryEmail:user.email
        }
      }
    }
  })
}
app.use(compression())
app.set('view engine', 'pug');
app.use(express.static('resources'));

app.use(session({
    secret:'nextcloud',
    store: new FileStore()
}))

app.use((req, res, next)=>{
  if(req.session.user){
    UserController.saveUser(req.session.user)
  }
  next()
})
app.use((req, res, next)=>{
  if(req.session.user){
    req.templateProps = {
      title:'Nextcloud Serverless',  
      userId: req.session.user.userName,
      userName:req.session.user.userName,
      initialStates: _.mapValues(getInitialStates(req.session.user), (stateType: any) => _.mapValues(stateType, (state: any)=>Buffer.from(JSON.stringify(state)).toString('base64')))
    }
  }else{
    console.warn('no user')
  }

  next();
})


app.use((req, res, next)=>{
    req.url = req.url.replace('index.php/', '')
    next()
})

app.use('/ocs/v2.php/cloud', v2ApiRouter)

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

    const user = UserController.createUser({userName: req.body.user})
    debug({
      msg:'login',
      user
    })
    req.session.user = user;
    req.session.lastLogin = new Date()
    debug({user})
    req.session.save((err)=>{
      if(err){
        throw `could not save session: ${err}`
      }
      res.redirect('/')
    })
})

app.post('/login/confirm', bodyParser.json(), (req, res)=>{
  debug({
    session: req.session
  })
  const lastLogin = req.session.lastLogin instanceof Date ? req.session.lastLogin.getTime() : req.session.lastLogin
  res.send({
    lastLogin
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