const path = require('path');
const multer = require('multer'); 

var storage = multer.diskStorage({
    destination: function (req, file, cb)
    {
      cb(null, path.join(__dirname,'../../public/images/users') )  
    },
    filename:  function(req, file, cb){
       cb(null, 'avatar' + "-" + Date.now() + path.extname(file.originalname) );
    }
});

var upload = multer({storage});

module.exports = upload; 