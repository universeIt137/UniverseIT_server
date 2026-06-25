const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// Import database initiation logic
const { connectDB } = require("./src/config/db");

// Middleware definitions
app.use(
  cors({
    origin: [
      "https://universeitinstitute.com",
      "https://www.universeitinstitute.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json());

// Initialize MongoDB context before mounting router systems
connectDB()
  .then(() => {
    // Registering separate route modules exactly to root paths
    app.use("/", require("./src/routes/seminarRoutes"));
    app.use("/", require("./src/routes/admissionRoutes"));
    app.use("/", require("./src/routes/blogRoutes"));
    app.use("/", require("./src/routes/facultyRoutes"));
    app.use("/", require("./src/routes/testimonialRoutes"));
    app.use("/", require("./src/routes/seminarRequestRoutes"));
    app.use("/", require("./src/routes/homepageRoutes"));
    app.use("/", require("./src/routes/galleryRoutes"));
    app.use("/", require("./src/routes/commentRoutes"));
    app.use("/", require("./src/routes/courseRoutes"));
    app.use("/", require("./src/routes/userRoutes"));
    app.use("/", require("./src/routes/courseCategoryRoutes"));
    app.use("/", require("./src/routes/semesterRoutes"));
    app.use("/", require("./src/routes/objectiveRoutes"));
    app.use("/", require("./src/routes/certificateRoutes"));
    app.use("/", require("./src/routes/successRoutes"));
    app.use("/", require("./src/routes/teamRoutes"));
    app.use("/", require("./src/routes/careerRoutes"));
    app.use("/", require("./src/routes/jobApplyRoutes"));
    app.use("/", require("./src/routes/popularCategoryRoutes"));
    app.use("/", require("./src/routes/feedbackRoutes"));
    app.use("/", require("./src/routes/representativeRoutes"));
    app.use("/", require("./src/routes/certificateGenerateRoutes"));
    app.use("/", require("./src/routes/videoRoutes"));

    // Default health route
    app.get("/", (req, res) => {
      res.send("server is ok");
    });

    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch(console.dir);