import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      await axios.post(
        "http://localhost:3001/api/users/login",
        {
          email: formData.get("email"),
          password: formData.get("password"),
        },
        {
          withCredentials: true, // tells frontend to expect a http-only cookie
        }
      );
      setError("");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <h2>Login</h2>
      {error ? <p>{error}</p> : null}
      <form onSubmit={handleFormSubmit}>
        <label>
          Email
          <input type="text" name="email" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
