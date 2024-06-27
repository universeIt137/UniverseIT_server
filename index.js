const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;


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
    await client.connect();
    const admissionCollection = client.db('BIFDT').collection('admission');
    const seminarCollection = client.db('BIFDT').collection('seminar');
    const seminarRequestCollection = client.db('BIFDT').collection('seminarRequest');
    const blogCollection = client.db('BIFDT').collection('blog');
    const facultyCollection = client.db('BIFDT').collection('faculty');
    const testimonialCollection = client.db('BIFDT').collection('testimonial');
    const homepageContentCollection = client.db('BIFDT').collection('homepageContent');
    //   admission api 

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


    // seminar api

    app.post('/seminar', async (req, res) => {
      const seminar = req.body;
      const result = await seminarCollection.insertOne(seminar);
      res.send(result);
    })

    app.get('/seminar', async (req, res) => {
      const result = await seminarCollection.find().toArray();
      res.send(result);
    })

    app.delete('/seminar/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await seminarCollection.deleteOne(query);
      res.send(result);
    })

    app.get('/seminar/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await seminarCollection.findOne(query);
      res.send(result);
    })

    //   seminar reqeust api

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

    app.patch('/seminarRequest/:id', async (req, res) => {
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



    //   blog api

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

    // Faculty api

    app.post('/faculty', async (req, res) => {
      const info = req.body;
      const result = await facultyCollection.insertOne(info);
      res.send(result);
    })


    app.get('/faculty', async (req, res) => {
      const data = await facultyCollection.find().toArray();
      res.send(data);
    })

    app.delete('/faculty/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await facultyCollection.deleteOne(query);
      res.send(result);
    })

    // testimonial api 
    app.post('/testimonial', async (req, res) => {
      const info = req.body;
      const result = await testimonialCollection.insertOne(info);
      res.send(result);
    })

    app.get('/testimonial', async (req, res) => {
      const result = await testimonialCollection.find().toArray();
      res.send(result);
    })
    app.get('/singleTestimonial/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }; 
      const result = await testimonialCollection.findOne(query)
      res.send(result);
    })

    app.delete('/testimonial/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await testimonialCollection.deleteOne(query);
      res.send(result);
    })

    app.put('/updateTestimonials/:id', async (req, res) => {
      const data = req.body
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
    // home page api 

    app.get('/homepageContent', async (req, res) => {
      const result = await homepageContentCollection.find().toArray();
      res.send(result)
    })

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

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
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