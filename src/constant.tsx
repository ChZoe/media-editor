
import {ImageType, TrackType} from "./type";

export const imgList: ImageType[] = [
    {
        id: 1,
        src: "/1.jpg"
    },
    {
        id: 2,
        src: "/2.jpg"
    },
    {
        id: 3,
        src: "/3.png"
    },
]

export const trackList: TrackType[] = [
    {
        id: 'track-1',
        clips: [
            { id: 'clip1', start: 50, end: 100, track: 'track-1', src: "/1.jpg" },
            { id: 'clip2', start: 150, end: 280, track: 'track-1', src: "/2.jpg" },
        ]
    },
    {
        id: 'track-2',
        clips: [
            { id: 'clip3', start: 320, end: 405, track: 'track-2', src: "/3.png" },
        ]
    }
]