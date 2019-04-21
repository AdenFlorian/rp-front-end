import React, {useState, useEffect} from 'react'
import {List} from 'immutable'
import {LaunchesViewData, getLaunches} from './spacex-client'
import {ReactComponent as LinkSvg} from './link.svg'
import {ReactComponent as RefreshSvg} from './refresh.svg'
import PlaceHolderImg from './placeholder.png'
import './App.scss'

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
]) as LaunchesViewData

export const App = () => {
  const [data, setData] = useState(initialState)

  useEffect(() => {
    (async () => setData(await getLaunches()))()
  }, [])

  return (
    <div className="app">
      <h1 className="pageTitle">SpaceX Launches</h1>
      <div className="launchesContainer">
        <div className="tableOptions">
          <div className="refresh">
            <button><RefreshSvg /></button>
          </div>
          <div className="filters">
            <div className="checkboxWrapper">
              <label htmlFor="landSuccess">Land Success</label>
              <input name="landSuccess" type="checkbox" />
            </div>
            <div className="checkboxWrapper">
              <label htmlFor="reused">Reused</label>
              <input name="reused" type="checkbox" />
            </div>
            <div className="checkboxWrapper">
              <label htmlFor="withReddit">With Reddit</label>
              <input name="withReddit" type="checkbox" />
            </div>
          </div>
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
                    <img src={entry.badgeUrl || PlaceHolderImg} alt="mission patch" />
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
