"use strict"
const e = require("express")
const _ = require("lodash")
const db = require("./db.js")

// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dataAccessMethod())
    }, 500)
  })
}

// MOCK DB CALLS
//----------------
const getUsers = () => {
  const dataAccessMethod = () => _.map(db.usersById, (userInfo) => userInfo)
  return mockDBCall(dataAccessMethod)
}
const getItemArray = () => {
  const dataAccessMethod = () => {
    const itemSet = new Set()
    const keys = Object.keys(db.itemsOfUserByUsername)
    for (let key of keys) {
      for (let i = 0; i < db.itemsOfUserByUsername[key].length; i++) {
        itemSet.add(db.itemsOfUserByUsername[key][i])
      }
    }
    return Array.from(itemSet)
  }
  return mockDBCall(dataAccessMethod)
}
const getListOfAgesOfUsersWith = (item) => {
  const dataAccessMethod = () => {
    //Find a list of User that have the item
    const keys = Object.keys(db.itemsOfUserByUsername)
    const arrayOfUsersWithItem = []
    for (let key of keys) {
      if (db.itemsOfUserByUsername[key].includes(item)) {
        arrayOfUsersWithItem.push(key)
      }
    }

    // Update the count of the specific age using Map with Key:Age, Val: Count
    const mapOfAgeAndCount = new Map()
    _.forEach(db.usersById, (userInfo) => {
      if (arrayOfUsersWithItem.includes(userInfo.username)) {
        if (mapOfAgeAndCount.has(userInfo.age)) {
          mapOfAgeAndCount.set(
            userInfo.age,
            mapOfAgeAndCount.get(userInfo.age) + 1
          )
        } else {
          mapOfAgeAndCount.set(userInfo.age, 1)
        }
      }
    })
    //Convert Map to JS Object and Restructure Data Shape to send back to Client
    const objFromMap = Object.fromEntries(mapOfAgeAndCount)
    const result = []
    const age = Object.keys(objFromMap)
    const count = _.map(objFromMap, (el) => el)
    for (let i = 0; i < age.length; i++) {
      result.push({ age: age[i], count: count[i] })
    }
 
    return result
  }
  return mockDBCall(dataAccessMethod)
}

module.exports = {
  getUsers,
  getListOfAgesOfUsersWith,
  getItemArray,
}
