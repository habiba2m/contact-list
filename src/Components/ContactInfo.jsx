import { Link } from "react-router-dom";

function ContactInfo({ contact }) {
  return (
    <div className="contact-container">
      <img src={contact.picture.large} alt="profile" />
      <div>
        <p className="contact-name">
          {contact.name.first} {contact.name.last}
        </p>
        <p>📩 {contact.email}</p>
        <p>☎️ {contact.phone}</p>
        <p>
          📍{contact.location.city}, {contact.location.state},{" "}
          {contact.location.country}
        </p>
        <Link
          to={{
            pathname: `/contact/${contact.login.uuid}/edit`,
          }}
          state={{ contact }}
          className="create-contact"
        >
          Edit Contact
        </Link>
      </div>
    </div>
  );
}

export default ContactInfo;
