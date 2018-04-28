const path = require("path")
const express = require("express")
const app = express()

console.log("__dirname: " + __dirname)

app.use(express.static(path.join(__dirname, "\\..\\dist\\")))
app.listen(3001)