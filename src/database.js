const mongoose = require ('mongoose');

//console.log(process.env.MONGODBlASHVITU)

mongoose.connect(process.env.MONGODBASHVITU, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})

.then(db => console.log('DB is connected good'))
.catch(err => console.error(err));
