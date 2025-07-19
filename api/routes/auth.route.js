import express from 'express';
import multer from 'multer';
import { signOut, signin, signup } from '../controllers/auth.controller.js';


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/signup",upload.single("photo") , signup);
router.post("/signin", signin);

router.get('/signout', signOut)

export default router;