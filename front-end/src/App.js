import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Home.
import Home from "./apps/home/Home";

// Auth.
import Login from "./apps/auth/Login";
import Register from "./apps/auth/Register";
import Reset from "./apps/auth/Reset";

// Dashboard.
import Dashboard from "./apps/dashboard/Dashboard";

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

// Deals.
import DealList from "./apps/deals/List";
import DealDetails from "./apps/deals/Details";
import DealAdd from "./apps/deals/Add";
import DealEdit from "./apps/deals/Edit";

// Quotes.
import QuoteList from "./apps/quotes/List";
import QuoteDetails from "./apps/quotes/Details";
import QuoteAdd from "./apps/quotes/Add";
import QuoteEdit from "./apps/quotes/Edit";

// Tickets.
import TicketList from "./apps/tickets/List";
import TicketDetails from "./apps/tickets/Details";
import TicketAdd from "./apps/tickets/Add";
import TicketEdit from "./apps/tickets/Edit";

// Tasks.
import TaskList from "./apps/tasks/List";
import TaskDetails from "./apps/tasks/Details";
import TaskAdd from "./apps/tasks/Add";
import TaskEdit from "./apps/tasks/Edit";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />

        {/* This looks clumsy. But, totally valid. TODO: Make it something interesting. */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

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

        {/* Deals routes. */}
        <Route
          path="/deals"
          element={
            <PrivateRoute>
              <DealList />
            </PrivateRoute>
          }
        />
        <Route
          path="/deals/:id"
          element={
            <PrivateRoute>
              <DealDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/deals/add"
          element={
            <PrivateRoute>
              <DealAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="/deals/:id/edit"
          element={
            <PrivateRoute>
              <DealEdit />
            </PrivateRoute>
          }
        />

        {/* Quotes routes. */}
        <Route
          path="/quotes"
          element={
            <PrivateRoute>
              <QuoteList />
            </PrivateRoute>
          }
        />
        <Route
          path="/quotes/:id"
          element={
            <PrivateRoute>
              <QuoteDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/quotes/add"
          element={
            <PrivateRoute>
              <QuoteAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="/quotes/:id/edit"
          element={
            <PrivateRoute>
              <QuoteEdit />
            </PrivateRoute>
          }
        />

        {/* Quotes routes. */}
        <Route
          path="/tickets"
          element={
            <PrivateRoute>
              <TicketList />
            </PrivateRoute>
          }
        />
        <Route
          path="/tickets/:id"
          element={
            <PrivateRoute>
              <TicketDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/tickets/add"
          element={
            <PrivateRoute>
              <TicketAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="/tickets/:id/edit"
          element={
            <PrivateRoute>
              <TicketEdit />
            </PrivateRoute>
          }
        />

        {/* Tasks routes. */}
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <PrivateRoute>
              <TaskDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/add"
          element={
            <PrivateRoute>
              <TaskAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/:id/edit"
          element={
            <PrivateRoute>
              <TaskEdit />
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
