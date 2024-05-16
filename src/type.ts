
export type ImageType = {
    id: number,
    src:string
}


export type ClipType = {
    id: string,
    start: number,
    end: number,
    track?: string
    src: string
}

export type TrackType = {
    id: string,
    clips: ClipType[]
}