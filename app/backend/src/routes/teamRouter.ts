import { Router } from 'express';
import teamFactory from '../factories/teamFactory';

const router = Router();

router.get('/', (req, res) => teamFactory().getAll(req, res));

router.get('/:id', (req, res) => teamFactory().getById(req, res));

export default router;