import express from 'express';
import Joi from 'joi';
const app = express();


// make http router for vidly.com/api/genres
app.use(express.json());

const genres = [ 
    { id: 1, genre: 'Action' },
    { id: 2, genre: 'Horror' }, 
    { id: 3, genre: 'Comedy' } ];


app.get('/', (req, res) => {
    res.send('Welcome to Vidly.com!');
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre was not found.');
    res.send(genre);
});

app.post('/api/genres', (req, res) => {

    const  { error } = validateResponse(req.body);

    if ( error) return res.status(400).send(error.details[0].message)

    const genre = { 
        id: genres.length + 1,
        genre: req.body.genre 
        };

    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {

    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with id not found');

    const { error } = validateResponse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    genre.genre = req.body.genre

    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));

    if (!genre) return res.status(404).send('genre not found.')

    const index = genres.indexOf(genre);

    genres.splice(index, 1);

    res.send(genre);
});
// each movie has a genre. (Action, Horror, Comedy)
// we need a endpoint where you can get all of the genres
// They should be able create a new genre, update, and delete

const validateResponse = function(response) {

    const schema = Joi.object({
        genre: Joi.string().min(3).required()
    });

    return schema.validate(response);
    
};

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`Listening to port ${ port }...`)
});