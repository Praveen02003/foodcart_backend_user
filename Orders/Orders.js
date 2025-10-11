import mongoose from "mongoose";

const orderdataSchema = new mongoose.Schema({
    mail: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    items: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Ordersdata = mongoose.model("Order", orderdataSchema);
