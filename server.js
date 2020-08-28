const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

app.set("views", __dirname + "/views");
app.set("view engine", "jsx");

var options = { beautify: true };
app.engine("jsx", require("express-react-views").createEngine(options));

app.use(express.static(path.join(__dirname, "..", "build")));
// app.use(express.static("public"));

const PORT = process.env.PORT || 3001;

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://reportbuilderaddon-api.dev.uds.systems",
    changeOrigin: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname + "/src/index.js"));
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "..", "build", "index.html"));
// });
