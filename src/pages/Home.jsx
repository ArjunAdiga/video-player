import { useState } from "react";
import { categories } from "../data/videos";
import VideoCard from "../components/VideoCard";
import CategoryFilter from "../components/CategoryFilter";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCategories =
    selectedCategory === "all"
      ? categories
      : categories.filter((cat) => cat.category.slug === selectedCategory);

  return (
    <div className="mx-auto p-3 sm:p-4 max-w-7xl space-y-4">
      <CategoryFilter
        selected={selectedCategory}
        onChange={setSelectedCategory}
        categories={categories.map((c) => c.category)}
      />

      <div className="space-y-8">
        {filteredCategories.map((cat) => (
          <section key={cat.category.slug} className="transition-opacity">
            {/* <h2 className="font-semibold text-base sm:text-lg mb-3 flex items-center gap-2">
              {cat.category.name}
            </h2> */}

            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4">
              {cat.contents.map((video) => (
                <VideoCard
                  key={video.slug}
                  video={video}
                  categoryName={cat.category.name}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
