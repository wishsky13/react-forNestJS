import ReactDOM from "react-dom/client";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Layout } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import {
  Login,
  SignUp,
  Dashboard,
  AdminDashBoard,
  Member,
  EmployeeDashBoard,
} from "./containers";
import reportWebVitals from "./reportWebVitals";
import UserProvider from "./provider/user";
import { createTheme, ThemeProvider } from "@mui/material";
import { Colors } from "./themes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.Dark_Green,
      contrastText: "#FFF",
    },
    error: {
      main: Colors.Red,
      contrastText: "#FFF",
    },
    secondary: {
      main: Colors.W100,
      contrastText: "#FFF",
    },
  },
});

root.render(
  // <LocalizationProvider dateAdapter={AdapterDateFns}>
  <UserProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/member/:id" element={<Member />}></Route>

            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/admin/dashboard" element={<AdminDashBoard />}></Route>
            <Route path="/employee/dashboard" element={<EmployeeDashBoard />}></Route>
            {/* <Route
                  path="/portal/product/:id/override"
                  element={<ProductOverride />}
                /> */}
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  </UserProvider>
  // </LocalizationProvider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
