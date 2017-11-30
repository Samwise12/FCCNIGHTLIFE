import React, { Component } from 'react';
import axios from 'axios';
import { Form, List, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import '../../scss/homepage.css';

const ListBars = (cache, props, method1, numGoing) => {// AppForm
  // console.log(props.isConfirmed)
  // console.log(numGoing);
  let x = [];
  for (let [index, thing] of cache.entries()) {
    // console.log('thing:',thing);
    // console.log(numGoing[index]);
    x.push(<List divided key={Date.now()+x.length}>
      <List.Item >
        <hr />        
          <List.Content id="move" floated="right">
          <Button primary onClick={
                      (e)=>{
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
  return (
    <div>{x}</div>
    )
  /*return (
    <List>
      <List.Item>
        <hr />
        <Image href={cache[0].url} rounded size='small' src={cache[0].image_url} />
        <List.Content>
          <List.Header >{cache[0].name}</List.Header>
          <List.Description>
          {cache[0].location.display_address[0]}, {cache[0].location.state}
          <br />
          {cache[0].display_phone}
          <br />
          Rating: {cache[0].rating}
          </List.Description>
        </List.Content>
        <hr />
      </List.Item>
    </List>
    )*/
}

class App extends Component {  //HomePage is container
    state = {
      loading: false,
      cache: undefined,
      table: undefined,
      numGoing: [],
      update: false
    }
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
      axios.post('/api/data/showGoing', { cache }).then(res => {
        console.log(res.data.getList);
        let callTable = ListBars(cache, this.props, this.method1, res.data.getList);
      this.setState({table: callTable, numGoing: res.data.getList})                
      })  
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
    // console.log(this.state)
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
  router: PropTypes.object.isRequired
}

export default App;
