var submit = document.getElementById('submit_button');

		submit.onclick = function(){
			var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                 // register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                 // register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var name = document.getElementById('namc').value;
        console.log(name + "hi");
        var r_name = document.getElementById('namr').value;
        var email = document.getElementById('email').value;
        var phone_no = document.getElementById('phno').value;
        var year = document.getElementById('year').value;
        var address = document.getElementById('add').value;
        request.open('POST', '/create-company', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({name: name, r_name: r_name, email : email, phone_no: phone_no, year : year, address : address}));  
       // register.value = 'Registering...';
    
		};

 console.log("hi");
 var ab = document.getElementById('newone');
console.log(submit.value);