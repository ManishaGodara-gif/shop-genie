/*import Contact from "../models/contactModel.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.json({ success: false, message: "All fields are required." });
    }

    await Contact.create({ name, email, subject, message });
    res.json({ success: true, message: "Message received! We'll get back to you soon." });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Something went wrong. Please try again." });
  }
};*/
import Contact from "../models/contactModel.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message)
      return res.json({ success: false, message: "All fields are required." });
    await Contact.create({ name, email, subject, message });
    res.json({ success: true, message: "Message received! We'll get back to you soon." });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Something went wrong. Please try again." });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch messages." });
  }
};