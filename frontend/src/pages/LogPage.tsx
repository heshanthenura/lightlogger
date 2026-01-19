import {
  AlertCircle,
  AlertTriangle,
  Filter,
  Info,
  Radio,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

type Log = {
  log_id: string;
  service_id: string;
  level: string;
  message: string;
  metadata: string | null;
  created_at: Date;
};

function LogPage() {
  let [isLive, setIsLive] = useState(false);
  let [isRefreshing, setIsRefreshing] = useState(false);

  let [logs, setLogs] = useState<Log[]>([]);
  const logLevelConfig = {
    debug: {
      icon: AlertCircle,
      color: "text-gray-600",
      bg: "bg-gray-50",
      border: "border-gray-200",
    },
    info: {
      icon: Info,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    warn: {
      icon: AlertTriangle,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    error: {
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
    fatal: {
      icon: XCircle,
      color: "text-red-900",
      bg: "bg-red-100",
      border: "border-red-300",
    },
  };
  const toggleLive = () => {
    setIsLive(!isLive);
  };
  const handleRefresh = () => {
    setIsRefreshing(true);

    getLogs(1, 50).then(() => {
      setIsRefreshing(false);
    });
  };

  const getLogs = async (page: number, limit: number) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/log/get?page=${page}&limit=${limit}`,
    );
    const data = await res.json();
    setLogs(data.logs);
  };

  const formatTime = (dateStr: string | Date) => {
    const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (dateStr: string | Date) => {
    const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        getLogs(1, 100);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  useEffect(() => {
    getLogs(1, 100);
  }, []);

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
                  Service
                </th>
                <th className="text-left px-4 py-2 text-gray-600 text-sm">
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {!logs || logs.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No logs found
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  const config =
                    logLevelConfig[log.level as keyof typeof logLevelConfig];
                  const Icon = config?.icon || Info;
                  return (
                    <tr
                      key={log.log_id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-2">
                        <div
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${config.bg} ${config.color} text-xs`}
                        >
                          <Icon size={12} />
                          <span className="capitalize">{log.level}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <div className="text-gray-900">
                          {formatTime(log.created_at)}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {formatDate(log.created_at)}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {log.service_id}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600 max-w-xs truncate">
                        {log.message}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LogPage;
