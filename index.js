require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();
app.use(express.json());

const userRouter = require("./src/controllers/modules/user/user.routes.js");
const taskRouter = require("./src/controllers/modules/tasks/task.routes.js");

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());

const corsOptions = {
    origin: 'https://tp-prog3-fmexlx0ee-rocioairascas-projects.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Conectando a MongoDB
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB')).catch(err => console.error('No se pudo conectar a MongoDB', err));

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(userRouter, taskRouter);

var options = {
    explorer: true
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Escuchamos en el puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});