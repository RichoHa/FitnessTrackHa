const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api/apiRoutes');

router.use('/api', apiRoutes);
// exercise page routing

router.get('/', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    } catch (error) {
        console.error(error);
        res.status(500);
    }
});

router.get('/exercise', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/exercise.html'));
    } catch (error) {
        console.error(error);
        res.status(500);
    }
});

// stats page routing
router.get('/stats', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/stats.html'));
    } catch (error) {
        console.error(error);
        res.status(500);
    }
});

module.exports = router;