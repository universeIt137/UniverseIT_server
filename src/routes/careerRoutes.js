const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const careerCollection = getCollection("career");

router.post("/career", async (req, res) => {
  const data = req.body;
  const result = await careerCollection.insertOne(data);
  res.send(result);
});

router.get("/career", async (req, res) => {
  const result = await careerCollection.find().toArray();
  res.send(result);
});

router.get("/career/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await careerCollection.findOne(query);
  res.send(result);
});

router.delete("/career/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await careerCollection.deleteOne(query);
  res.send(result);
});

router.put("/career/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedInfo = {
    $set: {
      ...data,
    },
  };
  const result = await careerCollection.updateOne(query, updatedInfo, options);
  res.send(result);
});

module.exports = router;