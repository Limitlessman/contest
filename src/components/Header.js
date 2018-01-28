import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Header extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <h2 className="text-center">
        {this.props.message}
      </h2>
    )
  }
}
/*
const Header = ({ message }) => {
  return (
    <h2 className="Header text-center">
      {message}
    </h2>
  );
};
*/

Header.propTypes = {
  message: PropTypes.string
}

Header.defaultProps = {
	message: "......."
}

export default Header;
