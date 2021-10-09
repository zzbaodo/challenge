import React from "react"
import './Table.css'
const Table = ({ col1Label, col2Label, data, loading }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>{col1Label}</th>
          <th>{col2Label}</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          data &&
          data.map((el) => (
            <tr>
              <td>{el[Object.keys(el)[0]]}</td>
              <td>{el[Object.keys(el)[1]]}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

export default Table
