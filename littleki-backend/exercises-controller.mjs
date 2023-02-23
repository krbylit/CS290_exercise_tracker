import 'dotenv/config';
import express from 'express';
import * as exercises from './exercises-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());


// CREATE controller ******************************************
app.post ('/exercises', async (req,res) => { 
    exercises.addExercise(
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date,
        )
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'Creation of a document failed due to invalid syntax.' });
        });
});


// RETRIEVE controller ****************************************************
// GET movies by ID
app.get('/exercises/:_id', async (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request to retrieve document failed' });
        });

});


// GET movies filtered by year or language
app.get('/exercises', async (req, res) => {
    let filter = {};
    // // filter by year
    // if(req.query.year !== undefined){
    //     filter = { year: req.query.year };
    // }
    // // filter by language
    // if(req.query.language !== undefined){
    //     filter = { language: req.query.language };
    // }
    exercises.getExercises(filter, '', 0)
        .then(exercise => {
            res.status(200).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request to retrieve documents failed' });
        });

});

// DELETE Controller ******************************
app.delete('/exercises/:_id', async (req, res) => {
    exercises.deleteById(req.params._id)
        .then(promise => {
            if (promise === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete a document failed' });
        });
});

// UPDATE controller ************************************
app.put('/exercises/:_id', async (req, res) => {
    exercises.updateExercise(
        req.params._id, 
        req.body.name, 
        req.body.reps, 
        req.body.weight,
        req.body.unit,
        req.body.date,
    )
    .then(exercise => {
        if (exercise !== null) {
            res.status(200).json(exercise);
        } else {
            res.status(404).json({ Error: 'Document not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Request to update a document failed' });
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});