if (process.env.NODE_ENV !== 'production') {
require('dotenv').config();
}
const app = require('./app');

app.listen(app.get('port'), () =>{
    console.log('servidor Milagros <3 on ', app.get('port'));
    console.log('Environment :', process.env.NODE_ENV);
});