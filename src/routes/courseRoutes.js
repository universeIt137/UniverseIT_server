const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const courseCollection = getCollection("course");

router.post("/course", async (req, res) => {
  const course = req.body;
  const result = await courseCollection.insertOne(course);
  res.send(result);
});

router.get("/course", async (req, res) => {
  const result = await courseCollection.find().toArray();
  res.send(result);
});

router.get("/course/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await courseCollection.findOne(query);
  res.send(result);
});

router.delete("/course/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await courseCollection.deleteOne(query);
  res.send(result);
});

router.put("/course/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedInfo = {
    $set: {
      ...data,
    },
  };
  const result = await courseCollection.updateOne(query, updatedInfo, options);
  res.send(result);
});

module.exports = router;