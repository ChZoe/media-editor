import './App.css'
import Library from "./Components/Library";
import Timeline from "./Components/Timeline";
import {imgList, trackList} from "./constant.tsx";
import {useImmer} from "use-immer";
import {ClipType, TrackType} from "./type.ts";
import {original} from "immer";

function App() {
    const [tracks, setTracks] = useImmer<TrackType[]>(() => trackList)

    const getMaxLength = (track: TrackType) => {
        let maxLength = 0;
        track.clips.forEach((c)=> {
            if (c.end >= maxLength) {
                maxLength = c.end
            }
        })
        return maxLength;
    }

    const onCreateTrack = (clip: ClipType) => {
        console.log("create", clip);
        const newTrackId = `track-${Date.now()}`

        setTracks((draft) => {
            if (clip.track) {
                const trackIndex = draft.findIndex((t) => t.id === clip.track)
                if (trackIndex === -1) { return }
                const track = draft[trackIndex];

                if (track) {
                    console.log("start", original(track), clip.id)
                    const findIndex = track.clips.findIndex((c) => c.id === clip.id);
                    if (findIndex !== -1) {
                        console.log("findIndex", findIndex);
                        track.clips.splice(findIndex, 1);
                    }

                    if (track.clips.length === 0) {
                        draft.splice(trackIndex, 1);
                    }

                    const maxLength = getMaxLength(track);
                    console.log("maxLength", maxLength);

                    draft.push({
                        id: newTrackId,
                        clips: [{ ...clip, start: maxLength, end: maxLength + 100, track: newTrackId }]
                    })
                }
            } else {
                console.log("create new");
                draft.push({
                    id: newTrackId,
                    clips: [{ ...clip, start: 0, end:  100, track: newTrackId }]
                })
            }

        })
    }

    const onUpdateTrack = (finalTrack: string, clip: ClipType) => {
        console.log("update");

        setTracks((draft)=>{
            const trackIndex = draft.findIndex((t) => t.id === clip.track);
            const track = draft[trackIndex];

            if (track) {
                console.log("has track");
                if (clip.track === finalTrack) {
                    console.log("in track");
                    const clipTarget = track.clips.find((c)=> c.id === clip.id);
                    if (clipTarget) {
                        clipTarget.start = clip.start;
                        clipTarget.end = clip.end;
                    }
                } else {
                    const clipIndex = track.clips.findIndex(c=> c.id === clip.id);
                    console.log("out of track", finalTrack, clipIndex);
                    const targetTrack = draft.find(t=>t.id === finalTrack)
                    if (targetTrack) {
                        const maxLength = getMaxLength(targetTrack);
                        targetTrack.clips.push({ ...clip,start: maxLength, end: maxLength + 100,  track: finalTrack })
                    }

                    if (clipIndex !== -1) {
                        track.clips.splice(clipIndex,1)
                    }

                }

                if (track.clips.length === 0) {
                    draft.splice(trackIndex, 1);
                }

            }

        })

    }

    return (
      <div className="container">
          <Library list={imgList} createEvent={onCreateTrack} tracks={tracks} />
          <Timeline createEvent={onCreateTrack} tracks={tracks} updateEvent={onUpdateTrack} />
      </div>
  )
}

export default App
