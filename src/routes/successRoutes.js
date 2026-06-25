const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const successCollection = getCollection("success");

router.post("/successStory", async (req, res) => {
  const video = req.body;
  const result = await successCollection.insertOne(video);
  res.send(result);
});

router.get("/successStory", async (req, res) => {
  const cursor = successCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});

router.get("/successStory/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await successCollection.findOne(query);
  res.send(result);
});

router.put("/successStory/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedInfo = {
    $set: {
      ...data,
    },
  };
  const result = await successCollection.updateOne(query, updatedInfo, options);
  res.send(result);
});

router.delete("/successStory/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await successCollection.deleteOne(query);
  res.send(result);
});

module.exports = router;