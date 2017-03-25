
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

			var ul1 = document.getElementById('paragraph');
			ul1.innerHTML = list1;
		}
	}
};
//make a request
var paraInput = document.getElementById('comments');
var paras = paraInput.value;
request.open('GET','/paras?para=' + paras,true);
request.send(null);
