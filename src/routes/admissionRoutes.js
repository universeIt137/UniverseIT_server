const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const admissionCollection = getCollection("admission");

router.post("/admission", async (req, res) => {
  const admissionRequest = req.body;
  const result = await admissionCollection.insertOne(admissionRequest);
  res.send(result);
});

router.get("/admission", async (req, res) => {
  const cursor = admissionCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});

router.delete("/admission/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await admissionCollection.deleteOne(query);
  res.send(result);
});

router.patch("/admission/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: {
      status: "confirmed",
    },
  };
  const result = await admissionCollection.updateOne(filter, updatedDoc);
  res.send(result);
});

module.exports = router;