import React, { useState, useEffect } from "react"
import axios from "axios"
import useDeepCompareEffect from "use-deep-compare-effect"
import Table from "../table/Table"

const AgeDemographic = () => {
  const [ageDemoData, setAgeDemoData] = useState([])
  const [selectedItem, setSelectedItem] = useState("")
  const [itemArray, setItemArray] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  //Use this special hook to avoid referential inequality in useEffect dependency list
  useDeepCompareEffect(() => {
    axios.get("/item").then((data) => setItemArray(data.data))
  }, [itemArray])

  useEffect(() => {
    if (setSelectedItem) {
      setLoading(true)
      axios
        .get(`/users/age/${selectedItem}`)
        .then((data) => {
          setAgeDemoData(data.data)
          setLoading(false)
          setError("")
        })
        .catch((e) => {
          setLoading(false)
          setError(e.response.data.message)
        })
    }
  }, [selectedItem])

  return (
    <div>
      <h2>
        Age Demographic of Users With {selectedItem ? selectedItem : `___`}
      </h2>
      <select
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.target.value)}
      >
        <option value="" disabled selected>
          Item
        </option>
        {itemArray &&
          itemArray.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
      </select>
      <Table
        col1Label="Age"
        col2Label="Count"
        data={ageDemoData}
        loading={loading}
      />
      {error && <p className="danger">{error}</p>}
    </div>
  )
}

export default AgeDemographic
