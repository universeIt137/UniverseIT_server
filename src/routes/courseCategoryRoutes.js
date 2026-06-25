const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const courseCategoryCollection = getCollection("courseCategory");

router.post("/courseCategory", async (req, res) => {
  const data = req.body;
  const result = await courseCategoryCollection.insertOne(data);
  res.send(result);
});

router.get("/courseCategory", async (req, res) => {
  const result = await courseCategoryCollection.find().toArray();
  res.send(result);
});

router.get("/courseCategory/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await courseCategoryCollection.findOne(query);
  res.send(result);
});

router.delete("/courseCategory/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await courseCategoryCollection.deleteOne(query);
  res.send(result);
});

router.put("/courseCategory/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedInfo = {
    $set: {
      ...data,
    },
  };
  const result = await courseCategoryCollection.updateOne(
    query,
    updatedInfo,
    options,
  );
  res.send(result);
});

router.get("/courseCategory/course/:id", async (req, res) => {
  const myCourseId = req.params.id;
  const query = { courseId: myCourseId };
  const result = await courseCategoryCollection.find(query).toArray();
  res.send(result);
});

module.exports = router;