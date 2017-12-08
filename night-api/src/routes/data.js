import express from 'express';
import yelp from 'yelp-fusion';

import Venue from '../models/Venue';
import authenticate from '../middlewares/authenticate';
import authNoUser from '../middlewares/authNoUser';
import parseErrors from "../utils/parseErrors";
// var ObjectId = require('mongodb').ObjectID;
import { ObjectId } from 'mongodb';

const router = express.Router();
// router.use(authenticate);

router.post('/', (req, res) => {
	// console.log('req:',req.body)
	// console.log('worked??');
  const { locationName } = req.body;
  	yelp.accessToken(process.env.YELP_CLIENT_ID, process.env.YELP_CLIENT_SECRET)
      .then(response => {
        // const accessToken = response.jsonBody.access_token;
        // console.log(accessToken);
        const client = yelp.client(response.jsonBody.access_token);
        // console.log(client)
    client.search({
    	term: 'bars',
    	location: 'New York, NY'//locationName
    }).then(response => {
   		// console.log(response.jsonBody.businesses)
      // console.log(req.body.locationName)
      res.status(200).json({data: response.jsonBody.businesses })
    });
      }).catch(err=> {console.log(err);});

	// res.status(200).json({success: 'success'})
});

router.post('/userGoing', authNoUser, (req, res) => {
  // console.log(req.body.data[0].id)
  // console.log(req.currentUser.id)
  // console.log('req.currentUser:', req.currentUser)
  if(!req.currentUser){
    res.status(200).json({message: 'noArrNecessary'})
  }

let arr = [];
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
};
const start = async () => {
  await asyncForEach(req.body.data, async (num, i) => {
    await Venue.count({ id: req.body.data[i].id, userId: req.currentUser.id }, (err, c) => {
      // console.log('count:', c)
      arr.push(c)
       // console.log(arr)
    });     
  })
  // console.log('arr: ',arr);
}  
start().then(response => {
  res.status(200).json({userList: arr})
}).catch(err => console.log(err));
/*  Venue.find({"userId" : ObjectId(req.currentUser.id)})
  .then(venues => {
    console.log('arr:',arr);
    res.json({ venues })}
    )  */

});

router.post('/showGoing', (req,res) => {
  // const { id } = req.body.cache[2]
  //console.log(req.body.cache[0].id)
   // console.log(req.body.cache)  
  let arr = [];
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
};
const start = async () => {
  await asyncForEach(req.body.cache, async (num, i) => {
    await Venue.count({ id: req.body.cache[i].id }, (err, c) => {
      // console.log('count:', c)
      arr.push(c)
       // console.log(arr)
    });     

  })
  // console.log('arr: ',arr);
}

// console.log('route showGoing')
start().then(response =>
    res.status(200).json({ getList: arr })  //Get LIST IS THE ISSUE FIX /GOING TOMORROW!!!!!         
  ).catch(err => console.log(err) );

});

router.post('/going', authenticate, (req, res) => {
  const { id } = req.body.data.thing;
  // console.log(req.currentUser._id);
  // console.log(req.body)
  // console.log('id:', id);
  Venue.findOrCreate({ id, "userId": ObjectId(req.currentUser.id) }, function(err, venue) {
    if(err) throw err;
    console.log('Found or Created: ', venue);
  });
    res.json({success: true}).end();
/*  Venue.findOne({"userId" : ObjectId(req.currentUser.id), "id": id})
    .then(response => {
     if(response){
      Venue.remove({ userId: req.currentUser.id, id: id })
          .then(res.status(200).json({ error: "can\'t vote twice" }) )
          .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }))      
   } else if(!response) {
    Venue.create({ userId: req.currentUser.id, id: id }) //test save()
      .then(venue => res.status(200).json({ venue: id }) )
      .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));      
        }      
    });*/

});

export default router;
