import {List} from 'immutable'

export async function getLaunches(): Promise<LaunchesViewData> {
    const response = await fetch('https://api.spacexdata.com/v2/launches')

    const body = await response.json() as LaunchesResponse

    // For testing empty data
    // body.unshift({})

    return List<LaunchViewData>(body.map(mapFromResponseToView))
}

function mapFromResponseToView(responseLaunch: LaunchesResponseEntry): LaunchViewData {
    return {
        id: responseLaunch.flight_number ? responseLaunch.flight_number.toString() : 'N/A',
        articleLink: responseLaunch.links && responseLaunch.links.article_link,
        redditLink: responseLaunch.links && responseLaunch.links.reddit_launch,
        badgeUrl: responseLaunch.links && responseLaunch.links.mission_patch_small,
        details: responseLaunch.details || 'N/A',
        launchDate: responseLaunch.launch_date_unix
            ? new Date(responseLaunch.launch_date_unix * 1000).toLocaleDateString()
            : 'N/A',
        rocketName: responseLaunch.rocket && responseLaunch.rocket.rocket_name || 'N/A',
        rocketType: responseLaunch.rocket && responseLaunch.rocket.rocket_type || 'N/A',
        reused: wereAnyCoresReused(responseLaunch),
        successfulLanding: wasSuccessFulLanding(responseLaunch),
    }
}

/** Returns true if any cores were reused, false if none did, or undefined if unknown */
function wereAnyCoresReused(responseLaunch: LaunchesResponseEntry): boolean | undefined {
    return responseLaunch.reuse
        ? (responseLaunch.reuse.core ||
            responseLaunch.reuse.side_core1 ||
            responseLaunch.reuse.side_core2 ||
            responseLaunch.reuse.fairings ||
            responseLaunch.reuse.capsule)
        : undefined
}

/** Returns true if any core landed successfully, false if none did, or undefined if unknown */
function wasSuccessFulLanding(responseLaunch: LaunchesResponseEntry): boolean | undefined {
    if (!responseLaunch.rocket) return undefined
    if (!responseLaunch.rocket.first_stage) return undefined
    if (!responseLaunch.rocket.first_stage.cores) return undefined
    if (responseLaunch.rocket.first_stage.cores.every(x => x.land_success === undefined)) return undefined

    return responseLaunch.rocket.first_stage.cores.some(x => x.land_success === true)
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
        reddit_launch?: string
    }
    rocket?: {
        rocket_id?: string
        rocket_name?: string
        rocket_type?: string
        first_stage?: {
            cores?: [{
                land_success?: boolean
            }]
        }
    }
    reuse?: {
        core?: boolean
        side_core1?: boolean
        side_core2?: boolean
        fairings?: boolean
        capsule?: boolean
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
    redditLink?: string
    reused?: boolean
    successfulLanding?: boolean
}
