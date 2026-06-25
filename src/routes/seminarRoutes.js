const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const seminarCollection = getCollection("seminar");

router.post("/seminar", async (req, res) => {
  const seminar = req.body;
  const result = await seminarCollection.insertOne(seminar);
  res.send(result);
});

router.get("/seminar", async (req, res) => {
  const result = await seminarCollection.find().toArray();
  res.send(result);
});

router.get("/seminar/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await seminarCollection.findOne(query);
  res.send(result);
});

router.delete("/seminar/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await seminarCollection.deleteOne(query);
  res.send(result);
});

module.exports = router;