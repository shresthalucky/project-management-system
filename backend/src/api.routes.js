import express from 'express';
import UserRoutes from './routes/user.route';
import ProjectRoutes from './routes/project.route';
import { validateToken } from './middlewares/helper.middlware';

const router = express.Router();

router.use('/users', UserRoutes);
router.use('/projects', validateToken, ProjectRoutes);

export default router;
