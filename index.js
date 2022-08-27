const express = require("express");
const cors = require("cors");

const app = express();

const corOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

const userRoutes = require("./routes/user.route");
const markerRoutes = require("./routes/marker.route");

app.use("/api/", userRoutes);
app.use("/api/", markerRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serwer wystartowal na portcie ${PORT}`);
});
