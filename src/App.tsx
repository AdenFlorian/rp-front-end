import React, {useState, useEffect} from 'react'
import {List} from 'immutable'
import {ReactComponent as LinkSvg} from './link.svg'
import PlaceHolderImg from './placeholder.png'
import './App.scss'

type Launches = List<LaunchData>

interface LaunchData {
  badgeUrl?: string
  rocketName: string
  rocketType: string
  launchDate: string
  details: string
  id: string
  articleLink?: string
}

const initialState = List([
  {
    badgeId: undefined,
    rocketName: 'Loading...',
    rocketType: 'Loading...',
    launchDate: 'Loading...',
    details: 'Loading...',
    id: 'Loading...',
    articleLink: undefined
  },
]) as Launches

type LaunchesResponseBody = LaunchesResponseEntry[]

interface LaunchesResponseEntry {
  details?: string
  flight_number?: number
  launch_date_local?: string
  launch_date_unix?: number
  launch_date_utc?: string
  links?: {
    article_link?: string
    mission_patch?: string
    mission_patch_small?: string
  }
  rocket?: {
    rocket_id?: string
    rocket_name?: string
    rocket_type?: string
  }
}

export const App = () => {
  const [data, setData] = useState(initialState)

  useEffect(() => {
    (async () => {
      const response = await fetch('https://api.spacexdata.com/v2/launches')

      const body = await response.json() as LaunchesResponseBody

      // For testing empty data
      // body.unshift({})

      setData(List(body.map(x => ({
        id: x.flight_number ? x.flight_number.toString() : 'N/A',
        articleLink: x.links && x.links.article_link,
        badgeUrl: x.links && x.links.mission_patch_small,
        details: x.details || 'N/A',
        launchDate: x.launch_date_unix
          ? new Date(x.launch_date_unix * 1000).toLocaleDateString()
          : 'N/A',
        rocketName: x.rocket && x.rocket.rocket_name || 'N/A',
        rocketType: x.rocket && x.rocket.rocket_type || 'N/A',
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
                  <td className={`badge ${!entry.badgeUrl ? 'placeHolder' : ''}`}>
                    <img src={entry.badgeUrl || PlaceHolderImg} alt="badge image" />
                  </td>
                  <td className="rocketName">{entry.rocketName}</td>
                  <td className="rocketType">{entry.rocketType}</td>
                  <td className="launchDate">{entry.launchDate}</td>
                  <td className="details">{entry.details}</td>
                  <td className="id">{entry.id}</td>
                  <td className="articleLink">
                    {entry.articleLink
                      ? <a href={entry.articleLink}><LinkSvg /></a>
                      : 'N/A'
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
