 // Index.js;

import debug from 'debug';
import config from 'config';
import helmet from 'helmet';
import Joi from 'joi';
import { log } from './middleware/logger.js';
import express from 'express';
import { authenticator } from './authenticator.js';
import morgan from 'morgan';

const app = express();

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    console.log(`Morgan enabled...`);
};

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

// Home.js:

import express from 'express';
const homeRouter = express.Router();

homeRouter.get('/', (req, res)=> {
    res.render('index', { title: 'My Express App', message: "Hello" })
});

export { homeRouter }; 

// Index.pug;

html 
    head    
        title= title 
    body 
        h1= message 
        
// Courses.js:

import express from 'express';
const coursesRouter = express.Router();

const courses = [
    { id:1, name: 'course1' },
    { id:2, name: 'course2' },
    { id:3, name: 'course3' },
]

coursesRouter.get('/', (req, res)=> {
    res.send(courses);
});

coursesRouter.get('/:id', (req, res)=> {
    const course = findCourse(req); 
    ifNoCourse(res, course);
    res.send(course);
});

coursesRouter.post('/', (req, res)=> {
    const { error } = validateRespose(req.body)
    ifError(res, error);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

coursesRouter.put('/:id', (req,res)=> {
    const course = findCourse(req);
    ifNoCourse(res, course);
    const { error } = validateRespose(req.body);
    ifError(res, error);
    course.name = req.body.name;
    res.send(course); 
});

coursesRouter.delete('/:id', (req,res)=> {
    const course = findCourse(req);
    ifNoCourse(res, course);
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

const ifError = function(res, error) {
    if (error) return res.status(400).send(error.details[0].message);
};

const ifNoCourse = function(res, course) {
    if (!course) return res.status(404).send('Course was not found');

};
const findCourse = function(req) {
    return courses.find(c=>c.id === parseInt(req.params.id));
};

const validateRespose = function(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
};

export { coursesRouter };

// Custom-environment-variables.json:

{
    "mail": { 
        "password": "app_password"
     }
}

// default.json:

{
    "name": "My Express App"
}

// development.json:

{
    "name": "My Express App - Development",
    "mail": { 
        "host": "dev-mail-server"
     }
}

// production.json:

{
    "name": "My Express App - Production",
    "mail": { 
        "host": "prod-mail-server"
     }
}

// Read.txt:

This is a readme file! I love this shit!

// authenticator.js:

function authenticator(req, res, next) {
    console.log('Authenticating...');
    next();
};

export { authenticator };

// Logger.js:

function log(req,res,next) {
    console.log('Logging...');
    next();
};

export { log };

