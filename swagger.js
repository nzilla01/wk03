const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title : 'MY API',
        description : 'books api',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};
const outputFile = './swagger.json';
const endpointsFiles = ['./server/route/index.js'];    

swaggerAutogen(outputFile, endpointsFiles, doc)