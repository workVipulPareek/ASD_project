import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram } from 'react-icons/fa'; // Import icons

const Footer = () => {
  return (
    <footer className="d-flex justify-content-center align-items-center fixed-bottom bg-dark text-white p-3">
      {/* Grid container */}
      <div className="container p-4 pb-0">
        {/* Section: Social media */}
        <section className="mb-4 d-flex justify-content-center">
          {/* Facebook */}
          <a
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1 btn-lg"
            style={{ backgroundColor: '#3b5998' }}
            href="#!"
            role="button"
          >
            <FaFacebookF /> {/* Use JSX syntax */}
          </a>

          {/* Twitter */}
          <a
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1 btn-lg"
            style={{ backgroundColor: '#55acee' }}
            href="#!"
            role="button"
          >
            <FaTwitter /> {/* Use JSX syntax */}
          </a>

          {/* Google */}
          <a
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1 btn-lg"
            style={{ backgroundColor: '#dd4b39' }}
            href="#!"
            role="button"
          >
            <FaGoogle /> {/* Use JSX syntax */}
          </a>

          {/* Instagram */}
          <a
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1 btn-lg"
            style={{ backgroundColor: '#ac2bac' }}
            href="#!"
            role="button"
          >
            <FaInstagram /> {/* Use JSX syntax */}
          </a>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
