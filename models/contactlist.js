import mongoose from 'mongoose';

const Schema = mongoose.Schema

const contactlistSchema = new Schema({
    lastName: {
        type: String, 
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    age: {
        type: Number,
        required: true,
    }
})


const Contactlist = mongoose.model('Contactlist', contactlistSchema) ;
 
export default Contactlist
