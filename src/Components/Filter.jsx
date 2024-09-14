import { useEffect } from "react";

function Filter({
  filteredContacts,
  setFilteredContacts,
  contacts,
  query,
  setQuery,
  firstLetterArray,
  setFirstLetterArray,
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
        placeholder="🔍 Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
}

export default Filter;
