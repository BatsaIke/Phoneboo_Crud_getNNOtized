const { validationResult } = require("express-validator");
const PhoneBook = require("../model/Phonebook");

//@rout GET api/v1/phonebook
//@desc get all phonebooks
//access public
const getPhoneBook = async (req, res) => {
  try {
    const phoneBook = await PhoneBook.find();
    res.json(phoneBook);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("server error");
  }
};

//@rout GET api/v1/phonebook/
//@desc get a phonebook
//access public
const getAContact = async (req, res, next) => {
  const { id: phoneID } = req.params
  const phone = await PhoneBook.findOne({ _id: phoneID })
  if (!phone) {
    return res.status(500).send(`Error not Phonebook with id:${phoneID} exists`)
  }

  res.status(200).json({ phone })  
}

//@rout Post api/v1/phonebook
//@desc create a phonebook
//access public
const createPhoneBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstName, lastName, phoneNumber } = req.body;
  try {
    let user = await PhoneBook.findOne({ phoneNumber });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exist" }] });
    }

    user = new PhoneBook({
      firstName,
      lastName,
      phoneNumber,
    });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("server error");
  }
};

//@rout PUT api/v1/phonebook
//@desc edit phonebook
//access public
const updatePhoneBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id: phoneID } = req.params
    try {
        const phonebook = await PhoneBook.findOneAndUpdate({ _id: phoneID }, req.body, {
            new: true,
          })
          if (!phonebook) {
            return res.status(500).send(`Error not Phonebook with id:${phoneID} exists`)
          }
        res.status(200).send('Phone book entry updated successfully');
    } catch (error) {
        res.status(500).send('Error updating phone book entry'); 
    }
}

const deletePhoneBook = async (req, res) => {
    const { id: phoneID } = req.params
  
  try {
    const phonebook = await PhoneBook.findOneAndDelete({ _id: phoneID })
    if(!phonebook){
        if (!phonebook) {
            return res.status(500).send(`Error no Phonebook with id:${phoneID} exists`)
          }
    }
  } catch (error) {
    console.log(error)
  }
    }


module.exports = { getPhoneBook, createPhoneBook, updatePhoneBook, deletePhoneBook,getAContact };
