import ContactListPage from "./Pages/ContactList";
import ContactDetails from "./Pages/ContactDetails";
import NotFound from "./Pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactListPage />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
