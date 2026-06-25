const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const objectiveCollection = getCollection("courseObjective");

router.post("/objectives", async (req, res) => {
  const data = req.body;
  const result = await objectiveCollection.insertOne(data);
  res.send(result);
});

router.get("/objectives", async (req, res) => {
  const result = await objectiveCollection.find().toArray();
  res.send(result);
});

router.get("/objectives/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await objectiveCollection.findOne(query);
  res.send(result);
});

router.delete("/objectives/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await objectiveCollection.deleteOne(query);
  res.send(result);
});

router.put("/objectives/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedInfo = {
    $set: {
      ...data,
    },
  };
  const result = await objectiveCollection.updateOne(
    query,
    updatedInfo,
    options,
  );
  res.send(result);
});

router.get("/objectives/course/:id", async (req, res) => {
  const myCourseId = req.params.id;
  const query = { courseId: myCourseId };
  const result = await objectiveCollection.find(query).toArray();
  res.send(result);
});

module.exports = router;