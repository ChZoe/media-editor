/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useEffect } from 'react'
import interact from 'interactjs'
import './Clip.css'
import {ClipType} from "../type.ts";

type Props = {
    clip: ClipType,
    onResizeStart: any,
    onResize: any,
    onResizeEnd: any,
    onDragStart: any,
    onDrag: any,
    onDragEnd:any
}

const Clip = forwardRef((
    {
        clip,
        onResizeStart,
        onResize,
        onResizeEnd,
        onDragStart,
        onDrag,
        onDragEnd,
    }: Props,
    clipRef
) => {

    useEffect(() => {
        interact(`#${clip.id}`)
            .draggable({
                inertia: true,
                listeners: {
                    start(event) {
                        onDragStart(event, clip)
                    },
                    move(event) {
                        const x = (parseFloat(event.target.dataset.x) || 0) + event.dx
                        const y = (parseFloat(event.target.dataset.y) || 0) + event.dy
                        // const originY = (parseFloat(event.target.dataset.y) || 0)

                        event.target.style.transform = `translate(${x}px, ${y}px)`
                        Object.assign(event.target.dataset, { x, y })
                        onDrag(event)
                    },
                    end(event) {
                        onDragEnd(event, clip)
                    }
                }
            })
            .resizable({
                edges: {
                    left: true,
                    right: true,
                },
                listeners: {
                    start(event) {
                        onResizeStart(event)
                    },
                    move(event) {
                        let { x, y } = event.target.dataset

                        x = (parseFloat(x) || 0) + event.deltaRect.left
                        y = (parseFloat(y) || 0) + event.deltaRect.top

                        Object.assign(event.target.style, {
                            width: `${event.rect.width}px`,
                            transform: `translateX(${x}px)`
                        })

                        Object.assign(event.target.dataset, { x })

                        onResize(event)
                    },
                    end(event) {
                        onResizeEnd(event)
                    }
                }
            });

        return () => {}
    }, [])

    return (
        <div
            id={clip.id}
            ref={clipRef}
            className="clip"
            style={
                {
                    left: `${clip.start}px`,
                    width: `${clip.end - clip.start}px`,
                    backgroundImage: `url(${clip.src})`
                }
            }
        >
            <div className="handle left" />
            <div className="handle right" />
        </div>
    )
})

export default Clip