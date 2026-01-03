// app/news-events/components/CategoryFilter.tsx
import React from "react";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", name: "All" },
  { id: "art", name: "Art" },
  { id: "design", name: "Design" },
  { id: "business", name: "Business" },
  { id: "general", name: "General" }
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <span className="text-sm font-medium text-gray-700">Filter by:</span>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? "bg-yellow-400 text-black font-medium"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;