var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
	secret : 'someRandomSecretValue',
	cookie : { kmaxAge: 1000 * 60 * 60 * 24 * 30},
	resave : true,
	saveUninitialized : true
}));

var config = {
  user:'srinithya-vutukuru',
  database: 'srinithya-vutukuru',
  host: 'db.imad.hasura-app.io',
  port: '5432',
  password: process.env.DB_PASSWORD
};



function createTemplate(data){
    var date=data.date;
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    var htmlTemplate=`
    <html>
        <head>
            <title>
                ${title}
            </title> 
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
           <link href="/ui/style.css" rel="stylesheet" />
        </head>
        
        <body>
		<div class = "container">
			<div class="center">
				<img id='madi' src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTrQfNoqk1HpN8-Mly0r03xY5Cl0v1WFGQ67wraKbKEsillvj0uqQ" class="img-big"/>
			</div>
			<hr/>
				<div class="content">
					<div class="center big bold">
						<a href="/">HOME</a> 
					</div>
					<hr/>
					<h3 class="center text-big bold">
						${heading}
					</h3>
					<div class="center text-big bold">
						${date.toDateString()}
					</div>
				
					<div >
					 
					  ${content}
						
					</div>
				</div>
			</body>
        </div>
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
    console.log("nithya");

  res.sendFile(path.join(__dirname,'ui','index.html'));

});
var pool = new Pool(config);
function hash(input,salt){
	//create hash
	var hashed = crypto.pbkdf2Sync(input , salt, 100000, 512, 'sha512');
	return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req, res){
	var hashedString = hash(req.params.input,"this-is-some-random-string");
	res.send(hashedString);
});
app.post('/create-user',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	if(username.length !== 0 && password.length > 6){
		var salt = crypto.randomBytes(120).toString('hex');
		var dbString = hash(password,salt);
	
		pool.query("SELECT * FROM `user` WHERE `username` = ?",[username],function(error,results,fields){ 
			if(err){res.status(500).send(err.toString());}
			else{
				if(results.length === 0){
			  		pool.query("INSERT INTO `user` (`username`, `password`) VALUES (?,?)",[username,dbString],function(error,results,fields){  	
				   	if(err){res.status(500).send(err.toString());}
				  	else{res.send("User success -- " + username);}
					});
			  	}else{res.status(403).send('invalid username/password');}
			}
		});
	}
	else{res.status(403).send('invalid username/password');}
});
app.post('/create-company',function(req,res){
  var namec = req.body.name;
  var namer = req.body.r_name;
  var phno = req.body.phone_no;
  var year = req.body.year;
  var email = req.body.email;
  var add = req.body.address;
  console.log(year);
  
 // connection.query("INSERT INTO `company` (`name`, `r_name`, `email`, `phone_no`, `year`, `address`) VALUES (?,?,?,?,?,?)",[namec,namer,email,phno
 //   ,year,add],function(error,results,fields){   
  pool.query("INSERT INTO `company` (`name`, `r_name`, `email`, `phone_no`, `year`, `address`) VALUES (?,?,?,?,?,?)",[namec,namer,email,phno,year,add],function(error,results,fields){   
  if(err){res.status(500).send(err.toString());}
  else{res.send(namec + " is successfully regestered !");
console.log(namec + " is successfully regestered !");}
  });
});
app.post('/login',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	pool.getConnection(function(err,connection){
	  	pool.query("SELECT * FROM `user` WHERE `username` = ?",[username],function(error,results,fields){  	
		   	if(err){res.status(500).send(err.toString());}
		  	else{
		  		if(results.length === 0){
		  			res.status(403).send('invalid username/password');}
		  		else{
		  			var dbString = results[0].password;
		  			var salt = dbString.split('$')[2];
		  			var hashpass = hash(password,salt);
		  			if(hashpass === dbString){
		  				req.session.auth = {userId:results[0].id};
		  				res.send('valid details');
		  			}
		  			else{res.status(403).send('invalid username/password');}	
		  		}
		}
	
  });

});
});
app.get('/check-login',function(req,res){
	if(req.session && req.session.auth && req.session.auth.userId){
	
			pool.query("SELECT * FROM `user` WHERE id =?",[req.session.auth.userId],function(err,results,fields){
				if(err){res.status(500).send(err.toString());}
				else{res.send(results[0].username);}
			});
	}
	else{res.status(400).send('You are not logged in');}
});
app.get('/logout',function(req,res){
	delete req.session.auth;
//	res.send('<html><body>Logged out!<br/><br/><a href="/">Back to home</a></body></html>');
	res.send('user logged out');
});




var names = [];
app.get('/submit-name', function (req, res) {//URL:/paras?para=bkxbk
  //get the name from request
  var name= req.query.name;
  names.push(name);
  //json converts objects into strings and vice versa
  res.send(JSON.stringify(names));
});






app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/Login-page', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Login.html'));
});
app.get('/ui/login.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.js'));
});

app.get('/ui/clist.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'clist.js'));
});
app.get('/ui/clist.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'clist.html'));
});
app.get('/ui/reg.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'reg.html'));
});
app.get('/ui/reg.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'reg.js'));
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`app listening on port ${port}!`);
  
});
//=========================
app.get('/bat/:page', function (req, res) {
	var page5=req.params.page;
  res.sendFile(path.join(__dirname, 'bat', page5));
});
app.get('/css/:page', function (req, res) {
	var page=req.params.page;
  res.sendFile(path.join(__dirname, 'css', page));
});
app.get('/fonts/:page', function (req, res) {
	var page1 = req.params.page;
  res.sendFile(path.join(__dirname, 'fonts', page1));
});
app.get('/images/:page', function (req, res) {
	var page2 = req.params.page;
  res.sendFile(path.join(__dirname, 'images', page2));
});
app.get('/js/:page', function (req, res) {
	var page3 = req.params.page;
  res.sendFile(path.join(__dirname, 'js', page3));
});
app.get('/less/:page', function (req, res) {
	var page4 = req.params.page;
  res.sendFile(path.join(__dirname, 'less', page4));
});
