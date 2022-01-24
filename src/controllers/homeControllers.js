const homeController = {
    
   index: (req,res) =>{
        return res.render("home1/home");
        },
   locals: (req,res) =>{
        return res.render("locals");
        },
   contact: (req,res) =>{
        return res.render("contact");
        },
     business: (req,res) =>{
          return res.render("empresa")
     }   
}

module.exports = homeController; 