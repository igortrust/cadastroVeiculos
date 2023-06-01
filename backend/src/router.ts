import express from 'express';

const router = express.Router();


router.get('/veiculos', (req, res) => {
    res.send('Veículos');
});

export default router;