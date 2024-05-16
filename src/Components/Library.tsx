/* eslint-disable @typescript-eslint/no-explicit-any */

import './Library.css';
import {ClipType, ImageType, TrackType} from "../type.ts";
import DraggableImg from "./DraggableImg.tsx";


type Props = {
    list: ImageType[]
    createEvent: ( clip: ClipType, event?: any)=>void;
    tracks: TrackType[]
}

const Library = (props: Props) => {
    const { list, tracks, createEvent } = props;


    return (
        <>
            <div className="library">
                <ul className="library-list">
                    {
                        list.map((imgData, index) => (
                            <li key={index}>
                                <DraggableImg imgId={`image_${index}`} img={imgData.src} createEvent={createEvent} tracks={tracks} />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default Library
