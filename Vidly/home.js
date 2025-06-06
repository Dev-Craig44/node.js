import express from 'express';
const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
    res.render('index', {
        title: "Vidly.com",
        message: "Hello & Welcome to Vidly.com!"
    })
})

export { homeRouter };
