import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addContact, editContact } from "../store";

function AddContact() {
  const location = useLocation();
  const contact = location?.state?.contact;
  const [formData, setFormData] = useState({
    picture: contact?.picture?.large || "",
    firstName: contact?.name?.first || "",
    lastName: contact?.name?.last || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    city: contact?.location?.city || "",
    state: contact?.location?.state || "",
    country: contact?.location?.country || "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEdit = location.pathname.includes("edit");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture" && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: event.target.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key])
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const submissionData = {
        ...formData,
        picture: {
          large: formData.picture,
        },
        name: {
          first: formData.firstName,
          last: formData.lastName,
        },
        location: {
          city: formData.city,
          state: formData.state,
          country: formData.country,
        },
      };
      if (!isEdit)
        submissionData.login = {
          uuid: Math.random().toString(36).substr(2, 9),
        };
      if (isEdit) submissionData.login = contact.login;
      delete submissionData.firstName;
      delete submissionData.lastName;
      delete submissionData.city;
      delete submissionData.state;
      delete submissionData.country;
      console.log("Form submitted:", submissionData);
      isEdit
        ? dispatch(editContact(submissionData))
        : dispatch(addContact(submissionData));
      navigate("/");
    }
  };

  console.log(contact, "contact");

  return (
    <form className="contact-container" onSubmit={handleSubmit}>
      <h1>{isEdit ? "Edit Contact" : "Add Contact"}</h1>
      {Object.entries(formData).map(([key, value]) => (
        <label key={key}>
          {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
          {key === "picture" ? (
            <div>
              {value && (
                <img
                  src={value}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              )}
              <input
                type="file"
                name={key}
                onChange={handleChange}
                accept="image/*"
              />
            </div>
          ) : (
            <input
              type={
                key === "email" ? "email" : key === "phone" ? "tel" : "text"
              }
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          )}
          {errors[key] && <span className="error">{errors[key]}</span>}
        </label>
      ))}

      <input className="submit-button" type="submit" value="Submit" />
    </form>
  );
}

export default AddContact;
