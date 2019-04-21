import React, {useState, useEffect} from 'react'
import {List} from 'immutable'
import {ReactComponent as LinkSvg} from './link.svg'
import PlaceHolderImg from './placeholder.png'
import './App.scss'

const initialState = List([
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
    details: 'Engine failure at 99 seconds and RUD lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    id: '2',
    articleLink: 'http://example.com'
  },
  {
    badgeId: 'a',
    rocketName: 'Falcon 1',
    rocketType: 'Merlin A',
    launchDate: '03/25/2005',
    details: 'Engine failure at 33 seconds and RUD',
    id: '3',
    articleLink: 'http://example.com'
  },
  {
    badgeId: 'b',
    rocketName: 'Falcon 9',
    rocketType: 'Merlin A',
    launchDate: '03/25/2006',
    details: 'Engine failure at 99 seconds and RUD lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    id: '4',
    articleLink: 'http://example.com'
  },
  {
    badgeId: 'a',
    rocketName: 'Falcon 1',
    rocketType: 'Merlin A',
    launchDate: '03/25/2005',
    details: 'Engine failure at 33 seconds and RUD',
    id: '5',
    articleLink: 'http://example.com'
  },
  {
    badgeId: 'b',
    rocketName: 'Falcon 9',
    rocketType: 'Merlin A',
    launchDate: '03/25/2006',
    details: 'Engine failure at 99 seconds and RUD lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    id: '6',
    articleLink: 'http://example.com'
  },
  {
    badgeId: 'a',
    rocketName: 'Falcon 1',
    rocketType: 'Merlin A',
    launchDate: '03/25/2005',
    details: 'Engine failure at 33 seconds and RUD',
    id: '7',
    articleLink: 'http://example.com'
  },
  {
    badgeId: 'b',
    rocketName: 'Falcon 9',
    rocketType: 'Merlin A',
    launchDate: '03/25/2006',
    details: 'Engine failure at 99 seconds and RUD lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    id: '8',
    articleLink: 'http://example.com'
  },
  {
    badgeId: 'a',
    rocketName: 'Falcon 1',
    rocketType: 'Merlin A',
    launchDate: '03/25/2005',
    details: 'Engine failure at 33 seconds and RUD',
    id: '9',
    articleLink: 'http://example.com'
  },
  {
    badgeId: 'b',
    rocketName: 'Falcon 9',
    rocketType: 'Merlin A',
    launchDate: '03/25/2006',
    details: 'Engine failure at 99 seconds and RUD lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    id: '10',
    articleLink: 'http://example.com'
  },
])

export const App = () => {
  const [data, setData] = useState(initialState)

  useEffect(() => {
    console.log('asd')
  })

  return (
    <div className="app">
      <h1 className="pageTitle">SpaceX Launches</h1>
      <div className="launchesContainer">
        <div className="filters">
        </div>
        <table className="rocketLaunchesTable">
          <thead>
            <tr>
              <th className="badge">Badge</th>
              <th className="rocketName">Rocket Name</th>
              <th className="rocketType">Rocket Type</th>
              <th className="launchDate">Launch Date</th>
              <th className="details">Details</th>
              <th className="id">ID</th>
              <th className="articleLink">Article</th>
            </tr>
          </thead>
          <tbody>
            {data.map(entry => {
              return (
                <tr key={entry.id}>
                  <td className="badge"><img src={PlaceHolderImg} alt="badge image" /></td>
                  <td className="rocketName">{entry.rocketName}</td>
                  <td className="rocketType">{entry.rocketType}</td>
                  <td className="launchDate">{entry.launchDate}</td>
                  <td className="details">{entry.details}</td>
                  <td className="id">{entry.id}</td>
                  <td className="articleLink"><a href={entry.articleLink}><LinkSvg /></a></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
