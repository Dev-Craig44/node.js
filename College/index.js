import debug from 'debug';
import config from 'config';
import helmet from 'helmet';
import Joi from 'joi';
import { log } from './middleware/logger.js';
import express from 'express';
import { authenticator } from './authenticator.js';
import morgan from 'morgan';

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public/'));
app.use(log);
app.use(authenticator);
app.use(helmet());

import { homeRouter } from './routes/home.js'
app.use('/', homeRouter);
import { coursesRouter } from './routes/courses.js'
app.use('/api/courses', coursesRouter);


const startupDebugger = debug('app:startup');
const dbDebugger = debug('app:db');

console.log(
    `Application Name: ${ config.get('name') }`
    );
console.log(
    `Mail Server: ${ config.get('mail.host') }`
    );
console.log(
    `Mail Password: ${ config.get('mail.password') }`
    );

if (app.get('env') === 'development') {
    app.use(morgan("tiny"));
    startupDebugger('Morgan enabled...');
};

// Db work...
dbDebugger('Connected to the database...');

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`listening to port ${ port }...`)
});  