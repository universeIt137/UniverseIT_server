const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const semesterCollection = getCollection("semester");

router.post("/semesterByCourse", async (req, res) => {
  const data = req.body;
  const result = await semesterCollection.insertOne(data);
  res.send(result);
});

router.get("/semesterByCourse", async (req, res) => {
  const result = await semesterCollection.find().toArray();
  res.send(result);
});

router.get("/semesterByCourse/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await semesterCollection.findOne(query);
  res.send(result);
});

router.delete("/semesterByCourse/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await semesterCollection.deleteOne(query);
  res.send(result);
});

router.put("/semesterByCourse/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedInfo = {
    $set: {
      ...data,
    },
  };
  const result = await semesterCollection.updateOne(
    query,
    updatedInfo,
    options,
  );
  res.send(result);
});

router.get("/semesterByCourse/course/:id", async (req, res) => {
  const myCourseId = req.params.id;
  const query = { courseId: myCourseId };
  const result = await semesterCollection.find(query).toArray();
  res.send(result);
});

module.exports = router;