import React from "react";

interface SummaryDisplayProps {
  abstractiveSummary: string;
  extractiveSummary: string;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({
  abstractiveSummary,
  extractiveSummary,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between p-4  ">
      <div className="flex-1 p-4 m-2 bg-gradient-to-r from-[#4d7eb5] to-[#2C5E94] text-white rounded-md shadow">
        <h2 className="text-lg font-bold">Abstractive Summary</h2>
        <p>{abstractiveSummary}</p>
      </div>
      <div className="flex-1 p-4 m-2 bg-gradient-to-r from-[#4d7eb5] to-[#2C5E94] text-white rounded-md shadow">
        <h2 className="text-lg font-bold">Extractive Summary</h2>
        <p>{extractiveSummary}</p>
      </div>
    </div>
  );
};

export default SummaryDisplay;
