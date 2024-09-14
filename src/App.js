import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactListPage from "./Pages/ContactList";
import ContactDetails from "./Pages/ContactDetails";
import NotFound from "./Pages/NotFound";
import AddContact from "./Pages/AddContact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactListPage />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
        <Route path="/contact/new" element={<AddContact />} />
        <Route path="/contact/:id/edit" element={<AddContact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
