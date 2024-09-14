import { useLocation } from "react-router-dom";
import ContactInfo from "../Components/ContactInfo";

function ContactDetails() {
  const location = useLocation();
  const contact = location.state.contact;

  return (
    <div>{contact ? <ContactInfo contact={contact} /> : <p>Loading...</p>}</div>
  );
}

export default ContactDetails;
