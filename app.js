require('dotenv').config();
const express = require('express');
const connectDB = require('./server/database/db');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


// ✅ Swagger UI MUST be declared BEFORE other routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/', require('./server/route/index'));

// Connect to DB and start server
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http:localhost:${PORT}`);
});
