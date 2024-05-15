var express = require('express');
var router = express.Router();
var plantsController = require('../controllers/plants');
var multer = require('multer');
const plants = require("../controllers/plants");

// Multer configuration for file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/uploads/');
    },
    filename: function (req, file, cb) {
        var original = file.originalname;
        var file_extension = original.split(".");
        // Make the file name the date + the file extension
        filename =  Date.now() + '.' + file_extension[file_extension.length-1];
        cb(null, filename);
    }
});
var upload = multer({ storage: storage });

/* GET home page. */
router.get('/',  function(req, res, next) {
    res.render('new-plant-sighting', { title: 'Plant Creation' });
});

router.post('/',upload.single('image'), async function (req, res) {
    let plantData = req.body;
    let filePath = req.file.filename;
    await plantsController.create(plantData, filePath);
    res.redirect('/view-plants');
});

module.exports = router;
