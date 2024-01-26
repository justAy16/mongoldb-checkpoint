import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Contactlist from './models/contactlist.js'

dotenv.config()

const app= express()
const mongoUser = process.env.MONGOUSER
const mongoPass =  process.env.MONGOPASS
const port = process.env.PORT



const mongo = `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.t8nbql8.mongodb.net/contact?retryWrites=true&w=majority`
mongoose.connect(mongo)
.then(async () =>{
    console.log('connected to db');
    // await Contactlist.insertMany([
        
    //     { lastName: 'Ben Lahmer', firstName: 'Fares', email: 'fares@gmail.com', age: 26 },
    //     { lastName: 'Kefi', firstName: 'Seif', email: 'kefi@gmail.com', age: 15 },
    //     { lastName: 'Fatnassi', firstName: 'Sarra', email: 'sarra.f@gmail.com', age: 40 },
    //     { lastName: 'Ben Yahia', firstName: 'Rym', age: 4 },
    //     { lastName: 'Cherif', firstName: 'Sami', age: 3 },
    //   ]);

      app.get('/contacts', async (req, res) => {
        const contacts = await Contactlist.find();
        res.json(contacts);
      });
      app.get('/contacts/:id', async (req, res) => {
        const contact = await Contactlist.findById(req.params.id);
        res.json(contact);
      });
      app.get('/contacts/age/:minAge', async (req, res) => {
        const contacts = await Contactlist.find({ age: { $gt: parseInt(req.params.minAge) } });
        res.json(contacts);
      });
      app.get('/contacts/filtered/:minAge/:nameSubstring', async (req, res) => {
        const contacts = await Contactlist.find({
          age: { $gt: parseInt(req.params.minAge) },
          $or: [
            { firstName: { $regex: req.params.nameSubstring, $options: 'i' } },
            { lastName: { $regex: req.params.nameSubstring, $options: 'i' } },
          ],
        });
        res.json(contacts);
      });
      app.put('/contacts/:id', async (req, res) => {
        const updatedContact = await Contactlist.findByIdAndUpdate(req.params.id, { firstName: 'Anis' });
        // res.send('Contact updated successfully');
        res.json(updatedContact);
      });
      app.delete('/contacts/age/:maxAge', async (req, res) => {
        const deletedContacts = await Contactlist.find({ age: { $lt: parseInt(req.params.maxAge) } });

        await Contactlist.deleteMany({ age: { $lt: parseInt(req.params.maxAge) } });

        const updatedCollection = await Contactlist.find();
        // res.send('Contacts deleted successfully');

        res.json(updatedCollection);
      });

    app.listen(port, ()=>{
        console.log('server mount o, e mount')
    })
})
.catch((err)=>console.log(err))
