const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const Parcel = require('./models/Parcel'); // ✅ Model import

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Parcel Server is Running');
});

// ✅ Get All Parcels
app.get('/parcels', async (req, res) => {
    try {
        const { email } = req.query;

        let query = {};
        if (email) {
            query.creator_email = email;
        }

        const parcels = await Parcel.find(query).sort({ createdAt: -1 });
        res.json(parcels);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ Create Parcel
app.post('/parcels', async (req, res) => {
    try {
        const newParcel = new Parcel(req.body);
        const savedParcel = await newParcel.save();
        res.status(201).json(savedParcel);
    } catch (err) {
        console.error(err);  // Show error in terminal
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Parcel server listening on port ${port}`);
});
