/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from 'react'
import interact from 'interactjs'
import Clip from './Clip'
import './Track.css'
import {ClipType, TrackType} from "../type.ts";


// let initAbsoluteDistanceX = 0

type Props = {
    track: TrackType,
    onCreateTrack: (clip: ClipType, event?: any) => void,
    onUpdateTrack: (finalTrack: string, clip: ClipType) => void,
    onDraggableImageOver?: any
}

const Track = ({
                   track,
                   onCreateTrack,
                   onUpdateTrack,
                   onDraggableImageOver
               }:Props) => {

    const trackRef = useRef(null)
    const clipRef = useRef(null)

    const onResizeStart = () => {}

    const onResize = () => {}

    const onResizeEnd = () => {}

    const onDragStart = () => {
        // const { left } = event.rect
        // initAbsoluteDistanceX = left - clip.start
    }

    const onDrag = () => {
        // ...
    }

    const onDragEnd = (event: any, clip: ClipType) => {

        console.log("event.dropzone", event.dropzone, event?.dropzone?.target);
        if (!event.dropzone) {
            onCreateTrack(clip, event)
            return
        }

        const finalTrack = event.dropzone.target.slice(1)
        onUpdateTrack(finalTrack, clip)
    }

    useEffect(() => {
        const trackInteractable = interact(`#${track.id}`)

        trackInteractable.dropzone({
            overlap: 0.5,
            ondragenter(event) {
                console.log('drag-enter', event)
                if (event.draggable.target.slice(1) === 'draggable-img') {
                    onDraggableImageOver && onDraggableImageOver(true)
                }
            },
            ondragleave(event) {
                console.log('drag-leave', event)
                if (event.draggable.target.slice(1) === 'draggable-img') {
                    onDraggableImageOver && onDraggableImageOver(false)
                }
            }
        })

        return () => {}
    }, [])

    return (
        <div
            id={track.id}
            className="track"
            ref={trackRef}
        >
            {track.clips.map((clip) => (
                <Clip
                    key={clip.id}
                    clip={clip}
                    ref={clipRef}
                    onResizeStart={onResizeStart}
                    onResize={onResize}
                    onResizeEnd={onResizeEnd}
                    onDragStart={onDragStart}
                    onDrag={onDrag}
                    onDragEnd={onDragEnd}
                />
            ))}
        </div>
    )
}

export default Track
