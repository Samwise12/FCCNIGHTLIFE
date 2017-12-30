/*eslint-disable no-unused-vars*/
import React, {Component} from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import shouldPureComponentUpdate from "react-pure-render/function";
import GoogleMapReact from 'google-map-react';
import AnyReactComponent from '../pages/HomePage';
import { Popup } from 'semantic-ui-react';
/*class AnyReactComponent extends Component  {
  static defaultProps = {
    text: ""
  }
render() {
  return (
  <div className="AnyReactComponent">
    <img src="images/img1.png" alt="" />
    a
  </div>
    )
}
}*/

class SimpleMap extends Component {
  constructor(props) {
  super(props);
  this.state = {
   center: [40.7295104447158, -74.0006693438721],
   zoom: 13,
   spots: [],
   updateHandler: true
 };
  }
static defaultProps = {
    center: [],
    zoom: 13,
    spots: {},
    error: ""
  }  
  createMapOptions( maps ) {
    return {
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_LEFT
      },
      mapTypeControl: true,
      StreetViewPanorama: true
    };
  }
/*  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    let arr = [];
    for(let [index,i] of this.props.Lamb.entries()) {
      // console.log(i[0])
      // arr.push(i[1])
      // console.log(index)
    arr.push(<AnyReactComponent
            key={index}
            lat={i[1].latitude}
            lng={ i[1].longitude }
            text={ i[0].toString() }
          /> )     
    }
    this.setState({spots: arr})
  };*/
  componentDidMount() {
    // console.log('sadf')
    // console.log(this.props.Lamb[0][1])
     let arr = [];
    for(let [index,i] of this.props.Lamb.entries()) {
      // console.log(i[0])
      // arr.push(i[1])
      // console.log(index)
    arr.push(<AnyReactComponent
            key={index}
            lat={i[1].latitude}
            lng={ i[1].longitude }
            text={ i[0].toString() }
          /> )     
    }
    // console.log(arr)
    this.setState({spots: arr, updateHandler:false })
  }
  shouldComponentUpdate = shouldPureComponentUpdate;
  
  // _onChange({center, zoom}) {
  //   // console.log('asdf',center, zoom)
  //   // this.setState({ center: center, zoom: zoom})
  // }
	render() {
    // console.log(this.props)
    // console.log(this.props.Lamb[0][1])
    // const { zoom } = this.props;
    const { center, updateHandler } = this.state;
    // console.log(center)
    if(updateHandler === true) {
      var x = this.state.spots;
    } else if(updateHandler === false) {
      x = this.props.spots
    }
    if( center == null ) return (<div></div>);
    return (
        <GoogleMapReact
          // center={[this.props.Lamb[0][1].latitude,this.props.Lamb[0][1].longitude]}
          center={this.props.centerRegion}
          zoom={ this.state.zoom }
          bootstrapURLKeys={ { key: 'AIzaSyDyOwJkIZp2DMvAbkD-ldUyy0nXvD2zSic' } }
          options={ this.createMapOptions }
          // defaultCenter={{lat:40.7295104447158, lng:-74.0006693438721} }
          // onChange={this._onChange}
          // resetBoundsOnResize = {true}
          >          

          {x}
{/*          <AnyReactComponent
            lat={ 40.7295104447158 }zzzzzzzzzzzzzzzzzzzz
            lng={ -74.0006693438721 }
            text={ 'sadf?' }
          />*/}
        </GoogleMapReact>
    );
  }
}

/*SimpleMap.defaultProps = {
    center: {},
    zoom: 14,
    spots: {},
    error: ""
  }*/

function mapStateToProps(state) {
  return {
    Lamb: state.venues
  }  
}

export default connect(mapStateToProps)(SimpleMap);


