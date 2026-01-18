import { Filter, Radio, RefreshCw, Search } from "lucide-react";
import { useState } from "react";

function LogPage() {
  let [isLive, setIsLive] = useState(false);
  let [isRefreshing, setIsRefreshing] = useState(false);

  const toggleLive = () => {
    setIsLive(!isLive);
  };
  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };
  return (
    <div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search logs by message, source, or details..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={toggleLive}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
              isLive
                ? "bg-green-50 border-green-500 text-green-700 hover:bg-green-100"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Radio size={20} className={isLive ? "animate-pulse" : ""} />
            {isLive ? "Live" : "Paused"}
          </button>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw
              size={20}
              className={isRefreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={20} />
            Filters
          </button>
        </div>

        {/* {selectedLevels.size > 0 && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
            <span className="text-gray-600">Active filters:</span>
            {Array.from(selectedLevels).map((level) => (
              <span
                key={level}
                className={`${logLevelConfig[level].bg} ${logLevelConfig[level].color} px-3 py-1 rounded-full capitalize cursor-pointer hover:opacity-75`}
                onClick={() => toggleLevel(level)}
              >
                {level} ×
              </span>
            ))}
            <button
              onClick={() => setSelectedLevels(new Set())}
              className="text-blue-600 hover:text-blue-700 ml-2"
            >
              Clear all
            </button>
          </div>
        )} */}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-2 text-gray-600 text-sm">
                  Level
                </th>
                <th className="text-left px-4 py-2 text-gray-600 text-sm">
                  Timestamp
                </th>
                <th className="text-left px-4 py-2 text-gray-600 text-sm">
                  Source
                </th>
                <th className="text-left px-4 py-2 text-gray-600 text-sm">
                  Message
                </th>
                <th className="text-left px-4 py-2 text-gray-600 text-sm">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200"></tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          {isLive && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
              Live updates active
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LogPage;
