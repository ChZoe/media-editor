/* eslint-disable @typescript-eslint/no-explicit-any */

import './Library.css';
import { useEffect } from 'react';
import interact from "interactjs";
import {ClipType, TrackType} from "../type.ts";


type Props = {
    imgId: string;
    img: string;
    createEvent: (clip: ClipType, event?: any)=>void;
    tracks: TrackType[]
}

const DraggableImg = (props: Props) => {
    const { img, imgId, createEvent } = props;
    useEffect(() => {
        interact(`#${imgId}`)
            .draggable({
                inertia: true,
                listeners: {
                    end(event) {
                        console.log("dropzone",!event.dropzone)
                        if (createEvent) {
                            createEvent({ id: imgId, start: 0, end: 100, track: '', src: img },)
                        }
                    }
                }
            })
            ;

        return () => {}
    }, [])

    return (
        <>
            <img id={imgId} src={img} alt="img"/>
        </>
    )
}

export default DraggableImg
