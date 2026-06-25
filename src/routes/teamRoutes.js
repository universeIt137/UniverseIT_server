const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const teamCollection = getCollection("team");

router.post("/team-member", async (req, res) => {
  const member = req.body;
  const result = await teamCollection.insertOne(member);
  res.send(result);
});

router.get("/team-member", async (req, res) => {
  const result = await teamCollection.find().toArray();
  res.send(result);
});

router.get("/team-member/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await teamCollection.findOne(query);
  res.send(result);
});

router.delete("/team-member/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await teamCollection.deleteOne(query);
  res.send(result);
});

router.put("/team-member/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedInfo = {
    $set: {
      ...data,
    },
  };
  const result = await teamCollection.updateOne(query, updatedInfo, options);
  res.send(result);
});

module.exports = router;