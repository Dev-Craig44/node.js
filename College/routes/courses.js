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