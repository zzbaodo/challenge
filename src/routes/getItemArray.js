"use strict"
const mockDBCalls = require("../database/index.js")

const getItemArray = async (request, response) => {
  try {
    const data = await mockDBCalls.getItemArray()

    return response.status(200).send(JSON.stringify(data))
  } catch (error) {
    console.log(error.message)
    return response.status(400).json({ message: "Something is wrong" })
  }
}

module.exports = (app) => {
  app.get("/item", getItemArray)
}
