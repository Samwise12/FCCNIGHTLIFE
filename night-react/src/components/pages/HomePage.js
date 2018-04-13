import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Grid, Popup } from 'semantic-ui-react';

import * as actions from '../../actions/auth';
import * as userActions from '../../actions/venuesActions';
import AppPage from './AppPage';
import DisplayMap from '../forms/DisplayMap';
import TopNavigation from '../forms/TopNavigation';

export class AnyReactComponent extends React.Component {
  static defaultProps = {
    text: ''
  }
  render() {
    // console.log(document.getElementsByClassName('AnyReactComponent'))
    return(
  <div className="AnyReactComponent">
  <Popup 
    id="test1"
    trigger={<img ref={img => this.imgElement = img} onClick={
      ()=> this.props.method2([this.props.lat,this.props.lng])
  } 
    src="images/bar_icon.png" alt="" /> }
    content = {this.props.text}
    on={['hover', 'click']}
  />
  </div>
      )
  }
};

class HomePage extends React.Component {
  state = {
    width: 100,
    height: 400,
    handler: false,
    center: [],
    spots: []
  };
  // componentDidMount(){
  // console.log(window.innerWidth)
    // console.log(document.getElementById('showborder2') )
    // document.getElementById('showborder2').setAttribute("style", "width: 50% ;")
   // window.addEventListener("resize", this.updateDimensions.bind(this));
  // };
  method2(e){    
    console.log(e)
    this.setState({center: e})
  };
  componentWillReceiveProps(nextProps) {
    // console.log(!!nextProps.stuff)
    // console.log(nextProps.Lamb[0][1])
    // console.log(nextProps.stuff)
    let arr = [];
    if(nextProps.stuff.length>0) {
      for(let [index,i] of nextProps.stuff.entries()) {    
      arr.push(<AnyReactComponent
              key={index}
              lat={i[1].latitude}
              lng={ i[1].longitude }
              text={ i[0].toString() }
              method2={this.method2.bind(this)}
            /> )     
      }

       this.setState({handler: !!nextProps.stuff, spots: arr})      
    }
  };
  updateDimensions(){
    // console.log(window.innerWidth)
    if (window.innerWidth < 1200) {    }
    };
  getCenter = (e, index) => {
    // console.log(index);
    // let longitude = e.longitude, latitude = e.latitude;
    let arr = [e.latitude,e.longitude];
    this.setState({center: arr }, 
      ()=> {
        if(document.getElementsByClassName('AnyReactComponent')[index]) {
          setTimeout(function() {
        document.getElementsByClassName('AnyReactComponent')[index].children[0].click()
          }, 200);
        };
      });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }    
  going = e => this.props.addDestination(e);
  userVenues = e => this.props.userGoing(e);
  render() {
    const {isAuthenticated, isConfirmed } = this.props;
    // const {width, height} = this.state;
    // console.log(this.props)
    // console.log(!!this.props.stuff)
    const logging = isAuthenticated ? ( 
          <button onClick={() => this.props.logout()}>Logout</button> 
          ) : (
            <div><Link to="/login">Login</Link>  
            {' '} &nbsp; {' '}
            <Link to="/signup">Sign Up</Link></div>
          );
    return(
      <div /*id="homepage"*/ >
        <TopNavigation logging={logging} />
{/*        { isAuthenticated ? ( 
          <button onClick={() => this.props.logout()}>Logout</button> 
          ) : (
            <div><Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link></div>
          )}*/}

          <br/><br/>
          <Grid  columns='2' >
            <Grid.Column className="showborder" width={8}>
              <AppPage going={this.going} isConfirmed={isConfirmed}
               userVenues={this.userVenues} getCenter={this.getCenter}/>
            </Grid.Column>
            <Grid.Column id="showborder2" width={8} floated='right' >
              <div /*id='mapMove'*/ style={{width: '100%', height: '640px'}}>
              {this.state.handler && <DisplayMap spots={this.state.spots} centerRegion={this.state.center}/>}
              </div>
            </Grid.Column>
          </Grid>
      </div>
      )
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  addDestination: PropTypes.func.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  userGoing: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    isConfirmed: !!state.user.confirmed,
    stuff: state.venues
  }
}

export default connect(mapStateToProps, { 
 logout: actions.logout,
 addDestination: userActions.addDestination,
 userGoing: userActions.userGoing
  })(HomePage);


