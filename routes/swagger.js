const router = require('express').Router();
const swaggerrUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
router.use('/api-docs', swaggerrUi.serve);
router.get('/api-docs', swaggerrUi.setup(swaggerDocument));

module.exporrts = router;