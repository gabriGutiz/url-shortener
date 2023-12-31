import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.ObjectId,
        select: false,
        default: new mongoose.Types.ObjectId()
    },
    urlId: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    urlOriginal: {
        type: String,
        required: true
    },
    descricao: {
        type: String
    },
    acessoMaximo: {
        type: Number,
        min: 1
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    dataExpiracao: {
        // TODO: adicionar verificação para data posterior a hoje
        type: Date
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    ativo: {
        type: Boolean,
        default: true
    },
    __v: {
        type: Number,
        select: false
    }/*,
    categorias: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Categoria'
        }
    }]*/
});

const Url = mongoose.model('Url', UrlSchema);

export { Url };