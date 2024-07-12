const express = require("express");
const expressLayout = require("express-ejs-layouts");

const app = express();
const port = 3000;
app.use(express.json());

app.use(express.static("public"));

// Template Engine
app.use(expressLayout);
app.set("layout", "layouts/main");
app.set("view engine", "ejs");
//app.set("views", __dirname + "/views");
// Routes
const homeRoutes = require("./routes/home");

app.use("/", homeRoutes);

// Handle 404
app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Serverul rulează la adresa http://localhost:${port}/`);
});
