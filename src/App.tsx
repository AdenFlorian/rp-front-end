import React, {Component} from 'react'
import {List} from 'immutable'
import './App.scss'

const data = List([
  {
    badgeId: 'a',
    rocketName: 'Falcon 1',
    rocketType: 'Merlin A',
    launchDate: '03/25/2005',
    details: 'Engine failure at 33 seconds and RUD',
    id: '1',
    articleLink: 'http://example.com'
  },
  {
    badgeId: 'b',
    rocketName: 'Falcon 9',
    rocketType: 'Merlin A',
    launchDate: '03/25/2006',
    details: 'Engine failure at 99 seconds and RUD',
    id: '2',
    articleLink: 'http://example.com'
  },
])

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-header">SpaceX Launches</h1>
        <div className="launchesContainer">
          <div className="filters">
          </div>
          <table className="rocketLaunchesTable">
            <tr>
              <th>Badge</th>
              <th>Rocket Name</th>
              <th>Rocket Type</th>
              <th>Launch Date</th>
              <th>Details</th>
              <th>ID</th>
              <th>Article</th>
            </tr>
            {data.map(entry => {
              return (
                <tr>
                  <td className="badge">{entry.badgeId}</td>
                  <td className="rocketName">{entry.rocketName}</td>
                  <td className="rocketType">{entry.rocketType}</td>
                  <td className="launchDate">{entry.launchDate}</td>
                  <td className="details">{entry.details}</td>
                  <td className="id">{entry.id}</td>
                  <td className="articleLink">{entry.articleLink}</td>
                </tr>
              )
            })}
          </table>
        </div>
      </div>
    )
  }
}

export default App
