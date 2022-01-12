const express = require('express'); 
const router = express.Router();

const usersController = require('../controllers/usersController.js');
const upload = require('../middlewares/img-users');

router.get('/', usersController.list); 
router.delete('/:id',usersController.delete );

router.get('/login',usersController.login); 

router.get('/register',usersController.register);
router.post('/register', upload.single('image'), usersController.store );

router.get('/:id',usersController.usuario);

module.exports = router;