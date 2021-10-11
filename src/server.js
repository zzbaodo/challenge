"use strict"
const express = require("express")
const favicon = require("serve-favicon")
const path = require("path")

const app = express()
const registerRoutes = require("./routes")
const opn = require('open')

// server config
const port = process.env.PORT || 3000

// register routes
registerRoutes(app)


//Serve HTML file
app.use(
  "/",
  express.static(path.join(__dirname, "..", "client", "dist"))
)

//Implement favicon
app.use(favicon(path.join(__dirname, "../", "client", "public", "favicon.png")))


// create server start method
const start = () => {
  return new Promise((resolve, reject) => {
    // start the server
    app.listen(port, () => {
      console.log(`Connected to Port ${port}`)
      opn("http://localhost:3000/")
      resolve()
    })
  }).catch((error) => {
    console.log(`failed to start server => ${error.message}`)
  })
}

module.exports = start
