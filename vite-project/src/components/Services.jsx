
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import 'bootstrap/dist/css/bootstrap.min.css';

const Service = () => {
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
      <h2 className="text-center text-white bg-dark p-3">Services Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-light p-4 rounded">
        <div className="mb-3">
          <label htmlFor="Sr_name" className="form-label">Service Name:</label>
          <input id="Sr_name" className="form-control" {...register('Sr_name', { required: true })} />
          {errors.Sr_name && <p className="text-danger">This field is required</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="model_name" className="form-label">Model Name:</label>
          <input id="model_name" className="form-control" {...register('model_name', { required: true })} />
          {errors.model_name && <p className="text-danger">This field is required</p>}
        </div>

        {/* <div className="mb-3">
          <label htmlFor="year" className="form-label">Year:</label>
          <input id="year" type="number" className="form-control" {...register('year', { required: true, min: 1886 })} />
          {errors.year && <p className="text-danger">This field is required and must be a valid year</p>}
        </div> */}

        <div className="mb-3">
          <label htmlFor="Sr_date" className="form-label">Service Date:</label>
          <input id="Sr_date" type="date" className="form-control" {...register('Sr_date', { required: true })} />
          {errors.Sr_time && <p className="text-danger">This field is required</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="Sr_time" className="form-label">Service Time:</label>
          <input id="Sr_time" type="time" className="form-control" {...register('Sr_time', { required: true })} />
          {errors.Sr_time && <p className="text-danger">This field is required</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="Iss_description" className="form-label">Issue Description:</label>
          <textarea id="Iss_description" className="form-control" {...register('Iss_description', { required: true })} />
          {errors.Iss_description && <p className="text-danger">This field is required</p>}
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

export default Service;
