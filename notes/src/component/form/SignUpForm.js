import React from "react";
import { useState } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signup } from "../../app/slices/authSlice";
import "./SignUpForm.css";

function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number is not valid") // Adjust the regex as needed
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
  });

  const validate = async () => {
    try {
      await validationSchema.validate(
        {
          email,
          password,
          name,
          phone,
          address,
        },
        { abortEarly: false }
      );
      setErrors({});
      return true;
    } catch (err) {
      const newError = {};
      err.inner.forEach((error) => {
        newError[error.path] = error.message;
      });
      setErrors(newError);
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validate();
    if (!isValid) {
      return;
    }

    const user = {
      email,
      password,
      name,
      phone,
      address
    }
    console.log(user)
    dispatch(signup(user));

    setEmail("");
    setPassword("");
    setName("");
    setPhone("");
    setAddress("");
  };
  return (
    <>
       <h3 className="signup-title">Signup</h3>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input type="text" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input type="text" placeholder="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone: </label>
          <input type="text" placeholder="Phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address: </label>
          <input type="text" placeholder="Address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          {errors.address && <div className="error-message">{errors.address}</div>}
        </div>

        <button type="submit" className="submit-button">SignUp</button>
      </form>
      <div className="login-prompt">
        <p>Already have an account? <a href="/login" className="login-link">Login here</a>.</p>
      </div>
      
    </>
  );
}

export default Form;
