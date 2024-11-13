import mongoose, { Document, Model, Schema } from "mongoose";

interface IConatct extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  timestamps: Date;
}

const contactSchema: Schema<IConatct> = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contact: Model<IConatct> =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
