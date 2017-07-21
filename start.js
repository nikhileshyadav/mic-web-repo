var Users={}
	var fs=require('fs');
	var HTMLfile=fs.readFileSync('item.html').toString();
	var varifyData=function(data)
	{	var response={}
			if(!data.username.match(/^[a-zA-Z0-9_-]{3,20}$/))response.messageusername="Please Enter Correct Username!";
			if(!data.password.match(/^.{3,20}$/))response.messagepassword="Password length tooShort!";
			if(data.verify!=data.password)response.messageverify="Password Do not Match!";
			if(!data.email.match(/^[\S]+@[\S]+\.[\S]+$/))response.messageemail="Invalid Email Address!";
			if(!Object.keys(response).length)return true
			else return response
	}
	var getHTML=function(arg)
	{	var strng=HTMLfile;
		for(each in arg)
		{
			strng=strng.replace('%'+each.toLowerCase()+'%',arg[each]);
		}
		do{
			 a=strng.search('%');
			 s=strng.slice(++a);
			 t=s.search('%')+1;
			strng=strng.replace(strng.slice(a-1,a+t),'')
		}while(strng.search('%')>-1)
		
		return strng
	}
	fs.watch('item.html',function(){ HTMLfile=fs.readFileSync('item.html').toString();})
	
		var express = require('express');
		var bodyParser=require('body-parser')
		var app = express();

		app.use(express.static('Music'));
		app.use(bodyParser.urlencoded());
	
	app.get('/',function(req,res)
	{
		//res.redirect('http://google.com').end()
		res.end(getHTML())
	})
	app.get('/Welcome',function(req,res)
	{	console.log(req,res)
		res.setHeader('content-type','text/html')
		res.end("<h1> Welcome "+Users.haha.username+' !</h1> <br>'+JSON.stringify(Users[req.query.user]));
	})
	app.post('/',function(req,res)
	{	
		res.setHeader('content-type','text/html')
		var data=req.body;
		   varification=varifyData(data)
		if(varification==true)
		{	
			Users['haha']=data
			res.redirect('/Welcome');
		}
		else 
		{
			for(each in varification)
			{
				data[each]=varification[each]
			}
			res.end(getHTML(data))
		}
	})
	
var host = server.address().address
var port = process.env.PORT || 8080;
var server = app.listen(port, function () {

   

   console.log("Example app listening at http://%s:%s", host, port)
})

/////////////////////////////
	function HTMLescape(html)
	{	var escElements={
		'&':'&amp;',
		'>':'&gt;',
		'<':'&lt;',
		'"':'&quot;'
		}
		for (each in escElements)
		{
			html=html.replace(each,escElements[each]);
		}
		return html
	}
/////////////////////////////