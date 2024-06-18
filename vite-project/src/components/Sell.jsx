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
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

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
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="sell-form">
      <h2>Sell Your Car</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="make">Make:</label>
          <input id="make" {...register('make', { required: true })} />
          {errors.make && <p>This field is required</p>}
        </div>

        <div>
          <label htmlFor="model">Model:</label>
          <input id="model" {...register('model', { required: true })} />
          {errors.model && <p>This field is required</p>}
        </div>

        <div>
          <label htmlFor="year">Year:</label>
          <input id="year" type="number" {...register('year', { required: true, min: 1886 })} />
          {errors.year && <p>This field is required and must be a valid year</p>}
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input id="price" type="number" {...register('price', { required: true })} />
          {errors.price && <p>This field is required</p>}
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" {...register('description')} />
        </div>

        <div>
          <label>Upload Photo:</label>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop a photo here, or click to select one</p>
          </div>
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Sell;
