const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
    senderName: String,
    receiverName: String,
    address: String,
    type: { type: String, enum: ['document', 'non-document'] },
    status: { type: String, default: 'Pending' },
    total_cost: Number,
    creator_email: String,
    creation_time: String,
    tracking_id: String
}, { timestamps: true });

const Parcel = mongoose.model('Parcel', parcelSchema);

module.exports = Parcel;