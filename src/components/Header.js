import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    pageHeader: "React.."
  };
  render(){
    return(
      <h2 className="text-center">
        {this.state.pageHeader}
      </h2>
    )
  }
}

Header.propTypes = {
  message: PropTypes.string
}

Header.defaultProps = {
	message: "......."
}

export default Header;
