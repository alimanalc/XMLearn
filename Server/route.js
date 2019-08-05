const express = require('express');
const cors = require('cors');
const router = express.Router();

const controller = require('../Server/controller');


router.post('/login', cors(), controller.getUser);
router.post('/signin', cors(), controller.createUser);
router.post('/createRequest', cors(), controller.createRequest);
router.post('/requests', cors(), controller.allRequestUser);

router.get('/', cors(), controller.getUsers);




module.exports = router;