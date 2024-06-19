// theme.jsx
import { extendTheme } from '@chakra-ui/react';
import '@fontsource/satisfy';
import '@fontsource/bungee';
import '@fontsource/roboto';
import '@fontsource/open-sans';

const theme = extendTheme({
//   fonts: {
//     heading: 'Satisfy, sans-serif', // Default heading font
//     body: 'Roboto, sans-serif', // Default body font
//   },
  components: {
    Heading: {
      variants: {
        main: {
          fontFamily: 'Satisfy, sans-serif',
        },
        footer: {
          fontFamily: 'Bungee, sans-serif',
        },
        marquee: {
          fontFamily: 'Open Sans, sans-serif',
        },
        navigation: {
          fontFamily: 'Roboto, sans-serif',
        },
      },
    },
    Text: {
      variants: {
        main: {
          fontFamily: 'Roboto, sans-serif',
        },
        footer: {
          fontFamily: 'Bungee, sans-serif',
        },
        marquee: {
          fontFamily: 'Open Sans, sans-serif',
        },
        navigation: {
          fontFamily: 'Roboto, sans-serif',
        },
      },
    },
    Box: {
      variants: {
        main: {
          fontFamily: 'Roboto, sans-serif',
        },
        footer: {
          fontFamily: 'Bungee, sans-serif',
        },
        marquee: {
          fontFamily: 'Open Sans, sans-serif',
        },
        navigation: {
          fontFamily: 'Roboto, sans-serif',
        },
      },
    },
  },
});

export default theme;
