import React, { useEffect, useState } from "react";
import { fetchRelayData, writeRelayData } from "../controller/dbController";
import { DateTime } from "./DateTime";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FaRegLightbulb, FaLightbulb } from "react-icons/fa";
import { TbAirConditioning, TbAirConditioningDisabled } from "react-icons/tb";
import { PiFanLight, PiFanFill } from "react-icons/pi";
import { CiSquarePlus } from "react-icons/ci";

const Buttons = () => {
  const [devices, setDevices] = useState({
    device1: { name: "", state: false },
    device2: { name: "", state: false },
    device3: { name: "", state: false },
    device4: { name: "", state: false },
  });

  useEffect(() => {
    const unsubscribe = fetchRelayData((data) => {
      if (data) {
        setDevices({
          device1: data.device1,
          device2: data.device2,
          device3: data.device3,
          device4: data.device4,
        });
      } else {
        setDevices({
          device1: { name: "", state: false },
          device2: { name: "", state: false },
          device3: { name: "", state: false },
          device4: { name: "", state: false },
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleToggle = (relayId) => {
    const currentDeviceState = devices[relayId].state;
    const newRelayState = !currentDeviceState;
    setDevices((prevDevices) => ({
      ...prevDevices,
      [relayId]: { ...prevDevices[relayId], state: newRelayState },
    }));
    writeRelayData(relayId, newRelayState);
    toast.success(
      `${devices[relayId].name} switched ${newRelayState ? "ON" : "OFF"}`
    );
  };

  const renderIcon = (deviceName, deviceState) => {
    const iconSize = 38;

    switch (deviceName) {
      case "LIGHT":
        return deviceState ? (
          <FaLightbulb className="text-yellow-500 mr-2" size={iconSize} />
        ) : (
          <FaRegLightbulb className="text-gray-500 mr-2" size={iconSize} />
        );
      case "FAN":
        return deviceState ? (
          <PiFanFill className="text-green-500 mr-2" size={iconSize} />
        ) : (
          <PiFanLight className="text-gray-500 mr-2" size={iconSize} />
        );
      case "AC":
        return deviceState ? (
          <TbAirConditioning className="text-blue-400 mr-2" size={iconSize} />
        ) : (
          <TbAirConditioningDisabled
            className="text-gray-500 mr-2"
            size={iconSize}
          />
        );
      default:
        return null;
    }
  };
  return (
    <>
      {" "}
      <div className="bg-blue-100 font-mono min-h-screen">
        <div className="flex justify-between items-center p-4 bg-gray-100 rounded-xl">
          <h2 className="text-sky-400 sm:text-3xl">Welcome User</h2>
          <Link
            to={"/form"}
            className="text-blue-500 hover:text-blue-700  sm:text-3xl underline hover:underline-offset-4 flex items-center"
          >
            <CiSquarePlus className="mr-2" />
            Add Device
          </Link>
        </div>
        <h1 className="text-center mt-4 text-5xl font-semibold">Widgets</h1>
        <div className="date m-3 text-2xl font-medium">
          <DateTime />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-blue-400 rounded-3xl">
          {Object.keys(devices).map((device) => (
            <div
              key={device}
              className="flex flex-col sm:flex-row justify-center items-center p-10 border rounded-2xl shadow-xl bg-blue-700"
            >
              <label className="flex cursor-pointer select-none items-center">
                {renderIcon(devices[device].name, devices[device].state)}
                <div className="relative ml-4">
                  <input
                    type="checkbox"
                    checked={devices[device].state}
                    onChange={() => handleToggle(device)}
                    className="sr-only"
                  />
                  <div
                    className={`block h-12 w-24 rounded-full shadow-xl ${
                      devices[device].state ? "bg-green-500" : "bg-yellow-300"
                    }`}
                  ></div>
                  <div
                    className={`dot absolute left-1 top-1 h-10 w-10 rounded-full bg-white transition transform ${
                      devices[device].state ? "translate-x-12" : ""
                    }`}
                  ></div>
                </div>
                <span className="ml-3 text-white font-semibold text-2xl">
                  {devices[device].name || device}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Buttons;
