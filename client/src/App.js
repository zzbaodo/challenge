import React from "react"
import UsersInfo from "./components/userInfo/UsersInfo"
import AgeDemographic from "./components/ageDemographic/AgeDemographic"
import "./App.css"
const App = () => {
  return (
    <div className="app">
      <UsersInfo />
      <AgeDemographic />
    </div>
  )
}

export default App
