import mongoose, { get } from "mongoose";

mongoose.connect('mongodb://localhost/playground')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err=> console.error('Could not connect with MongoDB...'))

const courseSchema = new mongoose.Schema({ 
    name: { 
        type: String, 
        required: true, 
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },  
    category: {
        type: String,
        required: true,
        enum: [ 'web', 'mobile', 'network' ]
    },
    author: String,
    tags: { 
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(()=> {
                    // Work
                    const result = v && v.length > 0;
                    callback(result)
                }, 4000)
            },
            message: "A course should have at least one tag..."
        }
     },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; }
    }
 });

 const Course = mongoose.model('Course', courseSchema);

 async function createCourse() {
     const course = new Course({ 
        name: 'Angular Course',
        category: 'web',
        author: 'Mosh',
        tags: null, 
        isPublished: true,
        price: 15
      });
      try {
        await course.validate();
    //     const result = await course.save();
    //   console.log(result);

      } catch (ex) {
        console.log(ex.message)
      }
};

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
    .find({ author: 'Craig', isPublished: true })
    .skip((pageNumber - 1) * pageSize )
    .limit(pageSize) 
    .sort({ name: 1 })
    .count()
    .select({ name: 1, tags: 1 })
    console.log(courses);
};

createCourse();

// const courseSchema = new mongoose.Schema({
//     name: String,
//     author: String,
//     tags: [ String ],
//     date: {type: Date, default: Date.now},
//     isPublished: Boolean
// });
// const Course = mongoose.model('Course', courseSchema);

// async function createCourse() {
    
//     const course = new Course({ 
//         name: 'Angular Course',
//         author: 'Craig',
//         tags: ['angular', 'frontend'],
//         isPublished: true
//      });

//      const result = await course.save();
//      console.log(result);
// };



// async function getCourses() {
//     const pageNumber = 2;
//     const pageSize = 10;
    
//     const courses = await Course
//     .find({ author: 'Craig', isPublished: true })
//     .skip((pageNumber - 1) * pageSize)
//     .limit(pageSize)
//     .sort({ name: 1 })
//     .count()
//     .select({ name: 1, tags: 1 })

//     console.log(courses);

// };

// getCourses();


    

