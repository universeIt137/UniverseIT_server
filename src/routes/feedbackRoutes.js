const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const feedbackCollection = getCollection("feedback");

router.post("/feedback", async (req, res) => {
  const data = req.body;
  const result = await feedbackCollection.insertOne(data);
  res.send(result);
});

router.get("/feedback", async (req, res) => {
  const cursor = feedbackCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});

router.get("/feedback/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await feedbackCollection.findOne(query);
  res.send(result);
});

router.put("/feedback/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedInfo = {
    $set: {
      ...data,
    },
  };
  const result = await feedbackCollection.updateOne(
    query,
    updatedInfo,
    options,
  );
  res.send(result);
});

router.delete("/feedback/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await feedbackCollection.deleteOne(query);
  res.send(result);
});

module.exports = router;