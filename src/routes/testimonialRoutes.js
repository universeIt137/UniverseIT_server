const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const testimonialCollection = getCollection("testimonial");

router.post("/testimonial", async (req, res) => {
  const info = req.body;
  const result = await testimonialCollection.insertOne(info);
  res.send(result);
});

router.get("/testimonial", async (req, res) => {
  const result = await testimonialCollection.find().toArray();
  res.send(result);
});

router.delete("/testimonial/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await testimonialCollection.deleteOne(query);
  res.send(result);
});

router.get("/singleTestimonial/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await testimonialCollection.findOne(query);
  res.send(result);
});

router.put("/updateTestimonial/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedInfo = {
    $set: {
      ...data,
    },
  };
  const result = await testimonialCollection.updateOne(
    query,
    updatedInfo,
    options,
  );
  res.send(result);
});

module.exports = router;