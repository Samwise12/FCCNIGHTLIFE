import React, { Component } from 'react';
import axios from 'axios';
import { Form, List, Image, Button, Input, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import zipObject from "lodash/zipObject";
import findKey from "lodash/findKey";

import '../../scss/homepage.css';
import { locationSend } from '../../actions/venuesActions';

const ListBars = (cache, props, method1, numGoing, userList=[], reviews) => {// AppForm
  let x = [];
  // console.log(reviews)
  if(props.isConfirmed) {    
  let n1 = Object.keys(userList.filter(Number)).map(n => parseInt(n, 10));
  // console.log(Object.entries(userList))
  let m = Object.entries(userList).filter(num => num[1]);
  let m2 = m.map(m => parseInt(m[0], 10));
  let findIndex = zipObject(n1, m2);

  for (let [index, thing] of cache.entries()) {
    x.push(<List divided key={Date.now()+x.length}>
      <List.Item >
        <hr />        
          <List.Content id="move" floated="right">
          <Button primary className={'but'+userList[index]}//.toString() causing ERRORS!?!?
           /*id={'but'+userList[index].toString()+index}*/  onClick={
                      (e)=>{
/*                        console.log(
                          document.body.children[1].children[0]
                          .children[0].children[4].children[0].children[0]
                           .children[1].children[index]
                           .children[0].children[1].children[0]
                          )*/
                          /*let innerValue = document.body.children[1].children[0] //BRUTE FORCE METHOD!!!
                            .children[0].children[4].children[1].children[index]
                            .children[0].children[1].children[0];*/
                          let innerValue =
                          document.body.children[1].children[0]
                          .children[0].children[3].children[0].children[0]
                           .children[1].children[index]
                           .children[0].children[1].children[0];                          
                          let addValue = parseInt(innerValue.innerHTML[0],10)+ 1;
                          let subtractValue = parseInt(innerValue.innerHTML[0],10)- 1;
                        if(userList[index] === 1 && props.isConfirmed){
                          if(document.getElementsByClassName("ui button but1")[findKey(findIndex, o=> o === index )].id === "but1") {
                          document.getElementsByClassName("ui button but1")[findKey(findIndex, o=> o === index )].id = "but1b"
                          innerValue.innerHTML = addValue.toString()+' Going' 
                          setTimeout(function(){
                            document.getElementsByClassName("ui button but1")[findKey(findIndex, o=> o === index )].id = "but1b"
                          }, 5000)                         
                          } else {
                          document.getElementsByClassName("ui button but1")[findKey(findIndex, o=> o === index )].id = "but1"                            
                          innerValue.innerHTML = subtractValue.toString()+' Going'
                          }
                          // console.log(findIndex)
                          // console.log( findKey(findIndex, o=> o === index ) )
                        }
                        if(userList[index] === 0 && props.isConfirmed){                    
                          if(innerValue.id === 'but0') {
                            innerValue.id = 'but0b';
                            innerValue.innerHTML = subtractValue.toString()+' Going'
                          } else {
                          innerValue.id = 'but0'                            
                          innerValue.innerHTML = addValue.toString()+' Going'
                          }                          
                        }                        
                        if(props.isConfirmed) {
                          // console.log(numGoing)
                          let x = {thing, cache}
                        props.going(x) // addDestination Action
                        // method1();
                        } /*else {
        // method1(); // Changes page      
                        props.going(thing)
                        };*/
                      }
                    }>{numGoing[index]} Going</Button>              

          </List.Content>
        <Image href={thing.url} rounded src={thing.image_url} />  
        <List.Content>
            <List.Header >{thing.name}</List.Header>          
          <List.Description>
          {thing.location.display_address[0]}, {thing.location.state}
          <br />
          {thing.display_phone}
          <br /><br />
          <Button id='makeTransparent' icon='find' onClick={()=> {
            // console.log(index)
            props.getCenter(cache[index].coordinates, index)
            }
          } />
          <br /><br />
          <Rating icon='star' defaultRating={thing.rating} maxRating={5} disabled/>
          <br /><br />
          {reviews[index]}
          </List.Description>
        </List.Content>
        <hr />
      </List.Item>
    </List>
    );
  }
  } else { // Without Sign in
  for (let [index, thing] of cache.entries()) {
    x.push(<List divided key={Date.now()+x.length}>
      <List.Item >
        <hr />        
          <List.Content id="move" floated="right">
          <Button primary className={'but0'}
           /*id={'but'+userList[index].toString()+index}*/  onClick={
                      (e)=>{                        
                        if(!props.isConfirmed){                    
                            alert('Must Login')
                        }                        
                      }
                    }>{numGoing[index]} Going</Button>              

          </List.Content>
        <Image href={thing.url} rounded src={thing.image_url} />  
        <List.Content>
            <List.Header >{thing.name}</List.Header>          
          <List.Description>
          {thing.location.display_address[0]}, {thing.location.state}
          <br />
          {thing.display_phone}
          <br /><br />
          <Button id='makeTransparent' icon='find' onClick={()=> {
            props.getCenter(cache[index].coordinates, index)
            }
          } />          
          <br /><br />
          <Rating icon='star' defaultRating={thing.rating} maxRating={5} disabled/>
          <br /><br />
          {reviews[index]}
          </List.Description>
        </List.Content>
        <hr />
      </List.Item>
    </List>
    );
  };
  }; //end if-else
  return (
    <div id="display">{x}</div>
    )
}

class App extends Component {  //HomePage is container
    state = {
      loading: false,
      cache: undefined,
      table: undefined,
      numGoing: [],
      reviews: [],
      update: false,
      inputTxt: ''
    };
    componentDidUpdate(prevProps, prevState) {
      // console.log('update', this.state.update);
      const { table, cache, update } = this.state;
      // console.log(prevProps.isConfirmed, this.props.isConfirmed)
      // console.log('table:',table, 'cache:', cache)
      if( (typeof table !== 'undefined' || 
           typeof cache !== 'undefined') && 
         update === true) {
        console.log('update33')
            axios.post('/api/data/showGoing', { cache }).then(res => {//On Load
        this.props.userVenues(cache).then(response=> {
      let callTable = ListBars(cache, this.props, this.method1,
       res.data.getList, response.data.userList, this.state.reviews);
      this.setState({table: callTable, numGoing: res.data.getList, 
        reviews: this.state.reviews})                        
        })        
      })
      this.setState({update: false})
      };
      if(typeof table !== 'undefined' || 
         typeof cache === 'undefined') {
         if(prevProps.isConfirmed === this.props.isConfirmed) return; //for login changes
         else if (typeof cache !== 'undefined') {
          // console.log(cache);
          axios.post('/api/data/showGoing', { cache }).then(res => {
            console.log('update 2');
            let callTable = ListBars(cache, this.props, this.method1, res.data.getList, null, this.state.reviews);            
            this.setState({table: callTable, numGoing: res.data.getList, reviews: this.state.reviews})
          });        
          console.log('update66')
          /*let callTable = ListBars(cache, this.props, this.method1);
          return (
          this.setState({table: callTable})  
            )*/
          } else {
            return;
          }
      }
      axios.post('/api/data/showGoing', { cache }).then(res => {//On Load
        // console.log(res.data.getList);
        this.props.userVenues(cache).then(response=> {
         // console.log(response.data.userList)
         // console.log(this.state.reviews)
      let callTable = ListBars(cache, this.props, this.method1,
       res.data.getList, response.data.userList, this.state.reviews);
      this.setState({table: callTable, numGoing: res.data.getList, 
        reviews: this.state.reviews})                        
        })        
      })
    };
    onSubmit = e => {
      e.preventDefault();
      this.setState({loading: true})
      // const { locationName } = this.refs;// isn't showing ref
      // console.log(this.state.inputTxt)
      axios.post('/api/data', {locationName: this.state.inputTxt}).then(res =>{
        // console.log(res.data.regionCenter)
        this.props.getCenter(res.data.regionCenter);
        let locations = {};
        for (let i =0; i<res.data.data.length ;i++){
         // console.log(res.data.data[i].id) 
         locations[res.data.data[i].id] = res.data.data[i].coordinates;
         // res.data.data[i].id 
        }
        // console.log(locations)
        // console.log(res.data.data[0])
        let sendLocations = Object.entries(locations);
        this.props.locationSend(sendLocations)        

        this.setState({loading:false, cache: res.data.data, reviews: res.data.reviews, update: true});
      }).catch(err => {
        console.log(err);
        this.setState({loading: false});
      });
    };
    method1 = e => {
       // this.context.router.history.push("/login")       
const { cache } = this.state;       
axios.post('/api/data/showGoing', { cache }).then(res => {
        console.log(res.data.getList);
        let callTable = ListBars(cache, this.props, this.method1, res.data.getList);
      this.setState({table: callTable, numGoing: res.data.getList})                
      });         
    // this.setState({update: true})
    };
    onChange = e => {
      // console.log(e.target.value)
      this.setState({inputTxt: e.target.value })
    }
  render() {
    // console.log(this.props.citeVenues)
    const { loading, table } = this.state;
    // console.log(this.state.update)
    return (<div 
      style={{//border: "1px solid red",
       display: "flex"
     }}>
      <Form id="form1" onSubmit={this.onSubmit} loading={loading} >
        <Input id="searchbox" action={{icon: 'search'}}
        onChange={this.onChange}
         ref="locationName" type="text" placeholder="Search a location" 
         autoFocus fluid />
        {/*<Input type="submit" defaultValue="enter"/>*/}
      </Form>

      
      { table }
      

    </div>);
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired,
  citeVenues: PropTypes.func
}

function mapStateToProps(state) {
  return {
    citeVenues: state.venues
  }
}

export default connect(mapStateToProps, { locationSend })(App);
