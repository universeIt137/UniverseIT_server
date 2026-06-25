const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const homepageContentCollection = getCollection("homepageContent");

router.post("/updateHomepageContent/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  if (id === "notAvailable") {
    const result = await homepageContentCollection.insertOne(data);
    res.send(result);
  } else {
    const query = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updatedInfo = {
      $set: {
        ...data,
      },
    };
    const result = await homepageContentCollection.updateOne(
      query,
      updatedInfo,
      options,
    );
    res.send(result);
  }
});

router.get("/homepageContent", async (req, res) => {
  const result = await homepageContentCollection.find().toArray();
  res.send(result);
});

module.exports = router;
