import axios from "axios";
import React from "react";
import {  FaEdit, FaPhone, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";



const PhoneBook = ({ phone,loadData}) => {
  const { _id, firstName, lastName, phoneNumber } = phone;
 

const deleteContact=(id)=>{
  
  if(window.confirm("Are you sure that you want to delete this contact? Action cannot be reversed")){
    axios.delete(`http://localhost:5100/api/v1/phonebook/delete/${id}`)
    toast.success("Contact Deleted Successfully")
    setTimeout(()=>loadData(),500)
  }
}

  return (
    <div className="phoneBook-div">
    <div className="phoneBook">
      <div className="names-div" key={_id}>
        <div className="firstName">{firstName}</div>
        <div className="lastName">{lastName}</div>

        
      </div>
      <div className="phoneNumber"><FaPhone size={30}  /> {" "}{phoneNumber}</div>
      
      
    </div>
    <div className="action-div">
      <Link to={`/edit/${_id}`}>
    <button className="btn btn-edit"><FaEdit size={30}/></button>
    </Link>
    <button className="btn btn-delete" onClick={()=>deleteContact(_id)}><FaTrash size={30}/></button>
    </div>
    </div>
  );
};

export default PhoneBook;
