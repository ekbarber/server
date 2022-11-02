import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.use(express.static('resources'));

app.get('/', (req, res)=> {
    const userState = {"userId":"eddie","message":null,"messageId":null,"messageIsPredefined":false,"icon":null,"clearAt":null,"status":"online","statusIsUserDefined":false}
    const data = {
        title:'Nextcloud Serverless', 
        content:'hi', 
        userId:'eddie',
        userStatusInitialState: Buffer.from(JSON.stringify(userState)).toString('base64'),
        profileEnabled:Buffer.from(JSON.stringify({"profileEnabled":true})).toString('base64')
    }
    res.render('index', data)
});

app.listen(3000)