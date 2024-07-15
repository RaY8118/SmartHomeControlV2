import React, { useState } from "react";
import { writeFormData } from "../controller/dbController";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forms = ({ onSubmit }) => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");

  const handle1Change = (e) => {
    setValue1(e.target.value);
  };
  const handle2Change = (e) => {
    setValue2(e.target.value);
  };
  const handle3Change = (e) => {
    setValue3(e.target.value);
  };
  const handle4Change = (e) => {
    setValue4(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      device1: value1,
      device2: value2,
      device3: value3,
      device4: value4,
    };

    try {
      await writeFormData("device1", value1);
      await writeFormData("device2", value2);
      await writeFormData("device3", value3);
      await writeFormData("device4", value4);

      onSubmit(formData);
      toast.success("Devices Data Updated");
    } catch (error) {
      toast.error("Error updating devices data");
      console.error("Error updating devices data", error);
    }
  };

  return (
    <div className="container">
      <h1 style={{ paddingTop: "15px" }}>
        Select the devices you want to control
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label
            htmlFor="device1"
            style={{ color: "black", fontWeight: "bold" }}
          >
            Device 1:
          </label>
          <select
            id="device1"            
            value={value1}
            onChange={handle1Change}
          >
            <option value="">Open this select menu</option>
            <option value="LIGHT">Light</option>
            <option value="FAN">Fan</option>
            <option value="AC">AC</option>
          </select>
        </div>
        <div className="form-group">
          <label
            htmlFor="device2"
            style={{ color: "black", fontWeight: "bold" }}
          >
            Device 2:
          </label>
          <select
            id="device2"      
            
            value={value2}
            onChange={handle2Change}
          >
            <option value="">Open this select menu</option>
            <option value="LIGHT">Light</option>
            <option value="FAN">Fan</option>
            <option value="AC">AC</option>
          </select>
        </div>
        <div className="form-group">
          <label
            htmlFor="device3"
            style={{ color: "black", fontWeight: "bold" }}
          >
            Device 3:
          </label>
          <select
            id="device3"            
            
            value={value3}
            onChange={handle3Change}
          >
            <option value="">Open this select menu</option>
            <option value="LIGHT">Light</option>
            <option value="FAN">Fan</option>
            <option value="AC">AC</option>
          </select>
        </div>
        <div className="form-group">
          <label
            htmlFor="device4"
            style={{ color: "black", fontWeight: "bold" }}
          >
            Device 4:
          </label>
          <select
            id="device4"            
            
            value={value4}
            onChange={handle4Change}
          >
            <option value="">Open this select menu</option>
            <option value="LIGHT">Light</option>
            <option value="FAN">Fan</option>
            <option value="AC">AC</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Forms;
