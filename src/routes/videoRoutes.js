const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const videoCollection = getCollection("video");

router.post("/video-upload", async (req, res) => {
  const reqBody = req.body;
  const data = await videoCollection.insertOne(reqBody);
  res.send(data);
});

router.get("/all-video", async (req, res) => {
  let data = await videoCollection.find().toArray();
  res.json(data);
});

router.get("/single-video/:id", async (req, res) => {
  let id = req.params.id;
  const filter = {
    _id: new ObjectId(id),
  };
  const data = await videoCollection.findOne(filter);
  res.send(data);
});

router.put("/video-update/:id", async (req, res) => {
  const id = req.params.id;
  const filter = {
    _id: new ObjectId(id),
  };
  const data = req.body;
  const options = { upsert: true };
  const updatedInfo = {
    $set: {
      ...data,
    },
  };
  const result = await videoCollection.updateOne(filter, updatedInfo, options);
  res.send(result);
});

router.delete("/video-delete/:id", async (req, res) => {
  const id = req.params.id;
  const filter = {
    _id: new ObjectId(id),
  };
  const data = await videoCollection.deleteOne(filter);
  res.send(data);
});

module.exports = router;