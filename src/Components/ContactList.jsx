import { useEffect } from "react";
import ContactCard from "./ContactCard";

function ContactList({
  contacts,
  isLoading,
  isError,
  query,
  setFilteredContacts,
  setFirstLetterArray,
  filteredContacts,
}) {
  useEffect(() => {
    const letters = [
      ...new Set(
        contacts.map((contact) => contact.name.first[0].toUpperCase())
      ),
    ];
    setFirstLetterArray(letters.sort());
  }, [contacts, setFirstLetterArray]);

  useEffect(() => {
    if (query === "") setFilteredContacts([]);
    else {
      const filteredContacts = contacts.filter(
        (contact) =>
          contact.name.first.toLowerCase().startsWith(query.toLowerCase()) ||
          contact.name.last.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredContacts(filteredContacts);
    }
  }, [query, contacts, setFilteredContacts]);

  return (
    <>
      {isError ? (
        <p className="error">Something went wrong! Please try again</p>
      ) : isLoading ? (
        <p className="loading">loading...</p>
      ) : (
        <>
          <ul>
            {(filteredContacts.length > 0
              ? filteredContacts
              : query === ""
              ? contacts
              : []
            ).map((contact) => (
              <ContactCard key={contact.login.uuid} contact={contact} />
            ))}
            {query !== "" && filteredContacts.length === 0 && (
              <p className="no-result">No results found</p>
            )}
          </ul>
        </>
      )}
    </>
  );
}

export default ContactList;
