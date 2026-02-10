import { useNavigate } from "react-router-dom";
import thumbnail from "../assets/images.jpg"



export default function VideoCard({ video, categoryName }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/watch/${video.slug}`)}
      className="group cursor-pointer rounded-xl overflow-hidden bg-white border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="relative bg-gray-100">
        <img
          src={video.thumbnailUrl || thumbnail}
          alt={video.title}
          className=" w-full object-cover"
        />
      </div>

      <div className="p-3">
        <p className="text-sm font-medium text-gray-900 line-clamp-2">
          {video.title}
        </p>

        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
          <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
            {categoryName}
          </span>
        </div>
      </div>
    </div>
  );
}
