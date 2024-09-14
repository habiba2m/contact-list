import { useState, useEffect } from "react";
import ContactCard from "./ContactCard";

function ContactList({ contacts, isLoading, isError }) {
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [firstLetterArray, setFirstLetterArray] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const letters = [
      ...new Set(
        contacts.map((contact) => contact.name.first[0].toUpperCase())
      ),
    ];
    setFirstLetterArray(letters.sort());
  }, [contacts]);

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
  }, [query, contacts]);

  return (
    <>
      {isError ? (
        <p className="error">Something went wrong! Please try again</p>
      ) : isLoading ? (
        <p className="loading">loading...</p>
      ) : (
        <>
          <button
            className={
              filteredContacts.length === 0
                ? "filter-button active-button"
                : "filter-button"
            }
            onClick={() => setFilteredContacts([])}
          >
            All
          </button>
          {firstLetterArray.map((letter) => (
            <button
              key={letter}
              className={
                filteredContacts[0]?.name?.first[0]?.toUpperCase() === letter &&
                query === ""
                  ? "filter-button active-button"
                  : "filter-button"
              }
              onClick={() => {
                const filteredContacts = contacts.filter(
                  (contact) => contact.name.first[0].toUpperCase() === letter
                );
                setFilteredContacts(filteredContacts);
              }}
            >
              {letter}
            </button>
          ))}
          <input
            className="search"
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
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
