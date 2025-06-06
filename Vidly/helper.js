import Joi from 'joi';

function findGenre(req, genres) {
    return genres.find(g => g.id === parseInt(req.params.id));
}

function ifNoGenre(res, genre) {
    if (!genre)
        return res.status(404).send('Genre was not found');
}

function ifError(error, res) {
    if (error) {
        if (res.headersSent) {
            res.status(400).send(error.details[0].message);
        };
        return true;
    };
    return false;
};

function createGenre(req, genres) {
    const newGenre = {
        id: genres.length + 1,
        genre: req.body.genre
    };  

    genres.push(newGenre);
    return newGenre;
};

function validateRequest(req) {
    const schema = Joi.object({ 
        genre: Joi.string().min(3).required()
    })
    
    return schema.validate(req.body);
};
export { findGenre, ifNoGenre, validateRequest, ifError, createGenre }; 

