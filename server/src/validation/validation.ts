import { z } from "zod";
const contactZodSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().email("Invalid email format"),
  phone: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  company: z.string().nonempty("Company is required"),
  title: z.string().nonempty("Title is required"),
});

const updateContactZodSchema = contactZodSchema.partial();

export { contactZodSchema, updateContactZodSchema };
