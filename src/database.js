const mongoose = require ('mongoose');

//console.log(process.env.MONGODB_ASHVITU)

mongoose.connect(process.env.MONGODB_ASHVITU, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})

.then(db => console.log('DB is connected good'))
.catch(err => console.error(err));
