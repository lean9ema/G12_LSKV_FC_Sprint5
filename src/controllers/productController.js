const jsonDB = require('../model/jsonProductsDataBase');
const productModel = jsonDB('productsDataBase');
const categories = ["Blusas", "Remeras", "Vestidos", "Monos", "Shorts", "Faldas", "Jeans"];
const fs = require('fs');
const path = require('path');
const { Console } = require('console');

const productController = {
    prodDetail: (req,res) =>{
        let product = productModel.find(req.params.productId)
        const productList = productModel.readFile();
        return res.render("products/productDetail",{ product,productList })    
    },
    
    list: (req,res) => {
        const productList = productModel.readFile();
        return res.render('products/productList', { productList })
    },

    create: (req,res) => {
        return res.render("products/productCreate")
    },

    store: (req,res)=>{
        console.log('Entrando a Store del productController');
        console.log('Va el req.file: ')
        console.log(req.file);
        console.log('Va req.files: ')
        console.log(req.files);
        console.log('Aca va el BODY: ')
        console.log(req.body);
        let colorArray = req.body.color;
        let sizesArray = req.body.sizes;
        if(!Array.isArray(req.body.color)) colorArray = [req.body.color];
        if(!Array.isArray(req.body.sizes)) sizesArray = [req.body.sizes];  
        let filenamesImgSec = [];
        for(let i =0; i < req.files.images.length; i++)filenamesImgSec.push(req.files.images[i].filename);
        let aCrear = {
            name: req.body.name,
            price: Number(req.body.price),
            description: req.body.description, 
            stars: 0,
            category: req.body.category,
            'img-pr': req.files.image[0].filename, 
            'img-se': filenamesImgSec
        };
        aCrear.colours = colorArray; 
        aCrear.sizes = sizesArray;
        console.log('aCrear: ');
        console.log(aCrear);
        productModel.create(aCrear);
        return res.redirect('/products'); 
    },
    
    edition: (req,res) => {
        let product=productModel.find(req.params.id);

        return res.render("products/productEdition", {product})
    },

    prodEdition: (req,res)=>{
      let products= productModel.find(req.params.id)
      let imgP = products['img-pr'];
      let imgSecArray = req.body.imgSec;
      if(!Array.isArray(req.body.imgSec)) imgSecArray = [req.body.imgSec];
      console.log('Aca va Files: ');
      console.log(req.files);
      if (req.files.image){
        fs.unlinkSync(path.join(__dirname,`../../public/images/products/${products['img-pr']}`))
        imgP = req.files.image[0].filename;
      }
      console.log('Aca va BODY: ');
      console.log(req.body);
      if (req.files.images){
        products['img-se'].forEach(img => {
            if ( ! imgSecArray.find( imagen => imagen ==  img) ){
                console.log("Elimina la imagen", img )
                fs.unlinkSync(path.join(__dirname,`../../public/images/products/${img}`))
            }
        });
        for(let i =0; i < req.files.images.length; i++) imgSecArray.push(req.files.images[i].filename);
      }
      let productBody={
        id: Number(req.params.id),
        name: req.body.name,
        price: Number(req.body.price) ,
        description: req.body.description ,
        category:products.category,
        colours: products.colours,
        sizes: products.sizes,
        stars: Number(products.stars),
        'img-pr': imgP,
        'img-se': imgSecArray
    };
      console.log(req.files);
      
     
       productModel.update(productBody);
       res.redirect("/products")
    },
    filter: (req,res)=>{ 
        const query = req.query; 
        const aFiltrar = Object.values(query);
        let filtrado;
        if (Object.keys(query)[0].indexOf('styles') == 0 ){ 
            filtrado = productModel.filterFroStyle(aFiltrar);
        }else{
            filtrado = productModel.filterForCategories(aFiltrar);
        }
        return res.render('products/productfilter',{productList: filtrado, Filtros: aFiltrar});
    },
    prodCart1: function(req,res){
        return res.render("products/productCart")
    },
    
    prodCart2: function(req,res) {
        return res.render("products/productCart2")
    },
    
    prodCart3: function(req,res) {
        return res.render("products/productCart3")
    },
    
    prodCart4: function(req,res) {
        return res.render("products/productCart4")
    },
    destroy: (req, res) =>{
        let product = productModel.find(req.params.id)
		fs.unlinkSync(path.join(__dirname,`../../public/images/products/${product['img-pr']}`))
		for(let i =0; i < product['img-se'].length ; i++){
            fs.unlinkSync(path.join(__dirname,`../../public/images/products/${product['img-se'][i]}`))
        };
        productModel.delete(req.params.id);
		res.redirect('/products');
    }
};

module.exports = productController;
