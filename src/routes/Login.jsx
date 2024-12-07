import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
 
  // react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [loginFail, setLoginFail] = useState(false);

  // form submit function
  async function formSubmit(data) {
    const apiHost = import.meta.env.VITE_API_HOST;
    const url = apiHost + "/api/jacket/users/login";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      credentials: 'include' // make fetch include cookies in the request
    });

    if(response.ok){
      window.location.href = '/'; // redirect to home page
    }
    else {
      setLoginFail(true);
    }
  }
  
  return (
    <>
      <h2 className="text-center mt-3 mb-4">LOGIN</h2>
      <div className="d-flex justify-content-center">
      {loginFail && <p className="text-danger">Incorrect username or password.</p>}
      <form onSubmit={handleSubmit(formSubmit)} method="post" encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input {...register("email", { required: "Email is required." })} type="email" className="form-control bg-light" />
          {errors.email && <span className="text-danger">{errors.email.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input {...register("password", { required: "Password is required." })} type="password" className="form-control bg-light" />
          {errors.password && <span className="text-danger">{errors.password.message}</span>}
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <Link to="/" className="btn btn-outline-dark ms-2">Cancel</Link>
      </form>
      </div>
      <p className="mt-4 text-center">Don't have an account? <Link to="/signup">Sign-up</Link> now.</p>
    </>
  )
}