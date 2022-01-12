const fs = require('fs');
const path = require('path');

const modelController =function(name){ 
    console.log('entre al model de Users'); 
    
    return {
        tablePath: path.resolve(__dirname, `../data/${name}.json`),

        readFile: function () {
            let tableContents = fs.readFileSync(this.tablePath, 'utf-8'); //leo 
            const table = JSON.parse(tableContents); // lo paso a JS
            return (table.length > 0 ? table : [] );
        },

        writeFile: function (contents) {
            let tableContents = JSON.stringify(contents, null, ' '); // lo paso a JSON
            fs.writeFileSync(this.tablePath, tableContents); // paso tableContentes al DataBase
        },
        all:function(){
            return this.readFile();
        },
        nextId: function () {
            let users = this.readFile();
            let nextID = users.length;
            return (nextID ? ++nextID : 1);
        },
        
        find: function (id) {
            let users = this.readFile();
            return users.find(i => i.id == id);
        },

        create: function (user) {
            let users = this.readFile();
            user.id = this.nextId();
            users.push(user);
            this.writeFile(users);// lo guardo 
            return user.id;
        },

        update: function (user) {
            let users = this.readFile(); 
            let update = users.map( u =>{
                (u.id == user.id ? user : u);  
            });
            this.writeFile(update); // lo guardo 
            return user.id; 
        },

        delete: function (id) {
            let users = this.readFile();
            let updated = users.filter( u => u.id != id);
            this.writeFile(updated); // lo guardo 
        }
    }
};


module.exports = modelController;