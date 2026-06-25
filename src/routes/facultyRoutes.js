const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const facultyCollection = getCollection("faculty");

router.post("/faculty", async (req, res) => {
  const info = req.body;
  const result = await facultyCollection.insertOne(info);
  res.send(result);
});

router.get("/faculty", async (req, res) => {
  const data = await facultyCollection.find().toArray();
  res.send(data);
});

router.get("/singleFaculty/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const data = await facultyCollection.findOne(query);
  res.send(data);
});

router.delete("/faculty/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await facultyCollection.deleteOne(query);
  res.send(result);
});

router.put("/updateFaculty/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedInfo = {
    $set: {
      ...data,
    },
  };
  const result = await facultyCollection.updateOne(query, updatedInfo, options);
  res.send(result);
});

module.exports = router;