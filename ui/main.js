
function setContent(content, save) {
    if(save !== false) {
        contentChanges.push(content);
    }
    document.getElementById('login_form').innerHTML = content;
}
var submit = document.getElementById('submit_button');
submit.onclick = function(){
	var request = new XMLHttpRequest();
	//capture the responce
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE)
		{
			if(request.status === 200)
			{
				var names = request.responseText;
				names = JSON.parse(names);
				var list = '';
				for(var i=0;i<names.length;i++)
				{
					list += '<li>' + names[i] + '</li>';
				}
					//make a request and send the name
					//capture the response and display it as list 
	
				var ul = document.getElementById('namelist');
				ul.innerHTML = list;
			}
		}
	};
	//make a request
	var nameInput = document.getElementById('name');
	var name = nameInput.value;
	

	request.open('GET','/submit-name?name=' + name,true);
	request.send(null);
};
var subcom = document.getElementById('sub_button');
subcom.onclick = function(){
	var request = new XMLHttpRequest();
	//capture the responce
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE)
		{
			if(request.status === 200)
			{
				var para = request.responseText;
				para = JSON.parse(para);
				var list1 = '';
				for(var i=0;i<para.length;i++)
				{
					list1 += '<li>' + para[i] + '</li>';
				}
					//make a request and send the name
					//capture the response and display it as list 
	
				//var ul1 = document.getElementById('paragrap');
				//ul1.innerHTML = list1;
			}
		}
	};
	//make a request
	var paraInput = document.getElementById('comments');
	var paras = paraInput.value;
	request.open('GET','/paras?para=' + paras,true);
	request.send(null);
	
	
};
var request = new XMLHttpRequest();
	//capture the responce
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE)
		{
			if(request.status === 200)
			{
				var counter = request.responseText;
				console.log(counter);
				var number = document.getElementById('number');
				number.innerHTML = counter.toString();
			}
		}
	};
	//make a request
	request.open('GET','/counter',true);
	request.send(null);
/*
function loadLoginForm () {
    var loginHtml = `
        <h3>Login/Register to unlock awesome features</h3>
        <input type="text" id="username" placeholder="username" />
        <input type="password" id="password" />
        <br/><br/>
        <input type="submit" id="login_btn" value="Login" />
        <input type="submit" id="register_btn" value="Register" />
        `;
    document.getElementById('login_form').innerHTML = loginHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Sucess!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              loadLogin();
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.value = 'Logging in...';
        
    };
    
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.value = 'Registering...';
    
    };
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_form');
    loginArea.innerHTML = `
        <h3> Hi <i>${username}</i></h3>
        <a href="/logout">Logout</a>
    `;
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}
loadLogin();*/