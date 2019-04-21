import {List} from 'immutable'

export async function getLaunches(): Promise<LaunchesViewData> {
    const response = await fetch('https://api.spacexdata.com/v2/launches')

    const body = await response.json() as LaunchesResponse

    // For testing empty data
    // body.unshift({})

    return List(body.map(x => ({
        id: x.flight_number ? x.flight_number.toString() : 'N/A',
        articleLink: x.links && x.links.article_link,
        badgeUrl: x.links && x.links.mission_patch_small,
        details: x.details || 'N/A',
        launchDate: x.launch_date_unix
            ? new Date(x.launch_date_unix * 1000).toLocaleDateString()
            : 'N/A',
        rocketName: x.rocket && x.rocket.rocket_name || 'N/A',
        rocketType: x.rocket && x.rocket.rocket_type || 'N/A',
    })))
}

export type LaunchesResponse = LaunchesResponseEntry[]

export interface LaunchesResponseEntry {
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

export type LaunchesViewData = List<LaunchViewData>

export interface LaunchViewData {
    badgeUrl?: string
    rocketName: string
    rocketType: string
    launchDate: string
    details: string
    id: string
    articleLink?: string
}
