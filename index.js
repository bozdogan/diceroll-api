const express = require("express");
const path = require("path");
const apiRoutes = require("./apiRoutes");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/api", apiRoutes);

const listener = app.listen(3001, () => {
    console.log(`LISTENING ON PORT ${listener.address().port}`);
});