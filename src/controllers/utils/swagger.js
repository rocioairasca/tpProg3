const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Programación III',
        description: 'API de backend',
    },
    host: 'localhost:3000'
};

const outputFile = '../../../swagger-output.json';
const routes = [
    "src/controllers/modules/user/user.routes.js",
    "src/controllers/modules/tasks/task.routes.js"
];

swaggerAutogen(outputFile, routes, doc);