import React, { Component } from 'react';
import { FormsyText } from 'formsy-material-ui/lib';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Formsy from 'formsy-react';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '25px 10px',
    width: '100%',
    height: 300,
  },
  inputField: {
    width: '100%',
  },
}

class ShippingInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
      submitting: false,
    };

    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
  }

  onLogoutTouchTapped() {
    this.props.authenticationActions.signOut();
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  submitForm(updatedShippingInfo) { // eslint-disable-line no-unused-vars
    this.setState({
      submitting: true,
    });
    this.updateShippingInfo(updatedShippingInfo);
  }

  notifyFormError(data) { // eslint-disable-line no-unused-vars
    // console.error('Form error:', data);
  }

  updateShippingInfo(updatedShippingInfo) {
    console.log(updatedShippingInfo);
    this.props.firebaseRefs.database.users.child(this.props.authentication.signedInUser.gplusProfile.id).update(updatedShippingInfo, (error) => {
      console.log(this.props);
      this.setState({
        submitting: false,
      });

      if (!error) {
        console.log('successfully updated');
        // this.props.authenticationActions.setGplusProfile(Object.assign({}, this.props.authentication.signedInUser.gplusProfile, updatedShippingInfo));
      } else {
        console.log('there was an error updating');
      }
    });
  }

  renderSubmit() {
    if (!this.state.submitting) {
      return (
        <RaisedButton
          label="Update"
          primary
          fullWidth
          type="submit"
          disabled={!this.state.canSubmit || this.state.submitting}
        />
      );
    }
    return (
      <CircularProgress style={{ margin: 'auto', display: 'block' }} />
    );
  }

  render() {
    // glus default cover image: https://lh3.googleusercontent.com/c5dqxl-2uHZ82ah9p7yxrVF1ZssrJNSV_15Nu0TUZwzCWqmtoLxCUJgEzLGtxsrJ6-v6R6rKU_-FYm881TTiMCJ_=w2048-h1152-n-rw-no
    return (
      <div style={styles.container}>
        <h3
          style={{
            fontWeight: 'lighter',
            fontSize: 20,
          }}
        >
          Shipping Information
        </h3>
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          onInvalidSubmit={this.notifyFormError}
        >
          <FormsyText
            name="phoneNumber"
            validations={{ isNumeric: true, minLength: 10, maxLength: 10, }}
            validationErrors={{ required: 'required', isNumeric: 'not a number', minLength: 'too short', maxLength: 'too long' }}
            required
            hintText="07XXXXXXXX"
            floatingLabelText="Phone Number"
            style={styles.inputField}
            value={this.props.authentication.signedInUser.gplusProfile.phoneNumber}
          />
          <FormsyText
            name="shippingAddress"
            validationErrors={{ required: 'required' }}
            required
            hintText="enter your shipping address"
            floatingLabelText="Shipping Address"
            style={styles.inputField}
            value={this.props.authentication.signedInUser.gplusProfile.shippingAddress}
          />
          {this.renderSubmit()}
        </Formsy.Form>
      </div>
    );
  }
}

export default ShippingInfo;
