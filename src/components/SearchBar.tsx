"use client";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({
  search,
  setSearch,
}: Props) {
  return (
    <div className="max-w-xl mx-auto mb-14">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full bg-white border border-[#e8ddd2] rounded-full px-6 py-4 text-black outline-none focus:border-[#7a4b2a] shadow-md"
      />
    </div>
  );
}