import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.use(express.static('resources'));

app.get('/', (req, res)=> res.render('index', {title:'Nextcloud Serverless', content:'hi'}));

app.listen(3000)