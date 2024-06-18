import { Box, Center, Heading, Flex } from '@chakra-ui/react';
import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram } from 'react-icons/fa'; // Import icons

const Footer = () => {
  return (
    <footer className="bg-dark text-white p-3">
      <Flex direction="column" alignItems="center" justify="center">
        {/* Social media icons section */}
        <Flex mb={4}>
          {/* Facebook */}
          <a
            className="btn text-white btn-floating m-1 btn-lg"
            style={{ backgroundColor: '#3b5998' }}
            href="#!"
            role="button"
          >
            <FaFacebookF /> {/* Use JSX syntax */}
          </a>

          {/* Twitter */}
          <a
            className="btn text-white btn-floating m-1 btn-lg"
            style={{ backgroundColor: '#55acee' }}
            href="#!"
            role="button"
          >
            <FaTwitter /> {/* Use JSX syntax */}
          </a>

          {/* Google */}
          <a
            className="btn text-white btn-floating m-1 btn-lg"
            style={{ backgroundColor: '#dd4b39' }}
            href="#!"
            role="button"
          >
            <FaGoogle /> {/* Use JSX syntax */}
          </a>

          {/* Instagram */}
          <a
            className="btn text-white btn-floating m-1 btn-lg"
            style={{ backgroundColor: '#ac2bac' }}
            href="#!"
            role="button"
          >
            <FaInstagram /> {/* Use JSX syntax */}
          </a>
        </Flex>

        {/* Footer content */}
        <Box textAlign="center">
          <Heading as="h5" size="md" className="text-white">
            We kick the competition
            <br>
            </br>
            Miyagi-Do Dojo 1984
          </Heading>
          <p className="text-white">© 2021 LaRusso Motors</p>
          <p className="text-white">All Rights Reserved</p>
        </Box>
      </Flex>
    </footer>
  );
};

export default Footer;
