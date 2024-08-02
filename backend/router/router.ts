import { Router } from 'express';
import * as fetchData from '../controller/controller';
import { verifyToken } from '../middleware/token';

const router = Router();

router.get('/get', fetchData.getData);
router.post('/', fetchData.postData);
router.delete('/delete/:id', fetchData.deleteData);
router.put('/update/:id', fetchData.updateData);
router.post('/login', fetchData.loginUser);
router.post('/signup', fetchData.signupUser);
router.get('/protected', verifyToken, fetchData.protectedRoute);

export default router;
