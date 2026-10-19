const express = require('express');
const UserRouter = require('./router/UserRouter');
const ComponentRouter = require('./router/ComponentsRouter');
require('./connection')
const cors=require('cors');

const app = express();

const port = 5000;


// middleware
app.use(cors({
    origin:['http://localhost:3000']
}));


app.use(express.json());
app.use('/user', UserRouter);
app.use('/component', ComponentRouter);


// endpoint or route
app.get('/', (req, res) => {
    res.send ('respone from express');
});


app.get('/add',(req, res) =>{
    res.send('respose from add');
});


// getall
app.get('/getall',(req, res) =>{
    res.send('respose from getall');
});


// update
app.get('/update',(req, res) =>{
    res.send('respose from update');
});


// delete
app.get('/delete',(req, res) =>{
    res.send('respose from delete');
});


app.listen(port,() =>{
    console.log('server started');
    
});