const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://pritamsalgaonkar:pritam999@cluster0.omp7ivl.mongodb.net/test", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use (
    function (req, res, next) {
        console.log ("inside GLOBAL MW");
        next();
  }
  );

app.use('/', route);

const assignmentMW= function (req, res, next) {
    var currentdate = new Date(); 
    var datetime =  currentdate.getDate() + " "
                    + (currentdate.getMonth()+1)  + " " 
                    + currentdate.getFullYear() + "  "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

    let ip= req.ip
    let url= req.originalUrl
    console.log(`${datetime}${ip}${url}`)
    res.send({datetime:datetime,ip:ip,originalUrl:url})
    next()    
}

app.use(assignmentMW)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});


