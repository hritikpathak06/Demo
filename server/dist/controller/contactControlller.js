import { ZodError } from "zod";
import Contact from "../model/contactModal";
import { contactZodSchema, updateContactZodSchema, } from "../validation/validation";
export const addContact = async (req, res) => {
    try {
        const parsedData = contactZodSchema.parse(req.body);
        const { firstName, lastName, email, company, phone, title } = parsedData;
        const isAlreadyUser = await Contact.findOne({ email });
        if (isAlreadyUser) {
            return res.status(400).json({
                msg: "Email is already registered",
            });
        }
        const newContact = new Contact({
            firstName,
            lastName,
            email,
            phone,
            company,
            title,
        });
        await newContact.save();
        return res.status(201).json({
            msg: "New Contact Added",
            newContact,
        });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.errors[0].message;
            return res.status(400).json({
                success: false,
                msg: errorMessages,
            });
        }
        return res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({}).sort({ createdAt: -1 });
        return res.status(200).json({
            contacts,
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};
export const updateContact = async (req, res) => {
    try {
        const parsedData = updateContactZodSchema.parse(req.body);
        const { firstName, lastName, email, phone, company, title } = parsedData;
        const { id } = req.params;
        const contact = await Contact.findByIdAndUpdate(id, { firstName, lastName, email, phone, company, title }, { new: true });
        console.log("Contact==>> ", contact);
        return res.status(200).json({
            msg: "Contact Updated Successfully",
            contact,
        });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.errors[0].message;
            return res.status(400).json({
                success: false,
                msg: errorMessages,
            });
        }
        return res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};
export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        return res.status(200).json({
            msg: "Contact Deleted Successfully",
            contact,
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};
