const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const seminarRequestCollection = getCollection("seminarRequest");

router.post("/seminarRequest", async (req, res) => {
  const seminarRequest = req.body;
  const result = await seminarRequestCollection.insertOne(seminarRequest);
  res.send(result);
});

router.get("/seminarRequest", async (req, res) => {
  const result = await seminarRequestCollection.find().toArray();
  res.send(result);
});

router.delete("/seminarRequest/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await seminarRequestCollection.deleteOne(query);
  res.send(result);
});

router.put("/seminarRequest/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: {
      status: "confirmed",
    },
  };
  const result = await seminarRequestCollection.updateOne(filter, updatedDoc);
  res.send(result);
});

module.exports = router;