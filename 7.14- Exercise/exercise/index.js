import mongoose from "mongoose";

const idNum = "641392e7cbc6813e7a86b5c8";

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err=>console.error('Could not connect...'));

const courseSchema = mongoose.Schema({
    tags: [ String ],
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses(){
    return await Course
    .find()
    .select('tags name price');
};

async function findCourse(id){
    try {
        // const course = await Course.find();
        const course = await Course.findById(id);
        if (!course) return

        course.author = "Another Author"
        course.isPublished = false

        const result = await course.save();
        console.log(result);

    } catch (err) {
        console.error(err);
    }
};

const run = async () => {
    const course = await findCourse(idNum);
    console.log(course)
    
};

run();


