import { Router } from 'express';

const router = Router();

// Route handlers
router.get('/', (req, res) => {
    res.send('Wow ')
})
export { router };