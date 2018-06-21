import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments.js";

class Header extends Component{

  renderContent(){
    switch (this.props.auth) {
      case null:
        return ;
      case false:
        return ( <li><a href="/auth/google"> Log in with Google </a></li> );
      default:
        return [
           <li key="1"><Payments /></li>,
           <li key="3" style={ {margin: "0 20px"} }>
            Credits: { this.props.auth.credits }
           </li>,
           <li key="2"><a href="/api/logout"> Logout </a></li>
        ];
    }
  }

  renderName(){
    switch (this.props.auth) {
      case null:
        return ;
      case false:
        return ;
      default:
        return <a className="brand-logo center">{this.props.auth.name}</a>;
    }
  }


  render(){
    return(
      <nav>
        <div className="nav-wrapper">
          <Link
          to={ this.props.auth ? "/surveys" : "/"}
          className="left brand-logo"
          >
            Emaily
          </Link>
          {this.renderName()}
          <ul className="right">
            { this.renderContent() }
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps) (Header);
