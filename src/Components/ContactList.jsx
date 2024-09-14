import ContactCard from "./ContactCard";

function ContactList({
  contacts,
  isLoading,
  isError,
  query,
  filteredContacts,
}) {
  return (
    <>
      {isError ? (
        <p className="error">Something went wrong! Please try again</p>
      ) : isLoading ? (
        <p className="loading">loading...</p>
      ) : (
        <>
          <ul>
            {(filteredContacts?.length > 0
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
