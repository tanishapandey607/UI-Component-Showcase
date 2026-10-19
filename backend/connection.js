const mongoose = require('mongoose');
const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1","8.8.8.8"]);
const url = "mongodb+srv://tanishapandey607_db_user:tanisha@cluster0.axzm7h2.mongodb.net/mydb?appName=Cluster0"
// asynchronous function these function will run in bg it run a special type of orbit returns promise object 
mongoose.connect(url)

.then((result) => {
    console.log('database connected');
    
})

.catch((err) => {
    console.log(err);
});
