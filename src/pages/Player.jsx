import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import { categories } from "../data/videos";

export default function Player() {
  const { videoId } = useParams();

  const video = categories
    .flatMap((cat) => cat.contents)
    .find((v) => v.slug === videoId);

  if (!video) return <div>Video not found</div>;

  return <VideoPlayer video={video} />;
}
