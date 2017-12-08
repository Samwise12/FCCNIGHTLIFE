import React, { Component } from 'react';
import axios from 'axios';
import { Form, List, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import zipObject from "lodash/zipObject";
import findKey from "lodash/findKey";

import '../../scss/homepage.css';

const ListBars = (cache, props, method1, numGoing, userList) => {// AppForm
  console.log(props.isConfirmed)
  // console.log(userList);
  let x = [];
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
          <Button primary className={'but'+userList[index].toString()}
           /*id={'but'+userList[index].toString()+index}*/  onClick={
                      (e)=>{
                          let innerValue = document.body.children[1].children[0] //BRUTE FORCE METHOD!!!
                            .children[0].children[4].children[1].children[index]
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
                        } else {
        // method1(); // Changes page      
                        props.going(thing)
                        };
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
          <br />
          Rating: {thing.rating}
          </List.Description>
        </List.Content>
        <hr />
      </List.Item>
    </List>
    );
  }
  } else {
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
          <br />
          Rating: {thing.rating}
          </List.Description>
        </List.Content>
        <hr />
      </List.Item>
    </List>
    );
  };
  }; //end if-else
  return (
    <div>{x}</div>
    )
}

class App extends Component {  //HomePage is container
    state = {
      loading: false,
      cache: undefined,
      table: undefined,
      numGoing: [],
      update: false
    };
/*    componentDidMount(){
      this.props.userVenues()
    };*/
    componentDidUpdate(prevProps, prevState) {
      // console.log('update', this.state.update);
      const { table, cache/*, update*/ } = this.state;
      // console.log(prevProps.isConfirmed, this.props.isConfirmed)
      if(typeof table !== 'undefined' || 
         typeof cache === 'undefined') {
         if(prevProps.isConfirmed === this.props.isConfirmed) return;
         else if (typeof cache !== 'undefined') {
          // console.log(cache);
          axios.post('/api/data/showGoing', { cache }).then(res => {
            console.log('update 2');
            let callTable = ListBars(cache, this.props, this.method1, res.data.getList);            
            this.setState({table: callTable, numGoing: res.data.getList})
          });        
          let callTable = ListBars(cache, this.props, this.method1);
          return (
          this.setState({table: callTable})  
            )
          } else {
            return;
          }
      }
        // console.log('update')
        // console.log(cache);        
        // console.log(this.props.citeVenues)
      axios.post('/api/data/showGoing', { cache }).then(res => {//On Load
        // console.log(res.data.getList);
        this.props.userVenues(cache).then(response=> {
         // console.log(response.data.userList)
      let callTable = ListBars(cache, this.props, this.method1,
       res.data.getList, response.data.userList);
      this.setState({table: callTable, numGoing: res.data.getList})                        
        })        
      })/*.then(()=>
      this.props.userVenues(cache).then(res=> console.log(res.data.userList)) // axios.get('/api/data/userGoing')
      )  */
    };
    onSubmit = e => {
      e.preventDefault();
      this.setState({loading: true})
      const { locationName } = this.refs;// TEST AXIOS.GET SOMEOTHERTIME
      axios.post('/api/data', {locationName: locationName.value}).then(res =>{
        // console.log(res)
        this.setState({loading:false, cache: res.data.data});
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
  render() {
    // console.log(this.props.citeVenues)
    const { loading, table } = this.state;
    return (<div>
      <Form onSubmit={this.onSubmit} loading={loading} >
        <input autoFocus ref="locationName" type="text" placeholder="Search a location" />
        <input type="submit" defaultValue="enter"/>
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

export default connect(mapStateToProps)(App);
