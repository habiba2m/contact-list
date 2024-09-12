import { useState, useEffect } from "react";
import ContactList from "./Components/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    async function fetchContacts() {
      try {
        setIsLoading(true);
        const response = await fetch("https://randomuser.me/api/?results=50");
        const data = await response.json();
        setContacts(data?.results);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(true);
      }
    }
    fetchContacts();
  }, []);

  return (
    <div className="container">
      <h1 className="header">Contact List</h1>
      <ContactList
        contacts={contacts}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

export default App;
