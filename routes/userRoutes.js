import express from 'express';
import { getAllUsers, login, registerUser } from '../controllers/userController.js';

const router = express.Router();

//GET::
//http://localhost:3000/api/users/
router.get('/', getAllUsers)

router.post('/login', login)

//POST::
//http://localhost:3000/api/users/create
//BODY
// {
// 	"firstName":"Brandon",
// 	"lastName":"Test",
// 	"userName":"Brandon123",
// 	"email":"brandon.test@test.com"
// }
router.post('/create', registerUser);


export default router;