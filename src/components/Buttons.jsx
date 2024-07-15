import React, { useEffect, useState } from "react";
import { fetchRelayData, writeRelayData } from "../controller/dbController";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    toast.success(`Relay ${devices[relayId].name} switched ${newRelayState ? "ON" : "OFF"}`);
  };

  return (
    <div className="grid">
      <h1>Control Ur Devices</h1>
      {Object.keys(devices).map((device) => (
        <div className="custom-switch" key={device}>
          <input
            className="custom-switch-input"
            type="checkbox"
            role="switch"
            id={`${device}-switch`}
            checked={devices[device].state}
            onChange={() => handleToggle(device)}
          />
          <label className="custom-switch-label" htmlFor={`${device}-switch`}>
            <span className="custom-switch-text">{devices[device].name || device}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Buttons;
