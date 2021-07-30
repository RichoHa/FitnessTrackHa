const router = require('express').Router();

// bring in Workout model
const db = require('../../models');

//GET Routes: /api/workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await db.Workout.find({});
        res.send(workouts);
    } catch (error) {
        console.error(error);
        res.status(500).json('Workouts could not be found.');
    }
});

//POST Routes: /api/workouts
router.post('/', async (req, res) => {
    try {
        const addedWorkout = await db.Workout.create(req.body);
        res.json(addedWorkout);
    } catch (error) {
        console.error(error);
        res.status(500).json('Workout could not be created.');
    }
});

//PUT/UPDATE Routes: /api/workouts/id
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedWorkout = await db.Workout.findByIdAndUpdate(
            id,
            {
                $push: { exercises: req.body },
            },
            {
                new: true,
            }
        );
        res.status(200).json(updatedWorkout);
    } catch (error) {
        console.error(error);
        res.status(500).json('Workout could not be updated');
    }
});

//GET Routes: /api/workouts/range
router.get("/range", async (req, res) => {
    try {
        const workouts = await db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: '$exercises.duration'
                    }
                },
            },
        ])
        res.status(200).json(workouts);
    } catch (err) {
        console.log(err);
        response.status(500).send(err.message);
    }
});

module.exports = router;