import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import moment from 'moment';
import numeral from 'numeral';
import Chip from 'material-ui/Chip';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import FileFolder from 'material-ui/svg-icons/file/folder';

import {grey400, blue300} from 'material-ui/styles/colors';


class Transaction extends Component {
    constructor(props) {
        super(props);
    }

    renderChip() {
        if (this.props.order.status) {
            return (
                <Chip
                    size={10} color={blue300}
                    backgroundColor={grey400}
                    style={{ margin: '0 5px', textTransform: 'upperCase', display: 'inline-flex', padding: 0, fontSize: 5, height: 20,  }}
                    labelStyle={{ fontSize: 10, lineHeight: 'inherit', }}
                >
                    {this.props.order.status}
                </Chip>
            );
        }
    }

    renderCartItems() {
        return this.props.order.cartItems.map(item => (
            <ListItem
                leftAvatar={<Avatar src={item.imageUrl} />}
                primaryText={item.title}
                secondaryText={`KES ${numeral(item.pricing.convertedTotalCost).format('0,0.00')}`}
                secondaryTextLines={2}
                disabled={true}
            />
        ))
    }

    render() {
        console.log(this.props.order);
        let time = moment(this.props.order.dateTime);
        let formattedTime = time.format('MMMM Do YYYY, hh:mm');
        return (
            <Card>
                <CardHeader
                    title={`Order: ${this.props.order._key}`}
                    subtitle={<span>{formattedTime} {this.renderChip()}</span>}
                    actAsExpander={true}
                    showExpandableButton={true}
                    titleStyle={{textTransform: 'upperCase'}}
                />
                <CardText expandable={true}>
                    <List>
                        <Subheader><strong>TOTAL: </strong>{numeral(Math.ceil(this.props.order.total)).format('0,0.00')}</Subheader>
                        {this.renderCartItems()}
                    </List>
                </CardText>
            </Card>
        );
    }
}

export default Transaction;
