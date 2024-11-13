import { Grid2 } from "@mui/material";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <>
      <Grid2
        height={"100vh"}
        width={"100vw"}
        bgcolor="transparent"
        color={"grey"}
        style={{
          backgroundImage: "linear-gradient(to bottom, black, grey)",
          backgroundSize: "cover",
        }}
      >
        <Dashboard />
      </Grid2>
    </>
  );
};

export default App;
