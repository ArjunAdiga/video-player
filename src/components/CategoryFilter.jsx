

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}) {
  return (
    <div className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-2 rounded-xl shadow-sm">
      <div className="relative d-flex items-center desktop:w-1/3">
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="w-full md:w-72 p-2.5 pr-9 border rounded-lg text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          ▾
        </span>
      </div>
    </div>
  );
}
