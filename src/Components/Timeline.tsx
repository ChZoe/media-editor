/* eslint-disable @typescript-eslint/no-explicit-any */

import './Timeline.css'

import {ClipType, TrackType} from "../type.ts";
import Track from "./Track";
import {useEffect} from "react";

type Props = {
    createEvent: (clip: ClipType, event?: any) => void;
    updateEvent: (finalTrack: string,clip: ClipType) => void;
    tracks: TrackType[];
}

const Timeline = (props: Props) => {
    const {createEvent, tracks, updateEvent} = props;

    useEffect(()=>{
        console.log("tracks", tracks);
    }, [tracks])

    return (
        <>
            <div className="container">
                <div className="timeline">
                    {tracks.map((track) => (
                        <Track
                            key={track.id}
                            track={track}
                            onCreateTrack={createEvent}
                            onUpdateTrack={updateEvent}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Timeline
