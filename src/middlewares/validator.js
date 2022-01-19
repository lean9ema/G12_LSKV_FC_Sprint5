const {body} = require('express-validator'); 
const path = require('path');

var fecha = new Date(); 
var mes = fecha.getMonth() + 1;  
var dia = fecha.getDate(); 
var anio = fecha.getFullYear();
var f = new Date(anio,mes,dia); 

const validator = [
    body('user-name').notEmpty().withMessage('Debe escribir un nombre de usuario'),

    body('name').notEmpty().withMessage('Debe escribir un nombre'),
    
    body('surname').notEmpty().withMessage('Debe escribir un apellido'),
    
    body('email').notEmpty().withMessage('Debes escribir un correo electrónico').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),

    body('password').notEmpty().withMessage('Escriba una contraseña').bail()
        .isLength({min:6}).withMessage('Debe tener minimo 6 caracteres'), 
    
    body('confirm-password').notEmpty().withMessage('Escriba una contraseña').bail()
    .isLength({min:6}).withMessage('Debe tener minimo 6 caracteres'), 

    body('dni').notEmpty().withMessage('Debe un DNI').bail()
        .isLength({min:7, max:9}).withMessage('Escriba un DNI valido'),

    body('fNac').notEmpty().withMessage('Debe elegir una fecha').bail()
        .trim()
        .isDate().withMessage('Debe ser una fecha valida'),

    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        
        if( file ) {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }

        return true;
    })
]

module.exports = validator; 