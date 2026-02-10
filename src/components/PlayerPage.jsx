import { useMemo, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { videos as allVideos } from "../data/videos";

export default function PlayerPage() {
  const [current, setCurrent] = useState(allVideos[0]); // initial video

  const related = useMemo(
    () => allVideos.filter(v => v.category === current.category && v.id !== current.id),
    [current, allVideos]
  );

  const handleSelect = (video) => {
    setCurrent(video); // VideoPlayer will pick up mediaUrl and autoplay
  };

  return (
    <div className="w-full h-full">
      <VideoPlayer
        video={current}
        related={related}
        onSelectRelated={handleSelect}
      />
    </div>
  );
}