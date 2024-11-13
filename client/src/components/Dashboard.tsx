import { Box, Button, FormLabel, Grid2, Input } from "@mui/material";
import Table from "./Table";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { BASE_URL, getContacts } from "../config/api";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    title: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [contacts, setContacts] = useState<any[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/api/contact`, formData);
      toast.success(data.msg);
      setContacts([data.newContact, ...contacts]);
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    (async () => {
      const data = await getContacts();
      setContacts(data);
    })();
  }, []);

  return (
    <>
      {isModalOpen && (
        <Modal
          title="Add Contact"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <form
            onSubmit={handleSubmit}
            action=""
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-evenly"
              style={{
                gap: "1rem",
              }}
            >
              <Grid2
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <FormLabel
                  style={{ fontWeight: "bold", color: "#333" }}
                  required
                >
                  First Name
                </FormLabel>
                <Input
                  placeholder="Enter the First Name"
                  disableUnderline
                  name="firstName"
                  onChange={handleChange}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "5px",
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    width: "100%",
                    marginTop: "0.3rem",
                  }}
                />
              </Grid2>

              <Grid2
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <FormLabel
                  style={{ fontWeight: "bold", color: "#333" }}
                  required
                >
                  Last Name
                </FormLabel>
                <Input
                  placeholder="Enter the Last Name"
                  disableUnderline
                  name="lastName"
                  onChange={handleChange}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "5px",
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    width: "100%",
                    marginTop: "0.3rem",
                  }}
                />
              </Grid2>
            </Box>

            <Box
              //   container
              display="flex"
              alignItems="center"
              justifyContent="space-evenly"
              style={{
                gap: "1rem",
              }}
            >
              <Grid2
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <FormLabel
                  style={{ fontWeight: "bold", color: "#333" }}
                  required
                >
                  Email
                </FormLabel>
                <Input
                  placeholder="Enter the Email"
                  type="email"
                  disableUnderline
                  name="email"
                  onChange={handleChange}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "5px",
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    width: "100%",
                    marginTop: "0.3rem",
                  }}
                />
              </Grid2>

              <Grid2
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <FormLabel
                  style={{ fontWeight: "bold", color: "#333" }}
                  required
                >
                  Mobile No.
                </FormLabel>
                <Input
                  placeholder="Enter Your Mobile No"
                  disableUnderline
                  name="phone"
                  onChange={handleChange}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "5px",
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    width: "100%",
                    marginTop: "0.3rem",
                  }}
                />
              </Grid2>
            </Box>

            <Box
              //   container
              display="flex"
              alignItems="center"
              justifyContent="space-evenly"
              style={{
                gap: "1rem",
              }}
            >
              <Grid2
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <FormLabel
                  style={{ fontWeight: "bold", color: "#333" }}
                  required
                >
                  Company Name
                </FormLabel>
                <Input
                  placeholder="Enter the company Name"
                  disableUnderline
                  name="company"
                  onChange={handleChange}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "5px",
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    width: "100%",
                    marginTop: "0.3rem",
                  }}
                />
              </Grid2>

              <Grid2
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <FormLabel
                  style={{ fontWeight: "bold", color: "#333" }}
                  required
                >
                  Job Title
                </FormLabel>
                <Input
                  placeholder="Enter the Job Title"
                  name="title"
                  onChange={handleChange}
                  disableUnderline
                  style={{
                    padding: "0.5rem",
                    borderRadius: "5px",
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    width: "100%",
                    marginTop: "0.3rem",
                  }}
                />
              </Grid2>
            </Box>

            <Grid2
              component="div"
              container
              justifyContent="center"
              style={{ marginTop: "2rem" }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{
                  padding: "0.6rem 2rem",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  borderRadius: "5px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                }}
                className="btn"
              >
                Submit
              </Button>
            </Grid2>
          </form>
        </Modal>
      )}
      <Grid2
        height={"100%"}
        width={["100%", "90%"]}
        padding={["10px", "20px"]}
        margin={"auto"}
      >
        <Grid2
          height={"10vh"}
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          borderBottom={"2px solid white"}
        >
          <h1 className="heading">Contact Details</h1>
          <Button variant="contained" onClick={() => setIsModalOpen(true)}>
            Add Contact
          </Button>
        </Grid2>

        <Grid2 height={"85vh"}>
          <Table contacts={contacts} setContacts={setContacts} />
        </Grid2>
      </Grid2>
    </>
  );
};

export default Dashboard;
