const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const categoryCollection = getCollection("category");
const studentGalleryCollection = getCollection("studentGallery");

router.post("/addCategory", async (req, res) => {
  const data = req.body;
  const result = await categoryCollection.insertOne(data);
  res.send(result);
});

router.get("/allCategory", async (req, res) => {
  const result = await categoryCollection.find().toArray();
  res.send(result);
});

router.put("/updateCategory/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedInfo = {
    $set: {
      ...data,
    },
  };
  const result = await categoryCollection.updateOne(
    query,
    updatedInfo,
    options,
  );
  res.send(result);
});

router.delete("/deleteCategory/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await categoryCollection.deleteOne(query);
  res.send(result);
});

router.get("/category/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await categoryCollection.findOne(query);
  res.send(result);
});

router.post("/addImage", async (req, res) => {
  const { category_id, image_url } = req.body;
  const imageData = {
    category_id: new ObjectId(category_id),
    image_url,
  };
  const result = await studentGalleryCollection.insertOne(imageData);
  res.send(result);
});

router.get("/imagesByCategory/:id", async (req, res) => {
  const category_id = req.params.id;
  const query = { category_id: new ObjectId(category_id) };
  const result = await studentGalleryCollection.find(query).toArray();
  res.send(result);
});

router.post("/studentGallery", async (req, res) => {
  const info = req.body;
  const result = await studentGalleryCollection.insertOne(info);
  res.send(result);
});

router.get("/studentGallery", async (req, res) => {
  const result = await studentGalleryCollection.find().toArray();
  res.send(result);
});

router.get("/singleStudentGallery/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await studentGalleryCollection.findOne(query);
  res.send(result);
});

router.delete("/studentGallery/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await studentGalleryCollection.deleteOne(query);
  res.send(result);
});

router.put("/updateStudentGallery/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedInfo = {
    $set: {
      ...data,
    },
  };
  const result = await studentGalleryCollection.updateOne(
    query,
    updatedInfo,
    options,
  );
  res.send(result);
});

module.exports = router;