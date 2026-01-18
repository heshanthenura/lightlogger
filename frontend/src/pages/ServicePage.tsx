import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

type NewService = {
  service_name: string;
  service_description: string;
};

type Service = {
  created_at: Date;
  service_description: string;
  service_id: string;
  service_name: string;
};

function ServicePage() {
  const [newService, setNewService] = useState<NewService>({
    service_name: "",
    service_description: "",
  });

  const [services, setServices] = useState<Service[]>([]);

  const addService = async () => {
    if (!newService.service_name.trim()) {
      toast.error("Service name is required", {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/service/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newService),
        },
      );

      if (!response.ok) throw new Error("Failed to add service");

      setNewService({ service_name: "", service_description: "" });
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Error adding service", {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }

    console.log("Adding service:", newService);
    toast.success("Service Added Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    getAllServices();
  };
  const getAllServices = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/service/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch services");
      const data = await response.json();
      console.log(data.services);
      setServices(data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        theme="light"
        transition={Bounce}
        aria-label="Notification"
      />
      <div className="bg-white rounded-lg border border-gray-200 p-6 mt-[10px]">
        <h3 className="text-gray-900 mb-4">Add New Service</h3>
        <div className="space-y-4">
          <div>
            <label className="text-gray-600 block mb-2">Service Name</label>
            <input
              type="text"
              placeholder="e.g., api.gateway"
              value={newService.service_name}
              onChange={(e) =>
                setNewService({ ...newService, service_name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-600 block mb-2">Description</label>
            <textarea
              placeholder="Brief description of what this service does..."
              value={newService.service_description}
              onChange={(e) =>
                setNewService({
                  ...newService,
                  service_description: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
          </div>
        </div>
        <button
          onClick={addService}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={20} />
          Add Service
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-[10px]">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-gray-900">Active Services ({services.length})</h3>
        </div>

        <div className="p-6">
          {services.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No services added yet
            </div>
          ) : (
            <div className="grid gap-4">
              {services.map((service) => (
                <div
                  key={service.service_id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">
                          {service.service_description}
                        </code>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {service.service_description ||
                          "No description provided"}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">URL:</span>
                        <code>/api/v1/log/add/{service.service_id}</code>
                      </div>
                    </div>
                    <button
                      // onClick={() => deleteService(service.id)}
                      className="text-red-600 hover:text-red-700 transition-colors flex-shrink-0"
                      title="Delete service"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServicePage;
