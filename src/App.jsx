import { useState } from "react";
import Buttons from "./components/Buttons";
import Forms from "./components/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const handleFormSubmit = (formData) => {
    console.log("Form data submitted:", formData);
    toast.success("Form data submitted successfully!");
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <Router>
        <Routes>
          <Route path="/" element={<Buttons />} />
          <Route
            path="/form"
            element={<Forms />}
            onSubmit={handleFormSubmit}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
