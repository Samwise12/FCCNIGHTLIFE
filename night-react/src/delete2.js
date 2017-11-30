import express from 'express';
import yelp from 'yelp-fusion';

import Venue from '../models/Venue';
import authenticate from '../middlewares/authenticate';
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

/*Venue.find({id: req.body.cache[i].id})
  .then(venues => res.json({ venues }))*/

// console.log()

// console.log('route showGoing')
start().then(response =>
    res.status(200).json({ getList: arr })  //Get LIST IS THE ISSUE FIX /GOING TOMORROW!!!!!         
  ).catch(err => res.status(500).console.log(err) );

});

router.post('/going', authenticate, (req, res) => {
  const { id } = req.body.data.thing;
  // console.log(req.currentUser._id);
  // console.log(req.body)
  // console.log('id:', id);
  let arr = [];
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  };  

  const start = async () => {
      await asyncForEach(req.body.data.cache, async (num, i) => {
        await Venue.count({ id: req.body.data.cache[i].id }, (err, c) => {
          // console.log('count:', c)
          arr.push(c)
           // console.log(arr)
        });     

      })
      console.log('arr: ',arr);
    }
  Venue.findOne({"userId" : ObjectId(req.currentUser.id), "id": id})
    .then(response => {
     if(response){
      Venue.remove({ userId: req.currentUser.id, id: id })
          .then(res.status(200).json({ error: "can\'t vote twice" }) )
          // .then(
          //   start()
          //   )
          .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }))      
   } else if(!response) {
    Venue.create({ userId: req.currentUser.id, id: id })
      .then(venue => res.status(200).json({ venue: id }) )
      // .then(
      //   start()
      //   )
      .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));      
        }      
    });

});

export default router;
