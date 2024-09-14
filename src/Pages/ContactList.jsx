import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchContacts } from "../store";
import ContactList from "../Components/ContactList";
import Filter from "../Components/Filter";

function ContactListPage() {
  const dispatch = useDispatch();
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [firstLetterArray, setFirstLetterArray] = useState([]);
  const [query, setQuery] = useState("");
  const contacts = useSelector((state) => state.contacts);
  const isLoading = useSelector((state) => state.isLoading);
  const isError = useSelector((state) => state.isError);

  useEffect(() => {
    if (contacts.length > 0) return;
    dispatch(fetchContacts());
  }, [contacts.length, dispatch]);

  return (
    <div className="container">
      <h1 className="header">Contact List</h1>
      <Link className="create-contact" to="/contact/new">
        + Add Contact
      </Link>
      <Filter
        filteredContacts={filteredContacts}
        setFilteredContacts={setFilteredContacts}
        contacts={contacts}
        query={query}
        setQuery={setQuery}
        firstLetterArray={firstLetterArray}
      />
      <ContactList
        contacts={contacts}
        isLoading={isLoading}
        isError={isError}
        query={query}
        setFilteredContacts={setFilteredContacts}
        setFirstLetterArray={setFirstLetterArray}
        filteredContacts={filteredContacts}
      />
    </div>
  );
}

export default ContactListPage;
