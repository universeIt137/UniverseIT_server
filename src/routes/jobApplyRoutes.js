const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const jobApplyCollection = getCollection("jobApply");

router.post("/apply-job", async (req, res) => {
  const data = req.body;
  const result = await jobApplyCollection.insertOne(data);
  res.send(result);
});

router.get("/apply-job", async (req, res) => {
  const result = await jobApplyCollection.find().toArray();
  res.send(result);
});

router.get("/apply-job/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await jobApplyCollection.findOne(query);
  res.send(result);
});

router.delete("/apply-job/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await jobApplyCollection.deleteOne(query);
  res.send(result);
});

router.put("/apply-job/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: {
      status: "confirmed",
    },
  };
  const result = await jobApplyCollection.updateOne(filter, updatedDoc);
  res.send(result);
});

module.exports = router;