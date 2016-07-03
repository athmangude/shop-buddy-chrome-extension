import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import Header from '../shopping-cart/header';

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

	header: {
		boxShadow: '0 0 0 transparent',
	}
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
	        		<Tab label="Account" value="account" icon={<AccountIcon color="#fff" />} >
			          	<div>
			            	<h2 style={styles.headline}>Account Info</h2>
			            	<p>
				            	Tabs are also controllable if you want to programmatically pass them their values.
				              	This allows for more functionality in Tabs such as not
				              	having any Tab selected or assigning them different values.
			            	</p>
			          	</div>
	        		</Tab>
	        		<Tab label="Transaction History" value="history" icon={<ListIcon color="#fff" />}>
	          			<div>
	        				<h2 style={styles.headline}>User Transaction History</h2>
	            			<p>
				              	This is another example of a controllable tab. Remember, if you
				              	use controllable Tabs, you need to give all of your tabs values or else
				              	you wont be able to select them.
	            			</p>
	          			</div>
	        		</Tab>
	      		</Tabs>
			</div>
    	);
  	}
}

export default AccountAndHistory;
