import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    senha: {
        type: String,
        required: false
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    ativo: {
        type: Boolean,
        default: true
    }
});

const User = mongoose.model('User', UserSchema);

export { User };