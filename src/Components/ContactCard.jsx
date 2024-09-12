function ContactCard({ imgUrl, name, phone, email }) {
  return (
    <li>
      <img src={imgUrl} alt="profile" />
      <div className="contact-details">
        <p className="contact-name">{name}</p>
        <p>
          Phone:
          <span> {phone}</span>{" "}
        </p>
        <p>
          Email:
          <span> {email}</span>{" "}
        </p>
      </div>
    </li>
  );
}

export default ContactCard;
