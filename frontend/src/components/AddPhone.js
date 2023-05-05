import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AddPhone.css";
import { Toast, toast } from "react-toastify";
import axios from "axios";

const AddPhone = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const { firstName, lastName, phoneNumber } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const { id } = useParams();
 

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5100/api/v1/phonebook/phone/${id}`)
        .then((res) => {
          setFormData({ ...res.data.phone });
        });
    }
    setIsLoading(false);
  }, [id]);

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !phoneNumber) {
      toast.error("Please provide value for all the field");
    } else if (!id) {
      try {
    let res=   await axios
        .post("http://localhost:5100/api/v1/phonebook/create-phonebook", {
          firstName,
          lastName,
          phoneNumber,
        })
        if(res.status===200)
        setFormData({ firstName: "", lastName: "", phoneNumber: "" });
        toast.success("Contact Added Succesfully");
        setTimeout(() => navigate("/"), 500);
      } catch (error) {
        if (error.response) {
          const errors = error.response.data.errors;
          const uniqueErrors = new Set();
          errors.forEach((error) => {
            uniqueErrors.add(error.msg || "An error occurred");
          });
          uniqueErrors.forEach((errorMsg) => {
            toast.error(errorMsg);
          });
        }
      } 
    } else {
      try {
    let res=  await  axios
        .put(`http://localhost:5100/api/v1/phonebook/edit/${id}`, formData)
        if(res.status===200)
        setFormData({ firstName: "", lastName: "", phoneNumber: "" });
        toast.success("Contact Updated Succesfully");
        setTimeout(() => navigate("/"), 500);
      } catch (error) {
        if (error.response) {
          const errors = error.response.data.errors;
          const uniqueErrors = new Set();
          errors.forEach((error) => {
            uniqueErrors.add(error.msg || "An error occurred");
          });
          uniqueErrors.forEach((errorMsg) => {
            toast.error(errorMsg);
          });
        }
      } 
      
    }
    
  };

  return (
    <div style={{ marginTop: "100px" }}>
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <h3>{id ? "Update contact" : "Add a contact"}</h3>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={firstName || ""}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={lastName || ""}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Phone Nummber"
              name="phoneNumber"
              value={phoneNumber || ""}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type="submit" value={id ? "Update" : "Save"} />
          <Link to="/">
            <input type="button" value="Go Back" />
          </Link>
        </form>
      )}
    </div>
  );
};

export default AddPhone;
