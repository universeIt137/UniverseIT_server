const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const QRCode = require("qrcode");
const { getCollection } = require("../config/db");

const certificateGenerateCollection = getCollection("certificateGenerate");

router.post("/certificate-generate", async (req, res) => {
  const {
    name,
    hour,
    course_category,
    course_name,
    student_ID,
    duration,
    year,
    date_of_issue,
  } = req.body;
  const qrImageUrl = await QRCode.toDataURL(
    `${name} ${hour} ${course_category} ${course_name} ${student_ID} ${duration} ${year} ${date_of_issue}   `,
  );
  const data = {
    name,
    hour,
    course_category,
    course_name,
    student_ID,
    duration,
    year,
    date_of_issue,
    qr_url: qrImageUrl,
  };
  const result = await certificateGenerateCollection.insertOne(data);
  res.send(result);
});

router.get("/certificate-generate", async (req, res) => {
  const result = await certificateGenerateCollection.find().toArray();
  res.send(result);
});

router.get("/certificate-generate/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await certificateGenerateCollection.findOne(query);
  res.send(result);
});

router.put("/certificate-generate/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedInfo = {
    $set: {
      ...data,
    },
  };
  const result = await certificateGenerateCollection.updateOne(
    query,
    updatedInfo,
    options,
  );
  res.send(result);
});

router.delete("/certificate-generate/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await certificateGenerateCollection.deleteOne(query);
  res.send(result);
});

module.exports = router;