import React from "react"
import UsersInfo from "./components/userInfo/UsersInfo"
import AgeDemographicTableOfUser from "./components/AgeDemographicTableOfUser"
import "./App.css"
const App = () => {
  return (
    <div className="app">
      <UsersInfo />
      <AgeDemographicTableOfUser />
    </div>
  )
}

export default App
