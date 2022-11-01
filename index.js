const express = require("express");
const cors = require("cors");

const app = express();

const corOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
};

app.use(cors(corOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! Function to serve all static files
//! inside public directory.
app.use(express.static("public"));
app.use("/images", express.static("images"));

const appRoutes = require("./routes/app.route");

app.use("/api/", appRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serwer wystartowal na portcie ${PORT}`);
});
