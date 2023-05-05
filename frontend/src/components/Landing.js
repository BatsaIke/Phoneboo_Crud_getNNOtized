import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Landing.css";
import PhoneBook from "./PhoneBook";
import { FaAddressBook, FaSearch } from "react-icons/fa";

const Landing = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const loadData = async () => {
    const response = await axios.get(
      "http://localhost:5100/api/v1/phonebook/phone"
    );
    setLoading(true);
    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      {loading && <h2> loading...</h2>}
      {!loading && (
        <div>
          <h3>
            <FaAddressBook size={50} /> Phone Book App
          </h3>

          <div className="contact-di">
            <div className="contact-div">
              <span className="contacts-left">
                <h3>Contacts</h3>
              </span>

              <Link className="contacts-right" to="/addPhonebook">
                <button className="btn btn-contact"> + Add Contact</button>
              </Link>
            </div>

            <div className="search-container">
              <FaSearch className={`search-icon ${isFocused ? 'hidden' : ''}`} size={25} />
              <input
                type="text"
                className="search-input"
                placeholder="Search for contact by last name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
            {data
              .filter(
                (data) =>
                  searchTerm === "" ||
                  data.lastName.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item) => (
                <PhoneBook key={item._id} phone={item} loadData={loadData} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
