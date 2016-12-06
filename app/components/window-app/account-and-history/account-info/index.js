import React, { Component } from 'react';
import Header from './header';
import ShippingInfo from './shipping-info';

class AccountInfo extends Component {
  render() {
    return (
      <div>
        <Header {...this.props} />
        <ShippingInfo {...this.props} />
      </div>
    );
  }
}

export default AccountInfo;
