import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

export default function Login(){
  // API URL
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + "/api/jacket/users/login";

  // react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Add new user to API
  function loginUser(data){
    //e.preventDefault();

    console.log(data);
    
    // Create form
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('password', data.password);
    formData.append('email', data.email);
    
    // Post data to API
    async function postData() {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      }); 

      if(response.ok){
        window.location.href = '/login';       
      } else { 
        // to-do: handle error        
      }
    }

    postData();
  }

  return (
    <>
      <h2 className="text-center mt-3 mb-4">LOGIN</h2>
      <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit(loginUser)} method="post" encType="multipart/form-data">

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input {...register("email", {required: true})} 
            type="email" 
            className="form-control bg-light" />              
            {errors.email && <span className="text-danger">Invalid email</span>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input {...register("password", {required: true})} type="password" className="form-control bg-light" />
            {errors.password && <span className="text-danger">Invalid password</span>}
          </div>   
          <button type="submit" className="btn btn-primary">signup</button>
          <Link to="/" className="btn btn-outline-secondary ms-3">Cancel</Link>
        </form>
        </div>
      </>
  )
}