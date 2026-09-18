const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description:
      'API for storing and retrieving contact information (firstName, lastName, email, favoriteColor, birthday).',
  },
  host: 'cse-341-project1-w02.onrender.com', 
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);