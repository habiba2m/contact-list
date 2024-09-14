import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteContact } from "../store";

function ContactInfo({ contact }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteContact(contact.login.uuid));
    navigate("/");
  };

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
      </div>
      <div className="action-buttons">
        <Link
          to={{
            pathname: `/contact/${contact.login.uuid}/edit`,
          }}
          state={{ contact }}
          className="edit-contact"
        >
          Edit Contact✏️
        </Link>
        <button className="delete-button" onClick={handleDelete}>
          Delete Contact🗑️
        </button>
      </div>
    </div>
  );
}

export default ContactInfo;
