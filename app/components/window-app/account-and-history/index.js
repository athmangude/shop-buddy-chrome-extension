import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import Header from '../../shopping-cart/header';
import TransactionHistory from './transaction-history';
import AccountInfo from './account-info';

import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import ListIcon from 'material-ui/svg-icons/action/list';

const styles = {
  	headline: {
    	fontSize: 24,
    	paddingTop: 16,
    	marginBottom: 12,
    	fontWeight: 400,
	},
	tabs: {
		paddingTop: 60,
	},

   tab: {
      color: 'white',
   },

	header: {
		boxShadow: '0 0 0 transparent',
	},
};


class AccountAndHistory extends Component {
  	constructor(props) {
    	super(props);
    	this.state = {
      		value: 'history',
    	};
  	}

  	handleChange = (value) => {
    	this.setState({
      		value: value,
    	});
  	};

  	render() {
    	return (
			<div>
				<Header appBarStyles={styles.header} />
            <Tabs
               style={styles.tabs}
               value={this.state.value}
               onChange={this.handleChange}
            >
               <Tab label="Account" value="account" style={styles.tab}>
                     <AccountInfo { ...this.props } />
               </Tab>
               <Tab label="Transaction History" value="history" style={styles.tab}>
                  <TransactionHistory { ...this.props } />
               </Tab>
            </Tabs>
			</div>
    	);
  	}
}

export default AccountAndHistory;
