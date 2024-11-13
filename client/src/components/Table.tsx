import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button, FormLabel, Grid2, Input } from "@mui/material";
import { FiDelete, FiEdit } from "react-icons/fi";
import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { BASE_URL } from "../config/api";
import toast from "react-hot-toast";

export default function Table({ contacts, setContacts }: any) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    title: "",
  });

  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "Id",
      width: 70,
    },
    { field: "firstName", headerName: "First name", width: 180 },
    { field: "lastName", headerName: "Last name", width: 180 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phone", headerName: "Contact Number", width: 180 },
    { field: "company", headerName: "Company Name", width: 180 },
    { field: "title", headerName: "Job Title", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(params.row)}
            style={{ marginRight: "8px" }}
          >
            <FiEdit />
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={(e) => handleDelete(e, params.row._id)}
          >
            <FiDelete />
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (data: any) => {
    setSelectedContactId(data._id);

    setFormData({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phone: data.phone || "",
      company: data.company || "",
      title: data.title || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (e: any, id: any) => {
    console.log("Deleting row with id:", id);
    e.preventDefault();
    try {
      const { data } = await axios.delete(`${BASE_URL}/api/contact/${id}`);
      toast.success(data.msg);
      setContacts((prevContacts: any[]) =>
        prevContacts.filter((contact) => contact._id !== id)
      );
    } catch (error: any) {
      toast.error(error.resposne.data.msg);
    }
  };

  const paginationModel = { page: 0, pageSize: 10 };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/contact/${selectedContactId}`,
        formData
      );
      // console.log("data", data);
      toast.success(data.msg);
      setContacts((prevContacts: any[]) => {
        return prevContacts.map((contact) =>
          contact._id === selectedContactId
            ? { ...contact, ...formData }
            : contact
        );
      });
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <>
      <Paper
        sx={{
          height: "100%",
          width: "100%",
          boxShadow:
            "inset 0px 5px 3px rgba(0, 0, 0, 0.2), 4px 8px 3px rgba(0, 0, 0, 0.1), -8px -8px 15px rgba(255, 255, 255, 0.7)",
        }}
      >
        <DataGrid
          rows={contacts}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0, width: "100%" }}
          getRowId={(row) => row._id}
        />
      </Paper>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Contact Profile"
      >
        <form
          onSubmit={handleSubmit}
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
              <FormLabel style={{ fontWeight: "bold", color: "#333" }} required>
                First Name
              </FormLabel>
              <Input
                placeholder="Enter the First Name"
                disableUnderline
                name="firstName"
                value={formData.firstName}
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
              <FormLabel style={{ fontWeight: "bold", color: "#333" }} required>
                Last Name
              </FormLabel>
              <Input
                placeholder="Enter the Last Name"
                disableUnderline
                name="lastName"
                value={formData.lastName}
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
              <FormLabel style={{ fontWeight: "bold", color: "#333" }} required>
                Email
              </FormLabel>
              <Input
                placeholder="Enter the Email"
                type="email"
                disableUnderline
                name="email"
                value={formData.email}
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
              <FormLabel style={{ fontWeight: "bold", color: "#333" }} required>
                Mobile No.
              </FormLabel>
              <Input
                placeholder="Enter Your Mobile No"
                disableUnderline
                name="phone"
                value={formData.phone}
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
              <FormLabel style={{ fontWeight: "bold", color: "#333" }} required>
                Company Name
              </FormLabel>
              <Input
                placeholder="Enter the company Name"
                disableUnderline
                name="company"
                value={formData.company}
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
              <FormLabel style={{ fontWeight: "bold", color: "#333" }} required>
                Job Title
              </FormLabel>
              <Input
                placeholder="Enter the Job Title"
                name="title"
                value={formData.title}
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
            Update Contact
          </Button>
        </form>
      </Modal>
    </>
  );
}
