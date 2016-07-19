import React, { Component } from 'react';

import Transaction from './transaction';

class TransactionHistory extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
            </div>
        );
    }
}

export default TransactionHistory;
