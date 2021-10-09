import React, { useEffect, useState } from "react"
import "./UsersInfo.css"
import Table from "../table/Table"
import axios from "axios"

const UsersInfo = () => {
  const [userData, setUserData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    axios
      .get("/users")
      .then((data) => {
        setUserData(data.data)
        setError("")
        setLoading(false)
      })
      .catch((e) => {
        setError(e.response.data.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="all-users">
      <h1>All Users</h1>
      <h3>Users and their age</h3>
      {error ? (
        <p className="danger">{error}</p>
      ) : (
        <Table
          col1Label="User Name"
          col2Label="Age"
          data={userData}
          loading={loading}
        />
      )}
    </div>
  )
}

export default React.memo(UsersInfo)
