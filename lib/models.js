import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },

},
{ timestamps: true }
);
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20,
    },
    cat: {
        type: String,
    },
    installments: {
        type: Number,
        required: true,
        min: 0,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    img: {
        type: String,
    },
    desc: {
        type: String,
       
    }

});

export const User = mongoose.models.User || mongoose.model("User", userSchema);

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);