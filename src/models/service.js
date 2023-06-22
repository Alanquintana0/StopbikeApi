const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    bicycle: {
        type: String,
        required: true
    },
    entryDate: {
        type: Date,
        required: true
    },
    exitDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Service', serviceSchema);
