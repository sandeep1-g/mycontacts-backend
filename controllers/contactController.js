const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");


//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req,res)=>{
    const contacts = await  Contact.find({user_id : req.user.id});
    res.status(200).json(contacts);
    });

//@desc create new contacts
//@route POST /api/contacts/:id
//@access private

const createContact = asyncHandler(async(req,res)=>{
    console.log(`request body is :`, req.body);
    const {name, email, phone}=req.body;
    if(!name || !email || !phone)
    {
        res.status(400);
         throw new Error("All fields are necessary");
    }
    const contact = await Contact.create({
        user_id: req.user.id,
        name : name,
        email : email,
        phone : phone,
    });
    res.status(201).json(contact)
    });

//@desc Get contact
//@route GET /api/contacts/:id
//@access private

const getContact= asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(202).json(contact);
    });

//@desc update  contacts
//@route PUT /api/contacts
//@access private

const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("user dont have permission to update other contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    )
    res.status(203).json(updateContact);
    });

//@desc delete contacts
//@route delete /api/contacts
//@access private

const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("user dont have permission to update other contact");
    }
   await Contact.deleteOne({ _id: req.params.id });;
    res.status(204).json(contact);
    });


module.exports = {getContacts, 
    createContact, 
    getContact, 
    updateContact, 
    deleteContact,
};