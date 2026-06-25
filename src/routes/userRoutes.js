const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");

const usersCollection = getCollection("users");

router.post("/register", async (req, res) => {
  const { name, email } = req.body;
  try {
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email already exists" });
    }
    const user = { name, email };
    const result = await usersCollection.insertOne(user);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

router.post("/login", async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  const existingUser = await usersCollection.findOne(query);

  if (existingUser) {
    if (existingUser.email == user.email) {
      return res.send({ message: "login successful", insertedId: 2 });
    }
  } else {
    return res.send("user not found");
  }
});

router.get("/users", async (req, res) => {
  const result = await usersCollection.find().toArray();
  res.send(result);
});

router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await usersCollection.findOne(query);
  res.send(result);
});

router.get("/usersByEmail/:email", async (req, res) => {
  const email = req.params.email;
  const query = { email };
  const result = await usersCollection.findOne(query);
  res.send(result);
});

router.put("/users/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedInfo = {
    $set: {
      ...data,
    },
  };
  const result = await usersCollection.updateOne(query, updatedInfo, options);
  res.send(result);
});

router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await usersCollection.deleteOne(query);
  res.send(result);
});

router.put("/users/role/admin", async (req, res) => {
  const { id, admin } = req.body;
  const updatedData = { $set: { admin } };
  const query = { _id: new ObjectId(id) };
  const result = await usersCollection.updateOne(query, updatedData);
  res.send(result);
});

router.put("/users/role/representative", async (req, res) => {
  const { id, representative } = req.body;
  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    if (user && user.representative_id) {
      const updatedData = { $set: { representative } };
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.updateOne(query, updatedData);
      return res.send({
        success: true,
        message: "Representative role updated, ID remains unchanged.",
        result,
      });
    }
    const lastRep = await usersCollection
      .find({ representative_id: { $exists: true } })
      .sort({ representative_id: -1 })
      .limit(1)
      .toArray();

    let newRepId = "REP-001";
    if (lastRep.length > 0) {
      const lastId = lastRep[0].representative_id;
      const idNumber = parseInt(lastId.split("-")[1]);
      newRepId = `REP-${String(idNumber + 1).padStart(3, "0")}`;
    }
    const updatedData = {
      $set: { representative, representative_id: newRepId },
    };
    const query = { _id: new ObjectId(id) };
    const result = await usersCollection.updateOne(query, updatedData);
    res.send({
      success: true,
      message: "Representative role and ID updated.",
      result,
    });
  } catch (err) {
    res
      .status(500)
      .send({
        success: false,
        message: "Error updating user.",
        error: err.message,
      });
  }
});

router.post("/users/role/representative", async (req, res) => {
  const data = req.body;
  const email = req.body.email;
  try {
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "A user with this email already exists.",
      });
    }
    const result = await usersCollection.insertOne(data);
    res.send({
      success: true,
      message: "New representative user created successfully.",
      result,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error creating user.",
      error: err.message,
    });
  }
});

module.exports = router;