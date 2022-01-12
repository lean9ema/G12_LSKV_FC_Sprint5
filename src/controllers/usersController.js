const fs = require('fs');
const path = require('path');

const jsonDB = require('../model/jsonUsersDatabase');
const userModel = jsonDB('usersDataBase');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const usersController = {
    login: function(req,res) {
        return res.render('users/login');
    },
    
    register: function(req,res) {
        return res.render("users/register");
    },

	store: function(req, res){
		if (req.file){
			console.log(req.file);
			let aCrear = req.body;
			aCrear.dni = Number(aCrear.dni);
			aCrear.image = req.file.filename;
			console.log(req.file)
			let aCrearID = userModel.create(aCrear);
			res.redirect(`/users/${aCrearID}`);
		}else { 
			const error = new Error('Hubo un error intente nuevamente!')
			return next(error)
		}
	},
	delete: function(req,res){
		const user = userModel.find(req.params.id);
		if (user.image != undefined) fs.unlinkSync(path.join(__dirname,`../../public/images/users/${user.image}`));
		userModel.delete(user.id);
		return res.redirect('/users');
	},

	list: (req,res)=>{
		const users = userModel.all(); 
		res.render('users/usersList',{users});
	},

	usuario: (req,res)=>{
		const usuario = userModel.find(req.params.id);
        res.render('users/usuario',{ element : usuario});
    }
   
}

module.exports = usersController;