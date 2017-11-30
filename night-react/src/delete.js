var update = require('react-addons-update');
// var _ =  require('lodash');

let x =
	{
	  user: {
	    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlZnhreGJiQHNoYXJrbGFzZXJzLmNvbSIsImNvbmZpcm1lZCI6dHJ1ZSwiaWF0IjoxNTExNzQ4MTY5fQ.Vdhjt0WlbZ3Svwy3gTC_S9C6ukQvHxfHpk0oEc8dNyM',
	    email: 'hefxkxbb@sharklasers.com',
	    confirmed: true
	  },
	  venues: {
	    id: [
	      'the-dead-rabbit-new-york',
	      'a-b'
	    ]
	  }
	};

let y =	x.venues.id.filter((x)=> {
		return x !=='a-b';
	}) 
	

const d = update(x, {
	venues: {
		id: {$set: y}
	}
})


console.log(d);