const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const commentCollection = getCollection("comment");

router.post("/comments", async (req, res) => {
  const comment = req.body;
  const result = await commentCollection.insertOne(comment);
  res.send(result);
});

router.get("/comments", async (req, res) => {
  const result = await commentCollection.find().toArray();
  res.send(result);
});

router.get("/comments/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await commentCollection.findOne(query);
  res.send(result);
});

router.delete("/comments/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await commentCollection.deleteOne(query);
  res.send(result);
});

router.put("/comments/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedInfo = {
    $set: {
      ...data,
    },
  };
  const result = await commentCollection.updateOne(query, updatedInfo, options);
  res.send(result);
});

router.get("/comments/blog/:blogId", async (req, res) => {
  const myblogId = req.params.blogId;
  const query = { blogId: myblogId, isShow: true };
  const result = await commentCollection.find(query).toArray();
  res.send(result);
});

module.exports = router;