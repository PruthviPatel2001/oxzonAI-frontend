import React from "react";

interface SearchResultProps {
  result: {
    total_occurrences: number;
    occurrences_by_page: {
      page: number;
      count: number;
      positions: [number, number, number, number][];
    }[];
    highlighted_file: string;
  };
}

const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
  return (
    <div className=" text-white rounded-lg mb-4">
      <p className="font-semibold text-lg">
        Total Occurrences: {result.total_occurrences}
      </p>
      <div className="overflow-y-auto max-h-40">
        {result.occurrences_by_page.map((occurrence, index) => (
          <div key={index} className="text-sm ">
            <p>
              Page {occurrence.page}: {occurrence.count} occurrences
            </p>
          </div>
        ))}
      </div>
      <a
        href={`/api/download?filename=${result.highlighted_file}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white mt-4"
      >
        Download highlighted PDF
      </a>
    </div>
  );
};

export default SearchResult;
