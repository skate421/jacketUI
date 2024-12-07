import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

export default function Signup(){
  // API URL
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + "/api/jacket/users/signup";

  // react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Add new user to API
  function addUser(data){
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
      <h2 className="text-center mt-3 mb-4">SIGNUP</h2>
      <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit(addUser)} method="post" encType="multipart/form-data">
      <div className="mb-3">
            <label className="form-label">First Name</label>
            <input {...register("first_name", {required: true})} 
            type="text" 
            className="form-control bg-light" />              
            {errors.first_name && <span className="text-danger">First name required</span>}
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input {...register("last_name", {required: true})} 
            type="text" 
            className="form-control bg-light" />              
            {errors.last_name && <span className="text-danger">Last name required</span>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input {...register("email", {required: true})} 
            type="email" 
            className="form-control bg-light" />              
            {errors.email && <span className="text-danger">Email required</span>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input {...register("password", {required: true})} type="password" className="form-control bg-light" />
            {errors.password && <span className="text-danger">Password required</span>}
          </div>   
          <button type="submit" className="btn btn-primary">signup</button>
          <Link to="/" className="btn btn-outline-secondary ms-3">Cancel</Link>
        </form>
        </div>
      </>
  )
}