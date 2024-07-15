const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const bcrypt = require('bcrypt');


// middleware

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bpilnp1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    const admissionCollection = client.db('BIFDT').collection('admission');
    const seminarCollection = client.db('BIFDT').collection('seminar');
    const seminarRequestCollection = client.db('BIFDT').collection('seminarRequest');
    const blogCollection = client.db('BIFDT').collection('blog');
    const facultyCollection = client.db('BIFDT').collection('faculty');
    const testimonialCollection = client.db('BIFDT').collection('testimonial');
    const homepageContentCollection = client.db('BIFDT').collection('homepageContent');
    const studentGalleryCollection = client.db('BIFDT').collection('studentGallery');
    const categoryCollection = client.db('BIFDT').collection('category');
    const commentCollection = client.db('BIFDT').collection('comment');
    const courseCollection = client.db('BIFDT').collection('course');
    const courseCategoryCollection = client.db('BIFDT').collection('courseCategory');
    const semesterCollection = client.db('BIFDT').collection('semester');
    
    const usersCollection = client.db('BIFDT').collection('users');




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
      const query = { blogId:  myblogId, isShow: true}; // assuming blogId is stored as an ObjectId
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
      const { name, phone, password } = req.body;

      const user = {
        name,
        phone,
        password
      };

      const result = await usersCollection.insertOne(user);
      res.send(result);
    })

    app.post('/login', async (req, res) => {
      const user = req.body;

      const query = { phone: user.phone };

      const existingUser = await usersCollection.findOne(query);



      if (existingUser.password == user.password) {
        return res.send({ message: 'login successful', insertedId: 2 });
      }

      return res.send('user not found');





    })

    app.get('/users', async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    })

    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    })


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
        $set:{
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