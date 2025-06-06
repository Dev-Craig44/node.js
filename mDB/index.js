import mongoose from "mongoose";
import express from 'express';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/bookcollection')
    .then(()=> { console.log('Connected to MongoDB...') })
    .catch(err=> console.log('Could not connect...'));

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    description: { type: Array }
});

const Book = mongoose.model('Book', bookSchema);

app.get('/', async (req, res)=> {
    res.send('Welcome to the Onion Book Store!');
});

app.get('/api/books', async (req, res)=> { 
    try {
        const books = await Book.find();
        res.send(books);
    } catch (err) {
        res.status(500).send('Error getting information...');
    }
 });

 app.get('/api/books/:id', async (req, res)=> {
    const book = await Book.findById(req.params.id);
 });

 app.post('/api/books', async (req, res)=> {
    try {
        const newBook = new Book(req.body);
        const result = await newBook.save();
       res.send(result);
    } catch (ex) {
        console.log(ex.message);
    }
 });

 app.put('/api/books/:id',async (req, res)=> { 
    const book = await Book.findByIdAndUpdate(req.params.id, req.body);
    res.send(book);
  });

 const port = process.env.PORT || 3000;
 app.listen(port, ()=> {
    console.log(`Listening on port ${ port }...`);
 });

 


