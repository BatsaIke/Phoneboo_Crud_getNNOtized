const express = require("express");
const router = express.Router();


const { check} = require("express-validator");
const {createPhoneBook, getPhoneBook, updatePhoneBook, deletePhoneBook, getAContact} = require('../controller/PhoneBookController')

//create phonebook
router
  .route("/create-phonebook")
  .post( [
    check("firstName", "First Name is required").not().isEmpty(),
    check("lastName", "Last Name is required").not().isEmpty(),
    check("phoneNumber", "Enter a valid Phone number").isMobilePhone().isLength({ min: 10 }),
  ],createPhoneBook)

  //gets all phonebooks
router.route("/phone").get(getPhoneBook);

 //gets a phonebook
 router.route("/phone/:id").get(getAContact);


//edit phonebook
router
  .route("/edit/:id")
  .put(
    
      [
        check("firstName", "First name is required").not().isEmpty(),
        check("lastName", "Last Name is required").not().isEmpty(),
        check("phoneNumber", "is required is required").not().isEmpty(),
      ],
    
    updatePhoneBook
  )
//delete a phonebook record
  router.route('/delete/:id').delete(deletePhoneBook);

  
module.exports= router