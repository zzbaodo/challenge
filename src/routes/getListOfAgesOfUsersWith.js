"use strict"
const mockDBCalls = require("../database/index.js")

const getListOfAgesOfUsersWithHandler = async (request, response) => {
  try {
    const itemToLookup = request.params.item
    const data = await mockDBCalls.getListOfAgesOfUsersWith(itemToLookup)
    return response.status(200).json(data)
  } catch (error) {
    console.log(error.message)
    return response
      .status(400)
      .json({ message: "No users found associated with given item" })
  }
}

module.exports = (app) => {
  app.get("/users/age/:item", getListOfAgesOfUsersWithHandler)
}
