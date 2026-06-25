const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const certificateCollection = getCollection("certificate");

router.post("/certificate", async (req, res) => {
  const certificate = req.body;
  const result = await certificateCollection.insertOne(certificate);
  res.send(result);
});

router.get("/certificate", async (req, res) => {
  const cursor = certificateCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});

router.post("/certificateSerial", async (req, res) => {
  const data = req.body;
  const serial = data.serial;
  const query = { certificateNumber: serial };
  const result = await certificateCollection.findOne(query);
  res.send(result);
});

router.get("/certificate/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await certificateCollection.findOne(query);
  res.send(result);
});

router.delete("/certificate/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await certificateCollection.deleteOne(query);
  res.send(result);
});

router.put("/certificate/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedInfo = {
    $set: {
      ...data,
    },
  };
  const result = await certificateCollection.updateOne(
    query,
    updatedInfo,
    options,
  );
  res.send(result);
});

module.exports = router;