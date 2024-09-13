import { useNavigate } from "react-router-dom";

function ContactCard({ contact }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/contact/${contact.login.uuid}`, { state: { contact } });
  };

  return (
    <li onClick={handleClick}>
      <img src={contact.picture.large} alt="profile" />
      <div className="contact-details">
        <p className="contact-name">
          {`${contact.name.first} ${contact.name.last}`}
        </p>
        <p>
          Phone:
          <span> {contact.phone}</span>{" "}
        </p>
        <p>
          Email:
          <span> {contact.email}</span>{" "}
        </p>
      </div>
    </li>
  );
}

export default ContactCard;
