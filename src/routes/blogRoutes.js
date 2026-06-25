const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const blogCollection = getCollection("blog");

router.post("/blog", async (req, res) => {
  const blog = req.body;
  const result = await blogCollection.insertOne(blog);
  res.send(result);
});

router.get("/blog", async (req, res) => {
  const result = await blogCollection.find().toArray();
  res.send(result);
});

router.get("/singleBlog/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await blogCollection.findOne(query);
  res.send(result);
});

router.get("/blogs/:email", async (req, res) => {
  const email = req.params.email;
  const query = { author_email: email };
  const result = await blogCollection.find(query).toArray();
  res.send(result);
});

router.delete("/blog/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await blogCollection.deleteOne(query);
  res.send(result);
});

router.put("/updateBlog/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedInfo = {
    $set: {
      ...data,
    },
  };
  const result = await blogCollection.updateOne(query, updatedInfo, options);
  res.send(result);
});

router.put("/blog/status", async (req, res) => {
  const { id, status } = req.body;
  const updatedData = { $set: { status } };
  const query = { _id: new ObjectId(id) };
  const result = await blogCollection.updateOne(query, updatedData);
  res.send(result);
});

module.exports = router;