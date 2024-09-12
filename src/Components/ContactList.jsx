import { useState, useEffect } from "react";
import ContactCard from "./ContactCard";

function ContactList({ contacts, isLoading, isError }) {
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [firstLetterArray, setFirstLetterArray] = useState([]);

  useEffect(() => {
    const letters = [
      ...new Set(
        contacts.map((contact) => contact.name.first[0].toUpperCase())
      ),
    ];
    setFirstLetterArray(letters);
  }, [contacts]);

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
                filteredContacts[0]?.name?.first[0]?.toUpperCase() === letter
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
          <ul>
            {(filteredContacts.length > 0 ? filteredContacts : contacts).map(
              (contact) => (
                <ContactCard
                  key={contact.login.uuid}
                  name={`${contact.name.first} ${contact.name.last}`}
                  imgUrl={contact.picture.large}
                  phone={contact.phone}
                  email={contact.email}
                />
              )
            )}
          </ul>
        </>
      )}
    </>
  );
}

export default ContactList;
