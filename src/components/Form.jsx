import React, { useState } from "react";
import { writeFormData } from "../controller/dbController";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Forms = ({ onSubmit }) => {
  const [values, setValues] = useState({
    device1: "",
    device2: "",
    device3: "",
    device4: "",
  });

  const handleChange = (e, device) => {
    setValues({ ...values, [device]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (let device in values) {
        writeFormData(device, values[device]);
      }

      onSubmit(values);
      toast.success("Devices Data Updated");
    } catch (error) {
      toast.error("Error updating devices data");
      console.error("Error updating devices data", error);
    }
  };

  const deviceOptions = ["LIGHT", "FAN", "AC", "NO DEVICE"];

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-xl">
        <h2 className="text-sky-400 sm:text-3xl">Welcome User</h2>
        <Link
          to={"/"}
          className="text-blue-500 hover:text-blue-700  sm:text-3xl underline hover:underline-offset-4 flex items-center"
        >
          HOME
        </Link>
      </div>
      <div className="flex flex-col items-center m-4 p-4">
        <h1 className="text-center mt-4 text-5xl font-semibold pb-5">
          Select the devices you want to control
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 p-6 bg-blue-400 rounded-3xl">
            {Object.keys(values).map((device, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center p-4 border rounded-2xl shadow-xl bg-blue-700"
              >
                <label
                  htmlFor={device}
                  className="block mb-2 text-sm font-medium text-white"
                >
                  {device.charAt(0).toUpperCase() +
                    device.slice(1).toLowerCase()}
                  :
                </label>
                <select
                  id={device}
                  value={values[device]}
                  onChange={(e) => handleChange(e, device)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Open this select menu</option>
                  {deviceOptions.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div className="col-span-2 flex justify-center">
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        <Link to={"/"} className="mt-4">
          Home
        </Link>
      </div>
    </>
  );
};

export default Forms;
