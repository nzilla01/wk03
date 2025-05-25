const express = require('express');
const router = express.Router();


const swaggerUi = require('swagger-ui-express');

router.use('/api-docs', swaggerUi.server);
router.get('/api-docs', swaggerUi.setup(swaggerdocument));


module.exports = router;