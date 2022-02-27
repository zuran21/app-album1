const {Router} = require ('express');
const router = Router();

const Photo = require('../models/Photo');


const cloudinary = require('cloudinary');
cloudinary.config({
   // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   // api_key: process.env.CLOUDINARY_API_KEY,
   // api_secret: process.env.CLOUDINARY_API_SECRET

   cloud_name:process.env.cloudinary1,
   api_key:process.env.cloudinary2,
   api_secret:process.env.cloudinary3,
});

const fs = require('fs-extra');

router.get('/', async (req, res)=> {
    const photos = await Photo.find().lean();
    res.render('image', {photos});
    //res.send('Hello milagros')
    //loista las imagenes subidas
});

router.get('/images/add', async (req, res)=> {
    const photos = await Photo.find();
    res.render('image_form', {photos});
    //pinta el formulario
});

router.post('/images/add', async (req, res)=> {
   // console.log(req.body);// objeto recibido ejem: {title : 'asdasdas', description : 'asdasdasd'}
    const {title, description} = req.body;
   // console.log(req.file);// objeto recibido
    const result = await cloudinary.uploader.upload(req.file.path);
    //console.log(result)
    const newPhoto = new Photo({
        title, 
        description,
        imageURL: result.url,  
        public_id: result.public_id
    });
    await newPhoto.save();
    await fs.unlink(req.file.path);
    res.redirect('/');
});

router.get('/image/delete/:photo_id', async (req, res) => {
    const {photo_id} = req.params;
    const photo = await Photo.findByIdAndDelete(photo_id);
    const result = cloudinary.v2.uploader.destroy(photo.public_id);
    console.log(result)
    res.redirect('/images/add');
})

module.exports = router;