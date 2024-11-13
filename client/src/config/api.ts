import axios from "axios";

// export const BASE_URL = "http://localhost:8000";
export const BASE_URL = "https://erino-assignment.onrender.com";

export const getContacts = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/contact`);
    return data.contacts;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

