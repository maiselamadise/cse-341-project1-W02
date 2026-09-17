const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description:
      'API for storing and retrieving contact information (firstName, lastName, email, favoriteColor, birthday).',
  },
  // No "host" set on purpose: Swagger UI's "Try it out" then sends requests
  // to whatever origin served the page, so the same generated file works
  // unmodified on localhost AND on Render — no need to regenerate per environment.
  schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

// Running `node swagger.js` (re)generates swagger-output.json by scanning
// server.js and the routers it pulls in.
swaggerAutogen(outputFile, endpointsFiles, doc);
