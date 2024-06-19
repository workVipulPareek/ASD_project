/*<li className='nav-item'>
          <NavLink className='nav-link' to="/sell" activeClassName="active"> add this to homepage.jsx 
            About
          </NavLink>
        </li>*/

/*
import Sell from .....
 <Route path = "/sell" element={<Sell/>}></Route>  add this to app.jsx

*/
// src/components/Sell.jsx
// src/components/Sell.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sell = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: 'image/*',
    maxFiles: 1
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path} className="list-group-item">
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className='main-body'>
    <div className="container mt-5">
      <h2 className="text-center text-white bg-dark p-3">Sell Your Car</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-light p-4 rounded">
        <div className="mb-3">
          <label htmlFor="make" className="form-label">Make:</label>
          <input id="make" className="form-control" {...register('make', { required: true })} />
          {errors.make && <p className="text-danger">This field is required</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="model" className="form-label">Model:</label>
          <input id="model" className="form-control" {...register('model', { required: true })} />
          {errors.model && <p className="text-danger">This field is required</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="year" className="form-label">Year:</label>
          <input id="year" type="number" className="form-control" {...register('year', { required: true, min: 1886 })} />
          {errors.year && <p className="text-danger">This field is required and must be a valid year</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input id="price" type="number" className="form-control" {...register('price', { required: true })} />
          {errors.price && <p className="text-danger">This field is required</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea id="description" className="form-control" {...register('description')} />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Photo:</label>
          <div {...getRootProps({ className: 'dropzone border border-dark p-3 rounded' })}>
            <input {...getInputProps()} />
            <p className="text-center">Drag 'n' drop a photo here, or click to select one</p>
          </div>
          <aside className="mt-3">
            <h4>Files</h4>
            <ul className="list-group">{files}</ul>
          </aside>
        </div>

        <button type="submit" className="btn btn-dark">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default Sell;
