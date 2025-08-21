import { useEffect, useState } from "react";
import { getAgents } from "./services/agentServices";

export const ListingAgents = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    getAgents().then(setAgents);
  }, []);

  return (
    <section className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold text-slate-800 text-center sm:text-center">
          Listing Agents
        </h1>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden "
          >
            <div className="flex flex-col sm:flex-row">
              <div className="flex-shrink-0">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-64 sm:w-48 sm:h-48 lg:w-56 lg:h-56 object-cover"
                />
              </div>

              <div className="flex-1 p-6 sm:p-8 flex flex-col space-y-3 sm:space-y-4">
                <h2 className="text-xl sm:text-2xl font-serif font-medium text-gray-900">
                  {agent.name}
                </h2>

                <div className="space-y-2 sm:space-y-3">
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex items-center text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    <span className="text-gray-500 mr-3">📞</span>
                    {agent.phone}
                  </a>

                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 break-all sm:break-normal"
                  >
                    <span className="text-gray-500 mr-3">✉️</span>
                    {agent.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
