import { Router } from 'express';
import authToken from '../middlewares/authToken';
import matchesFactory from '../factories/matchFactory';

const router = Router();

router.get('/', (req, res) => matchesFactory().getAll(req, res));

router.post('/', authToken, (req, res) => matchesFactory().create(req, res));

router.patch('/:id/finish', (req, res) => matchesFactory().updateToFinished(req, res));

router.patch('/:id', (req, res) => matchesFactory().updateGoals(req, res));

export default router;