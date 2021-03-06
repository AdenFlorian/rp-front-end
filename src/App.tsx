import React, {useState, useEffect} from 'react'
import {List} from 'immutable'
import {getLaunches, LaunchViewData} from './spacex-client'
import {ReactComponent as LinkSvg} from './link.svg'
import {ReactComponent as RefreshSvg} from './refresh.svg'
import PlaceHolderImg from './placeholder.png'
import './App.scss'

const initialState = List<LaunchViewData>([{
  badgeUrl: undefined,
  rocketName: 'Loading...',
  rocketType: 'Loading...',
  launchDate: 'Loading...',
  details: 'Loading...',
  id: 'Loading...',
  articleLink: undefined,
  hasRedditLink: false,
  reused: undefined,
  successfulLanding: undefined,
} as LaunchViewData])

const initialFiltersState = Object.freeze({
  successfulLandings: true,
  reused: false,
  reddit: false,
})

type FiltersState = typeof initialFiltersState

export const App = () => {
  const [data, setData] = useState(initialState)

  const [filters, setFilters] = useState(initialFiltersState)

  useEffect(() => {
    (async () => loadLatestLaunchData())()
  }, [])

  async function loadLatestLaunchData() {
    setData(await getLaunches())
  }

  return (
    <div className="app">
      {/* <div className="parallaxBackground" /> */}
      <h1 className="pageTitle">SpaceX Launches</h1>
      <div className="launchesContainer">
        <div className="tableOptions">
          <div className="refresh">
            <button onClick={loadLatestLaunchData}>
              <RefreshSvg />
              <svg className="refreshCircle" width="60" height="60">
                <circle cx="30" cy="30" r="17.5" />
              </svg>
            </button>
          </div>
          <div className="filters">
            <div className="checkboxWrapper">
              <input name="landSuccess" type="checkbox" checked={filters.successfulLandings} onChange={({target: {checked}}) => setFilters({...filters, successfulLandings: checked})} />
              <label htmlFor="landSuccess">Land Success</label>
            </div>
            <div className="checkboxWrapper">
              <input name="reused" type="checkbox" checked={filters.reused} onChange={({target: {checked}}) => setFilters({...filters, reused: checked})} />
              <label htmlFor="reused">Reused</label>
            </div>
            <div className="checkboxWrapper">
              <input name="withReddit" type="checkbox" checked={filters.reddit} onChange={({target: {checked}}) => setFilters({...filters, reddit: checked})} />
              <label htmlFor="withReddit">With Reddit</label>
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
            {data.filter(meetsFilters(filters)).map(entry => {
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
                      ? <a href={entry.articleLink} target="_blank"><LinkSvg /></a>
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

const meetsFilters = (filters: FiltersState) => (entry: LaunchViewData) => {
  if (filters.reddit && !entry.hasRedditLink) return false
  if (filters.reused && !entry.reused) return false
  if (filters.successfulLandings && !entry.successfulLanding) return false

  return true
}
