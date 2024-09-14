import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
      <ContactList
        contacts={contacts}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

export default ContactListPage;
