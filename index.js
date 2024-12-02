const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const bcrypt = require('bcrypt');


// middleware

app.use(cors());
app.use(express.json());

const QRCode = require('qrcode');




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bpilnp1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const uri = `mongodb+srv://universeITmaster:BeAfAku5WAqfVuc5@cluster1.olinusx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const admissionCollection = client.db('UNIVERSE_IT').collection('admission');
    const seminarCollection = client.db('UNIVERSE_IT').collection('seminar');
    const seminarRequestCollection = client.db('UNIVERSE_IT').collection('seminarRequest');
    const blogCollection = client.db('UNIVERSE_IT').collection('blog');
    const facultyCollection = client.db('UNIVERSE_IT').collection('faculty');
    const testimonialCollection = client.db('UNIVERSE_IT').collection('testimonial');
    const homepageContentCollection = client.db('UNIVERSE_IT').collection('homepageContent');
    const studentGalleryCollection = client.db('UNIVERSE_IT').collection('studentGallery');
    const categoryCollection = client.db('UNIVERSE_IT').collection('category');
    const commentCollection = client.db('UNIVERSE_IT').collection('comment');
    const courseCollection = client.db('UNIVERSE_IT').collection('course');
    const courseCategoryCollection = client.db('UNIVERSE_IT').collection('courseCategory');
    const semesterCollection = client.db('UNIVERSE_IT').collection('semester');
    const objectiveCollection = client.db('UNIVERSE_IT').collection('courseObjective');

    const usersCollection = client.db('UNIVERSE_IT').collection('users');

    const certificateCollection = client.db('UNIVERSE_IT').collection('certificate');
    const successCollection = client.db('UNIVERSE_IT').collection('success');
    const feedbackCollection = client.db('UNIVERSE_IT').collection('feedback');
    const teamCollection = client.db('UNIVERSE_IT').collection('team');
    const careerCollection = client.db('UNIVERSE_IT').collection('career');
    const jobApplyCollection = client.db('UNIVERSE_IT').collection('jobApply');
    const popularCategoryCollection = client.db('UNIVERSE_IT').collection('popularCategory');
    const representativeCollection = client.db('UNIVERSE_IT').collection('representative');
    const certificateGenerateCollection = client.db('UNIVERSE_IT').collection('certificateGenerate');



    //1. seminar api

    app.post('/seminar', async (req, res) => {
      const seminar = req.body;
      const result = await seminarCollection.insertOne(seminar);
      res.send(result);
    })

    app.get('/seminar', async (req, res) => {
      const result = await seminarCollection.find().toArray();
      res.send(result);
    })



    app.get('/seminar/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await seminarCollection.findOne(query);
      res.send(result);
    })

    app.delete('/seminar/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await seminarCollection.deleteOne(query);
      res.send(result);
    })


    //2.   admission api

    app.post('/admission', async (req, res) => {
      const admissionRequest = req.body;
      const result = await admissionCollection.insertOne(admissionRequest);
      res.send(result);
    })

    app.get('/admission', async (req, res) => {
      const cursor = admissionCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.delete('/admission/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await admissionCollection.deleteOne(query);
      res.send(result);
    })

    app.patch('/admission/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          status: 'confirmed'
        }
      }

      const result = await admissionCollection.updateOne(filter, updatedDoc);
      res.send(result);
    })



    //3.   blog api

    app.post('/blog', async (req, res) => {
      const blog = req.body;
      const result = await blogCollection.insertOne(blog);
      res.send(result);
    })


    app.get('/blog', async (req, res) => {
      const result = await blogCollection.find().toArray();
      res.send(result);
    })
    app.get('/singleBlog/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogCollection.findOne(query);
      res.send(result);
    })

    app.delete('/blog/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogCollection.deleteOne(query);
      res.send(result);
    })

    app.put('/updateBlog/:id', async (req, res) => {
      const data = req.body
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true }
      const updatedInfo = {
        $set: {
          ...data
        }
      }
      const result = await blogCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })


    app.put('/blog/status', async (req, res) => {
      const { id, status } = req.body;
      const updatedData = { $set: { status } };
      const query = { _id: new ObjectId(id) };
      const result = await blogCollection.updateOne(query, updatedData);
      res.send(result);
    });



    //4. Faculty api

    app.post('/faculty', async (req, res) => {
      const info = req.body;
      const result = await facultyCollection.insertOne(info);
      res.send(result);
    })


    app.get('/faculty', async (req, res) => {
      const data = await facultyCollection.find().toArray();
      res.send(data);
    })
    app.get('/singleFaculty/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const data = await facultyCollection.findOne(query)
      res.send(data);
    })

    app.delete('/faculty/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await facultyCollection.deleteOne(query);
      res.send(result);
    })

    app.put('/updateFaculty/:id', async (req, res) => {
      const data = req.body
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true }
      const updatedInfo = {
        $set: {
          ...data
        }
      }
      const result = await facultyCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })




    //5. testimonial api 
    app.post('/testimonial', async (req, res) => {
      const info = req.body;
      const result = await testimonialCollection.insertOne(info);
      res.send(result);
    })

    app.get('/testimonial', async (req, res) => {
      const result = await testimonialCollection.find().toArray();
      res.send(result);
    })

    app.delete('/testimonial/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await testimonialCollection.deleteOne(query);
      res.send(result);
    })


    app.get('/singleTestimonial/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await testimonialCollection.findOne(query)
      res.send(result);
    })



    app.put('/updateTestimonial/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true }
      const updatedInfo = {
        $set: {
          ...data
        }
      }
      const result = await testimonialCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })




    //6.   seminar reqeust api

    app.post('/seminarRequest', async (req, res) => {
      const seminarRequest = req.body;
      const result = await seminarRequestCollection.insertOne(seminarRequest);
      res.send(result);
    })

    app.get('/seminarRequest', async (req, res) => {
      const result = await seminarRequestCollection.find().toArray();
      res.send(result);
    })

    app.delete('/seminarRequest/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await seminarRequestCollection.deleteOne(query);
      res.send(result);
    })

    app.put('/seminarRequest/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          status: 'confirmed'
        }
      }

      const result = await seminarRequestCollection.updateOne(filter, updatedDoc);
      res.send(result);
    })








    //7. home page api 

    app.post('/updateHomepageContent/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id
      if (id === 'notAvailable') {
        const result = await homepageContentCollection.insertOne(data);
        res.send(result)
      } else {
        const query = { _id: new ObjectId(id) }
        const options = { upsert: true }
        const updatedInfo = {
          $set: {
            ...data
          }
        }
        const result = await homepageContentCollection.updateOne(query, updatedInfo, options)
        res.send(result)
      }

    })

    app.get('/homepageContent', async (req, res) => {
      const result = await homepageContentCollection.find().toArray();
      res.send(result)
    })


    //8. student gallery api

    // create category 
    app.post('/addCategory', async (req, res) => {
      const data = req.body;
      const result = await categoryCollection.insertOne(data);
      res.send(result);
    })

    // get all category

    app.get('/allCategory', async (req, res) => {
      const result = await categoryCollection.find().toArray();
      res.send(result);
    })

    // update a single Category 
    app.put('/updateCategory/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true }
      const updatedInfo = {
        $set: {
          ...data
        }
      }
      const result = await categoryCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })

    // delete a single category
    app.delete('/deleteCategory/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await categoryCollection.deleteOne(query);
      res.send(result);
    })

    // get one category 
    app.get('/category/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await categoryCollection.findOne(query);
      res.send(result);
    })


    // photo related apis

    // Add image to gallary 
    app.post('/addImage', async (req, res) => {
      const { category_id, image_url } = req.body;
      const imageData = {
        category_id: new ObjectId(category_id),
        image_url
      };

      const result = await studentGalleryCollection.insertOne(imageData);
      res.send(result);
    })

    // Get all images for a category 
    app.get('/imagesByCategory/:id', async (req, res) => {
      const category_id = req.params.id;
      const query = { category_id: new ObjectId(category_id) };

      const result = await studentGalleryCollection.find(query).toArray();
      res.send(result);
    })


    // student gallary

    app.post('/studentGallery', async (req, res) => {
      const info = req.body;
      const result = await studentGalleryCollection.insertOne(info);
      res.send(result);
    })

    app.get('/studentGallery', async (req, res) => {
      const result = await studentGalleryCollection.find().toArray();
      res.send(result);
    })
    app.get('/singleStudentGallery/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await studentGalleryCollection.findOne(query)
      res.send(result);
    })

    app.delete('/studentGallery/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await studentGalleryCollection.deleteOne(query);
      res.send(result);
    })

    app.put('/updateStudentGallery/:id', async (req, res) => {
      const data = req.body
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true }
      const updatedInfo = {
        $set: {
          ...data
        }
      }
      const result = await studentGalleryCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })

    // 9. Comment api

    // post a comment 
    app.post('/comments', async (req, res) => {
      const comment = req.body;
      const result = await commentCollection.insertOne(comment);
      res.send(result);
    })

    // get all comment 
    app.get('/comments', async (req, res) => {
      const result = await commentCollection.find().toArray();
      res.send(result);
    })

    // get a comment 
    app.get('/comments/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await commentCollection.findOne(query);
      res.send(result);
    })


    // delete a comment 
    app.delete('/comments/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await commentCollection.deleteOne(query);
      res.send(result);
    })

    // update a comment 
    app.put('/comments/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }

      const result = await commentCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })


    // Get comments for a specific blog
    app.get('/comments/blog/:blogId', async (req, res) => {
      const myblogId = req.params.blogId;
      const query = { blogId: myblogId, isShow: true }; // assuming blogId is stored as an ObjectId
      const result = await commentCollection.find(query).toArray();
      res.send(result);
    });

    // 10. Course api

    // post a course 
    app.post('/course', async (req, res) => {
      const course = req.body;
      const result = await courseCollection.insertOne(course);
      res.send(result);
    })

    // get all course 
    app.get('/course', async (req, res) => {
      const result = await courseCollection.find().toArray();
      res.send(result);
    })

    // get a single course 
    app.get('/course/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await courseCollection.findOne(query);
      res.send(result);
    })

    // delete a course 
    app.delete('/course/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await courseCollection.deleteOne(query);
      res.send(result);
    })

    // update a course 
    app.put('/course/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }

      const result = await courseCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })

    // 11. User Related api


    app.post('/register', async (req, res) => {
      const { name, email } = req.body;

      const user = {
        name,
        email,
      };

      const result = await usersCollection.insertOne(user);
      res.send(result);
    })

    app.post('/login', async (req, res) => {
      const user = req.body;

      const query = { email: user.email };

      const existingUser = await usersCollection.findOne(query);

      if (existingUser) {
        if (existingUser.email == user.email) {
          return res.send({ message: 'login successful', insertedId: 2 });
        }
      } else {
        return res.send('user not found');
      }
    })

    app.get('/users', async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    })

    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.findOne(query);
      res.send(result);
    })
    app.get('/usersByEmail/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await usersCollection.findOne(query);
      res.send(result);
    })

    app.put('/users/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }

      const result = await usersCollection.updateOne(query, updatedInfo, options);
      res.send(result);

    })



    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    })

    app.put('/users/role', async (req, res) => {
      const { id, admin } = req.body;
      const updatedData = { $set: { admin } };
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.updateOne(query, updatedData);
      res.send(result);
    });


    // app.put('/users/role/representative', async (req, res) => {
    //   const { id, representative } = req.body;
    //   const updatedData = { $set: { representative } };
    //   const query = { _id: new ObjectId(id) };
    //   const result = await usersCollection.updateOne(query, updatedData);
    //   res.send(result);
    // });

    app.put('/users/role/representative', async (req, res) => {
      const { id, representative } = req.body;

      try {
        // Find the user by ID
        const user = await usersCollection.findOne({ _id: new ObjectId(id) });

        // Check if the user already has a representative_id
        if (user && user.representative_id) {
          // If representative_id exists, just update the representative field
          const updatedData = { $set: { representative } };
          const query = { _id: new ObjectId(id) };
          const result = await usersCollection.updateOne(query, updatedData);

          return res.send({ success: true, message: "Representative role updated, ID remains unchanged.", result });
        }

        // If no representative_id exists, generate a new one
        const lastRep = await usersCollection
          .find({ representative_id: { $exists: true } })
          .sort({ representative_id: -1 })
          .limit(1)
          .toArray();

        let newRepId = "REP-001"; // Default ID
        if (lastRep.length > 0) {
          const lastId = lastRep[0].representative_id;
          const idNumber = parseInt(lastId.split('-')[1]);
          newRepId = `REP-${String(idNumber + 1).padStart(3, '0')}`;
        }

        // Update the user with the new representative_id
        const updatedData = { $set: { representative, representative_id: newRepId } };
        const query = { _id: new ObjectId(id) };
        const result = await usersCollection.updateOne(query, updatedData);

        res.send({ success: true, message: "Representative role and ID updated.", result });

      } catch (err) {
        res.status(500).send({ success: false, message: "Error updating user.", error: err.message });
      }
    });




    //11. course category api 
    app.post('/courseCategory', async (req, res) => {
      const data = req.body;
      const result = await courseCategoryCollection.insertOne(data);
      res.send(result);
    })

    app.get('/courseCategory', async (req, res) => {
      const result = await courseCategoryCollection.find().toArray();
      res.send(result);
    })

    app.get('/courseCategory/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await courseCategoryCollection.findOne(query);
      res.send(result);
    })

    app.delete('/courseCategory/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await courseCategoryCollection.deleteOne(query);
      res.send(result);
    })

    app.put('/courseCategory/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }

      const result = await courseCategoryCollection.updateOne(query, updatedInfo, options);
      res.send(result);

    })

    app.get('/courseCategory/course/:id', async (req, res) => {
      const myCourseId = req.params.id;
      const query = { courseId: myCourseId };
      const result = await courseCategoryCollection.find(query).toArray();
      res.send(result);

    })


    // 12. semester Category api

    app.post('/semesterByCourse', async (req, res) => {
      const data = req.body;
      const result = await semesterCollection.insertOne(data);
      res.send(result);
    })

    app.get('/semesterByCourse', async (req, res) => {
      const result = await semesterCollection.find().toArray();
      res.send(result);
    })


    app.get('/semesterByCourse/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await semesterCollection.findOne(query);
      res.send(result);
    })

    app.delete('/semesterByCourse/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await semesterCollection.deleteOne(query);
      res.send(result);
    })


    app.put('/semesterByCourse/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }

      const result = await semesterCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })

    app.get('/semesterByCourse/course/:id', async (req, res) => {
      const myCourseId = req.params.id;
      const query = { courseId: myCourseId };
      const result = await semesterCollection.find(query).toArray();
      res.send(result);
    })

    // 13. Course Objective related api

    app.post('/objectives', async (req, res) => {
      const data = req.body;
      const result = await objectiveCollection.insertOne(data);
      res.send(result);
    })

    app.get('/objectives', async (req, res) => {
      const result = await objectiveCollection.find().toArray();
      res.send(result);
    })

    app.get('/objectives/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await objectiveCollection.findOne(query);
      res.send(result);
    })


    app.delete('/objectives/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await objectiveCollection.deleteOne(query);
      res.send(result);
    })

    app.put('/objectives/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }

      const result = await objectiveCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })

    app.get('/objectives/course/:id', async (req, res) => {
      const myCourseId = req.params.id;
      const query = { courseId: myCourseId };
      const result = await objectiveCollection.find(query).toArray();
      res.send(result);
    })


    // 14. certificate valiadition 
    app.post('/certificate', async (req, res) => {
      const certificate = req.body;
      const result = await certificateCollection.insertOne(certificate);
      res.send(result);
    })

    app.get('/certificate', async (req, res) => {
      const cursor = certificateCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/certificateSerial', async (req, res) => {
      const data = req.body;
      const serial = data.serial;
      const query = { certificateNumber: serial };
      const result = await certificateCollection.findOne(query);
      res.send(result);
    })

    app.get('/certificate/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await certificateCollection.findOne(query);
      res.send(result);
    })

    app.delete('/certificate/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await certificateCollection.deleteOne(query);
      res.send(result);
    })


    app.put('/certificate/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }

      const result = await certificateCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })


    // 15. success story 
    app.post('/successStory', async (req, res) => {
      const video = req.body;
      const result = await successCollection.insertOne(video);
      res.send(result);
    })

    app.get('/successStory', async (req, res) => {
      const cursor = successCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/successStory/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await successCollection.findOne(query);
      res.send(result);
    })

    app.put('/successStory/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }

      const result = await successCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })

    app.delete('/successStory/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await successCollection.deleteOne(query);
      res.send(result);
    })


    // 16. Team related api
    // post a member 
    app.post('/team-member', async (req, res) => {
      const member = req.body;
      const result = await teamCollection.insertOne(member);
      res.send(result);
    })

    // get all team-member 
    app.get("/team-member", async (req, res) => {
      const result = await teamCollection.find().toArray();
      res.send(result);
    })

    // get a single team-member 
    app.get('/team-member/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await teamCollection.findOne(query);
      res.send(result);
    })

    // delete a member 
    app.delete('/team-member/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await teamCollection.deleteOne(query);
      res.send(result);
    })

    // update a member
    app.put('/team-member/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }

      const result = await teamCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })

    // 17. Career related api 
    // post a career 
    app.post('/career', async (req, res) => {
      const data = req.body;
      const result = await careerCollection.insertOne(data);
      res.send(result);
    })

    // get all career 
    app.get('/career', async (req, res) => {
      const result = await careerCollection.find().toArray();
      res.send(result);
    })

    // get a single career 
    app.get('/career/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await careerCollection.findOne(query);
      res.send(result);
    })

    // delete career 
    app.delete('/career/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await careerCollection.deleteOne(query);
      res.send(result);
    })

    // update career 
    app.put('/career/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }

      const result = await careerCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })

    // 18. Apply job related api

    // post a job application 
    app.post('/apply-job', async (req, res) => {
      const data = req.body;
      const result = await jobApplyCollection.insertOne(data);
      res.send(result);
    })

    // get all job application 
    app.get('/apply-job', async (req, res) => {
      const result = await jobApplyCollection.find().toArray();
      res.send(result);
    })

    // get a single job application 
    app.get('/apply-job/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobApplyCollection.findOne(query);
      res.send(result);
    })

    // delete a job application 
    app.delete('/apply-job/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobApplyCollection.deleteOne(query);
      res.send(result);
    })


    // confirm a job application 
    app.put('/apply-job/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          status: 'confirmed'
        }
      }

      const result = await jobApplyCollection.updateOne(filter, updatedDoc);
      res.send(result);

    })

    // 19. popular course Category Section
    // post a category 
    app.post('/popular-category', async (req, res) => {
      const data = req.body;
      const result = await popularCategoryCollection.insertOne(data);
      res.send(result);
    })

    // get all category 
    app.get('/popular-category', async (req, res) => {
      const result = await popularCategoryCollection.find().toArray();
      res.send(result);
    })

    // get single category 
    app.get('/popular-category/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await popularCategoryCollection.findOne(query);
      res.send(result);
    })

    // delete a category 
    app.delete('/popular-category/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await popularCategoryCollection.deleteOne(query);
      res.send(result);
    })

    // update a category 
    app.put('/popular-category/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }

      const result = await popularCategoryCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })

    // 20. feedback api 
    app.post('/feedback', async (req, res) => {
      const data = req.body;
      const result = await feedbackCollection.insertOne(data);
      res.send(result);
    })

    app.get('/feedback', async (req, res) => {
      const cursor = feedbackCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/feedback/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await feedbackCollection.findOne(query);
      res.send(result);
    })

    app.put('/feedback/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }

      const result = await feedbackCollection.updateOne(query, updatedInfo, options);

      res.send(result);
    })


    app.delete('/feedback/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await feedbackCollection.deleteOne(query);
      res.send(result);
    })

    // 21. representative related api

    app.post('/representative', async (req, res) => {
      const data = req.body;
      const result = await representativeCollection.insertOne(data);
      res.send(result);
    })

    app.get('/representative', async (req, res) => {
      const result = await representativeCollection.find().toArray();
      res.send(result);
    })

    app.get('/representative/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await representativeCollection.findOne(query);
      res.send(result);
    })

    app.put('/representative/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }

      const result = await representativeCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })


    app.delete('/representative/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await representativeCollection.deleteOne(query);
      res.send(result);
    })

    // 22. certificate generate related api

    app.post('/certificate-generate', async (req, res) => {
      const { name, hour, course_category, course_name, student_ID, duration, year, date_of_issue, } = req.body;


      const qrImageUrl = await QRCode.toDataURL(`${name} ${hour} ${course_category} ${course_name} ${student_ID} ${duration} ${year} ${date_of_issue}   `);

      const data = {
        name, hour, course_category, course_name, student_ID, duration, year, date_of_issue, qr_url: qrImageUrl
      }
      const result = await certificateGenerateCollection.insertOne(data);
      res.send(result);
    })

    app.get('/certificate-generate', async (req, res) => {
      const result = await certificateGenerateCollection.find().toArray();
      res.send(result);
    })

    app.get('/certificate-generate/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await certificateGenerateCollection.findOne(query);
      res.send(result);
    })

    app.put('/certificate-generate/:id', async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedInfo = {
        $set: {
          ...data
        }
      }

      const result = await certificateGenerateCollection.updateOne(query, updatedInfo, options);
      res.send(result);
    })


    app.delete('/certificate-generate/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await certificateGenerateCollection.deleteOne(query);
      res.send(result);
    })



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('server is ok');
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})