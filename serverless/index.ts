import express from 'express';
import session, { Store } from 'express-session';
const FileStore = require('session-file-store')(session);
import bodyParser from 'body-parser';
import _, { omit } from 'lodash';

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
    secret:'nextcloud',
    store: new FileStore()
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
    const initialStates = {
        user_status: {
            status: {"userId":"eddie","message":null,"messageId":null,"messageIsPredefined":false,"icon":null,"clearAt":null,"status":"online","statusIsUserDefined":false},
            profileEnabled: {profileEnabled:true}
        },
        dashboard: {
            panels: {"user_status":{"id":"user_status","title":"Recent statuses","iconClass":"icon-user-status","url":null}},
            statuses:{"weather": true},
            layout:["recommendations"],
            firstRun:false
        },
        theming:{
            background: "default",
            backgroundVersion:0,
            themingDefaultBackground:"",
            shippedBackgrounds:{
                "anatoly-mikhaltsov-butterfly-wing-scale.jpg": {
                  "attribution": "Butterfly wing scale (Anatoly Mikhaltsov, CC BY-SA)",
                  "attribution_url": "https://commons.wikimedia.org/wiki/File:%D0%A7%D0%B5%D1%88%D1%83%D0%B9%D0%BA%D0%B8_%D0%BA%D1%80%D1%8B%D0%BB%D0%B0_%D0%B1%D0%B0%D0%B1%D0%BE%D1%87%D0%BA%D0%B8.jpg",
                  "primary_color": "#a53c17"
                },
                "bernie-cetonia-aurata-take-off-composition.jpg": {
                  "attribution": "Cetonia aurata take off composition (Bernie, Public Domain)",
                  "attribution_url": "https://commons.wikimedia.org/wiki/File:Cetonia_aurata_take_off_composition_05172009.jpg",
                  "theming": "dark",
                  "primary_color": "#56633d"
                },
                "dejan-krsmanovic-ribbed-red-metal.jpg": {
                  "attribution": "Ribbed red metal (Dejan Krsmanovic, CC BY)",
                  "attribution_url": "https://www.flickr.com/photos/dejankrsmanovic/42971456774/",
                  "primary_color": "#9c4236"
                },
                "eduardo-neves-pedra-azul.jpg": {
                  "attribution": "Pedra azul milky way (Eduardo Neves, CC BY-SA)",
                  "attribution_url": "https://commons.wikimedia.org/wiki/File:Pedra_Azul_Milky_Way.jpg",
                  "primary_color": "#4f6071"
                },
                "european-space-agency-barents-bloom.jpg": {
                  "attribution": "Barents bloom (European Space Agency, CC BY-SA)",
                  "attribution_url": "https://www.esa.int/ESA_Multimedia/Images/2016/08/Barents_bloom",
                  "primary_color": "#396475"
                },
                "hannes-fritz-flippity-floppity.jpg": {
                  "attribution": "Flippity floppity (Hannes Fritz, CC BY-SA)",
                  "attribution_url": "http://hannes.photos/flippity-floppity",
                  "primary_color": "#98415a"
                },
                "hannes-fritz-roulette.jpg": {
                  "attribution": "Roulette (Hannes Fritz, CC BY-SA)",
                  "attribution_url": "http://hannes.photos/roulette",
                  "primary_color": "#845334"
                },
                "hannes-fritz-sea-spray.jpg": {
                  "attribution": "Sea spray (Hannes Fritz, CC BY-SA)",
                  "attribution_url": "http://hannes.photos/sea-spray",
                  "primary_color": "#4f6071"
                },
                "kamil-porembinski-clouds.jpg": {
                  "attribution": "Clouds (Kamil Porembiński, CC BY-SA)",
                  "attribution_url": "https://www.flickr.com/photos/paszczak000/8715851521/",
                  "primary_color": "#00639a"
                },
                "bernard-spragg-new-zealand-fern.jpg": {
                  "attribution": "New zealand fern (Bernard Spragg, CC0)",
                  "attribution_url": "https://commons.wikimedia.org/wiki/File:NZ_Fern.(Blechnum_chambersii)_(11263534936).jpg",
                  "primary_color": "#316b26"
                },
                "rawpixel-pink-tapioca-bubbles.jpg": {
                  "attribution": "Pink tapioca bubbles (Rawpixel, CC BY)",
                  "attribution_url": "https://www.flickr.com/photos/byrawpixel/27665140298/in/photostream/",
                  "theming": "dark",
                  "primary_color": "#7b4e7e"
                },
                "nasa-waxing-crescent-moon.jpg": {
                  "attribution": "Waxing crescent moon (NASA, Public Domain)",
                  "attribution_url": "https://www.nasa.gov/image-feature/a-waxing-crescent-moon",
                  "primary_color": "#005ac1"
                },
                "tommy-chau-already.jpg": {
                  "attribution": "Cityscape (Tommy Chau, CC BY)",
                  "attribution_url": "https://www.flickr.com/photos/90975693@N05/16910999368",
                  "primary_color": "#6a2af4"
                },
                "tommy-chau-lion-rock-hill.jpg": {
                  "attribution": "Lion rock hill (Tommy Chau, CC BY)",
                  "attribution_url": "https://www.flickr.com/photos/90975693@N05/17136440246",
                  "theming": "dark",
                  "primary_color": "#7f4f70"
                },
                "lali-masriera-yellow-bricks.jpg": {
                  "attribution": "Yellow bricks (Lali Masriera, CC BY)",
                  "attribution_url": "https://www.flickr.com/photos/visualpanic/3982464447",
                  "theming": "dark",
                  "primary_color": "#7f5700"
                }
              }
        }
    }
    
    const data = {
        title:'Nextcloud Serverless',  
        userId:'eddie',
        userName:req.session.user?.username,
        initialStates: _.mapValues(initialStates, (stateType: any) => _.mapValues(stateType, (state: any)=>Buffer.from(JSON.stringify(state)).toString('base64')))
    }
    res.render('dashboard', data)
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