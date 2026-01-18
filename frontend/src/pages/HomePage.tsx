import { LogOut } from "lucide-react";
import React, { useState } from "react";
import ServicePage from "./ServicePage";

function HomePage() {
  var [tab, setTab] = useState("services");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">Log Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Monitor and analyze system logs in real-time
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-gray-600">Welcome back,</p>
                <p className="text-gray-900">Admin</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-gray-100 rounded-full p-1 w-fit">
          <div className="flex gap-1 p-1 rounded-full">
            <button
              onClick={() => setTab("logs")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                tab === "logs"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Logs
            </button>
            <button
              onClick={() => setTab("services")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                tab === "services"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Services
            </button>
          </div>
        </div>

        {tab === "logs" ? <>sadas</> : <ServicePage />}
      </div>
    </div>
  );
}

export default HomePage;
