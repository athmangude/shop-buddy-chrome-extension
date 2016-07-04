import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import moment from 'moment';

import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';


class Transaction extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let time = moment().subtract(7, 'days');
        let formattedTime = time.format('MMMM Do YYYY, hh:mm:ss');
        return (
            <Card>
                <CardHeader
                    title={`Cart #${Math.random(1000000, 100000000) * 10000000000000000}`}
                    subtitle={`${formattedTime}, (${time.fromNow()})`}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    <List>
                        <Subheader>Items In Cart</Subheader>
                        <ListItem
                            leftAvatar={<Avatar src="https://images-na.ssl-images-amazon.com/images/I/41YcmojSz4L._SS100_.jpg" />}
                            primaryText="Limited Edition Premium Leather Cover for Kindle Paperwhite"
                            secondaryText="Shipping"
                            secondaryTextLines={2}
                            disabled={true}
                        />
                        <ListItem
                            leftAvatar={<Avatar src="https://images-na.ssl-images-amazon.com/images/I/51vPHtoxctL._SS100_.jpg" />}
                            primaryText="Caseable Kindle and Kindle Paperwhite Case, It's in the Water"
                            secondaryText="In Transit"
                            secondaryTextLines={2}
                            disabled={true}
                        />
                        <ListItem
                            leftAvatar={<Avatar src="https://images-na.ssl-images-amazon.com/images/I/51v%2BJCXpGqL._SS100_.jpg" />}
                            primaryText="MoKo Case for Fire 7 2015 - Kids Shock Proof Convertible Handle Light Weight Super Protective Stand Cover for Amazon Fire Tablet (7 inch Display - 5th Generation, 2015 Release Only), BLUE"
                            secondaryText="Received"
                            secondaryTextLines={2}
                            disabled={true}
                        />
                    </List>
                </CardText>
            </Card>
        );
    }
}

export default Transaction;
