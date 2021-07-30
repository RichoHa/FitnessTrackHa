const router = require('express').Router();

// bring in Workout model
const Workout = require('../../models/Workout');

//GET Routes: /api/workouts
router.get('/workouts', async (req, res) => {
    try {
        const workouts = await Workout.find({});
        res.send(workouts);
    } catch (error) {
        console.error(error);
        res.status(500).json('Workouts could not be found.');
    }
});

//POST Routes: /api/workouts
router.post('/workouts', async (req, res) => {
    try {
        const addedWorkout = await Workout.create(req.body);
        res.json(addedWorkout);
    } catch (error) {
        console.error(error);
        res.status(500).json('Workout could not be created.');
    }
});

//PUT/UPDATE Routes: /api/workouts/id
router.put('/workouts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(
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
router.get("/api/workouts/range", async (req, res) => {
    try {
        const workouts = await db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: '$exercises.duration'
                    },
                    totalWeight: {
                        $sum: '$exercises.weight'
                    }
                },
            },
        ])
            .limit(7)
            .sort({ _id: "descending" })
        res.json(workouts);
    } catch (err) {
        console.log(err);
        response.status(500).send(err.message);
    }
});

module.exports = router;