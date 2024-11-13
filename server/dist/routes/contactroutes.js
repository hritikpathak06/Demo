import express from "express";
import { addContact, deleteContact, getContacts, updateContact, } from "../controller/contactControlller";
const router = express.Router();
router.route("/contact").post(addContact);
router.route("/contact").get(getContacts);
router.route("/contact/:id").put(updateContact);
router.route("/contact/:id").delete(deleteContact);
export default router;
