import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import { categories } from "../data/videos";

export default function Player() {
  const { videoId } = useParams();

  // Normalize videos and tag each with its parent category key for reliable filtering
  const allVideos = useMemo(() => {
    return categories.flatMap((cat) =>
      (cat.contents || []).map((v) => ({
        ...v,
        __cat: cat.slug || cat.title || cat.name || cat.id || cat.category || "uncategorized",
      }))
    );
  }, []);

  const initial = useMemo(() => allVideos.find((v) => v.slug === videoId), [allVideos, videoId]);

  const [current, setCurrent] = useState(initial);

  const related = useMemo(() => {
    if (!current) return [];
    return allVideos.filter((v) => v.__cat === current.__cat && v.slug !== current.slug);
  }, [allVideos, current]);

  if (!initial) return <div>Video not found</div>;



  const onSelectRelated = (v) => {
    setCurrent(v);
    // Optionally reset scroll/progress via route or state if needed
  };

  return (
    <VideoPlayer
      video={current}
      related={related}
      onSelectRelated={onSelectRelated}
    />
  );
}