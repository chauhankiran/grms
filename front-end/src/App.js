import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Home.
import Home from "./apps/home/Home";

// Auth.
import Login from "./apps/auth/Login";
import Register from "./apps/auth/Register";
import Reset from "./apps/auth/Reset";

// Companies.
import CompanyList from "./apps/companies/List";
import CompanyDetails from "./apps/companies/Details";
import CompanyAdd from "./apps/companies/Add";
import CompanyEdit from "./apps/companies/Edit";

// Contacts.
import ContactList from "./apps/contacts/List";
import ContactDetails from "./apps/contacts/Details";
import ContactAdd from "./apps/contacts/Add";
import ContactEdit from "./apps/contacts/Edit";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />

        {/* This looks clumsy. But, totally valid. TODO: Make it something interesting. */}
        {/* Companies routes. */}
        <Route
          path="/companies"
          element={
            <PrivateRoute>
              <CompanyList />
            </PrivateRoute>
          }
        />
        <Route
          path="/companies/:id"
          element={
            <PrivateRoute>
              <CompanyDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/companies/add"
          element={
            <PrivateRoute>
              <CompanyAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="/companies/:id/edit"
          element={
            <PrivateRoute>
              <CompanyEdit />
            </PrivateRoute>
          }
        />

        {/* Contacts routes. */}
        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <ContactList />
            </PrivateRoute>
          }
        />
        <Route
          path="/contacts/:id"
          element={
            <PrivateRoute>
              <ContactDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/contacts/add"
          element={
            <PrivateRoute>
              <ContactAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="/contacts/:id/edit"
          element={
            <PrivateRoute>
              <ContactEdit />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

// TODO: Place this code inside other component/file.
const PrivateRoute = ({ children }) => {
  // TODO: In future fetch it from store?
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default App;
