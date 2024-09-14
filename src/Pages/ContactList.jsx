import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ContactList from "../Components/ContactList";
import { fetchContacts } from "../store";

function ContactListPage() {
  const dispatch = useDispatch();
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
      <br />
      <ContactList
        contacts={contacts}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

export default ContactListPage;
