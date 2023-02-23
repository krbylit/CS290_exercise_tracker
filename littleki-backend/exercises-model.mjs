// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;
const d = new Date()
const day = d.getDate()
const month = d.getMonth()
const year = d.getFullYear()
const date = '${year}-${month}-${day}'

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to MongoDB Movies collection using Mongoose.');
    }
});

// SCHEMA: Define the collection's schema.
const exerciseSchema = mongoose.Schema({
	// name: { type: String, required: true, min: 1 },
	// reps: { type: Number, required: true, min: 1 },
	// weight: { type: Number, required: true, min: 1, default: 5 },
    // unit: { type: String, required: true, min: 1, default: 'lbs' },
    // date: { type: Date, required: true, min: date, default: date }
    name: { type: String, required: true},
	reps: { type: Number, required: true},
	weight: { type: Number, required: true},
    unit: { type: String, required: true},
    date: { type: Date, required: true}
});

// Compile the model from the schema.
const Exercises = mongoose.model("Exercises", exerciseSchema);


// CREATE model *****************************************
const addExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercises({ 
        name: name, 
        reps: reps, 
        weight: weight,
        unit: unit,
        date: date 
    });
    return exercise.save();
}


// RETRIEVE models *****************************************
// Retrieve based on a filter and return a promise.
const getExercises = async (filter) => {
    const query = Exercises.find(filter);
    return query.exec();
}

// Retrieve based on the ID and return a promise.
const findExerciseById = async (_id) => {
    const query = Exercises.findById(_id);
    return query.exec();
}


// DELETE model based on ID  *****************************************
const deleteById = async (_id) => {
    const exercise = await Exercises.deleteOne({_id: _id});
    return exercise.deletedCount;
};


// REPLACE model *****************************************************
const updateExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercises.replaceOne({_id: _id }, {
        name: name, 
        reps: reps, 
        weight: weight,
        unit: unit,
        date: date 
    });
    return result;
}



// Export our variables for use in the controller file.
export { addExercise, getExercises, findExerciseById, deleteById, updateExercise }