import React, {useState, useEffect} from 'react'
import {List} from 'immutable'
import {ReactComponent as LinkSvg} from './link.svg'
import PlaceHolderImg from './placeholder.png'
import './App.scss'

type Launches = List<LaunchData>

interface LaunchData {
  badgeId: string
  rocketName: string
  rocketType: string
  launchDate: string
  details: string
  id: string
  articleLink: string
}

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
    articleLink: 'http://example.com',
  }
])

type LaunchesResponseBody = LaunchesResponseEntry[]

interface LaunchesResponseEntry {
  details: string
  flight_number: number
  launch_date_local: string
  launch_date_unix: number
  launch_date_utc: string
  links: {
    article_link: string
    mission_patch: string
    mission_patch_small: string
  }
  rocket: {
    rocket_id: string
    rocket_name: string
    rocket_type: string
  }
}

export const App = () => {
  const [data, setData] = useState(initialState)

  useEffect(() => {
    (async () => {
      const response = await fetch('https://api.spacexdata.com/v2/launches')

      const json = await response.json() as LaunchesResponseBody

      setData(List(json.map(x => ({
        id: x.flight_number.toString(),
        articleLink: x.links.article_link,
        badgeId: x.links.mission_patch,
        details: x.details,
        launchDate: new Date(x.launch_date_unix * 1000).toLocaleDateString(),
        rocketName: x.rocket.rocket_name,
        rocketType: x.rocket.rocket_type,
      }))))
    })()
  }, [])

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
