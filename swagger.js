const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title : 'MY API',
        description : 'books api',
    },
    host: 'wk03.onrender.com',
    schemes: ['http'],
};
const outputFile = './swagger.json';
const endpointsFiles = ['./server/route/index.js'];    

swaggerAutogen(outputFile, endpointsFiles, doc)