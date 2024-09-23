import React, { useEffect, useState } from "react";
import { fetchRelayData, writeFormData } from "../controller/dbController";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Forms = ({ onSubmit }) => {
  const [relays, setRelays] = useState([]);  // List of available relays
  const [selectedRelay, setSelectedRelay] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [relayDeviceMapping, setRelayDeviceMapping] = useState({}); // Mapping of relays to devices

  const deviceOptions = ["LIGHT", "FAN", "AC", "NO DEVICE"];

  useEffect(() => {
    // Fetch relays data from your controller
    fetchRelayData((data) => {
      if (data) {
        const relayKeys = Object.keys(data);
        setRelays(relayKeys);
        setRelayDeviceMapping(data); // Initialize with fetched data
      }
    });
  }, []);

  useEffect(() => {
    // Set device based on existing mapping when relay changes
    setSelectedDevice(relayDeviceMapping[selectedRelay] || "");
  }, [selectedRelay, relayDeviceMapping]);

  const handleRelayChange = (e) => {
    setSelectedRelay(e.target.value);
  };

  const handleDeviceChange = (e) => {
    setSelectedDevice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRelay || !selectedDevice) {
      toast.error("Please select both relay and device.");
      return;
    }
    try {
      const newMapping = { ...relayDeviceMapping, [selectedRelay]: selectedDevice };
      setRelayDeviceMapping(newMapping);
      writeFormData(selectedRelay, selectedDevice);
      onSubmit(newMapping);
      toast.success("Devices Data Updated");
    } catch (error) {
      toast.error("Error updating devices data");
      console.error("Error updating devices data", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-xl">
        <h2 className="text-sky-400 sm:text-3xl">Welcome User</h2>
        <Link
          to={"/"}
          className="text-blue-500 hover:text-blue-700 sm:text-3xl underline hover:underline-offset-4 flex items-center"
        >
          HOME
        </Link>
      </div>
      <div className="flex flex-col items-center m-4 p-4">
        <h1 className="text-center mt-4 text-5xl font-semibold pb-5">
          Configure Your Devices
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 p-6 bg-blue-400 rounded-3xl">
            <div className="flex flex-col justify-center items-center p-4 border rounded-2xl shadow-xl bg-blue-700">
              <label
                htmlFor="relaySelect"
                className="block mb-2 text-sm font-medium text-white"
              >
                Select Relay:
              </label>
              <select
                id="relaySelect"
                value={selectedRelay}
                onChange={handleRelayChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select a relay</option>
                {relays.map((relay, idx) => (
                  <option key={idx} value={relay}>
                    {relay}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col justify-center items-center p-4 border rounded-2xl shadow-xl bg-blue-700">
              <label
                htmlFor="deviceSelect"
                className="block mb-2 text-sm font-medium text-white"
              >
                Select Device:
              </label>
              <select
                id="deviceSelect"
                value={selectedDevice}
                onChange={handleDeviceChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select a device</option>
                {deviceOptions.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1 flex justify-center">
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Submit
              </button>
            </div>
          </div>
        </form>

        {/* Display current relay-device mappings */}
        <div className="mt-6 p-4 bg-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Current Device Mappings:</h2>
          <ul>
            {Object.entries(relayDeviceMapping).map(([relay, device], idx) => (
              <li key={idx} className="py-1">
                <strong className="mr-2">{relay}:</strong>
                {typeof device === 'string' ? device : JSON.stringify(device.name) || "No device assigned"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Forms;
