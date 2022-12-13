const mongoose = require('mongoose');

//const MONGODB_URI = 'mongodb://localhost:27017/notes-app'
const MONGODB_URI = 'mongodb+srv://usuario_prueba:prueba@cluster0.crcxk5w.mongodb.net/app?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));