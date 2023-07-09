import React, {Component} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {withFormsy, propTypes as formsyPropTypes} from 'formsy-react';
import PropTypes from 'prop-types';

class CheckboxField extends Component {

  static propTypes = {
    ...formsyPropTypes,
    // type: PropTypes.string,
    name: PropTypes.string,
    // label: PropTypes.string,
    className: PropTypes.string,
    // autoComplete: PropTypes.string,
    color: PropTypes.string
  };

  render() {
    const {
      name, className, autoComplete, color
    } = this.props;

    const textFieldProps = {
      name, className, autoComplete, color
    };

    return <Checkbox
        {...textFieldProps}
        value={this.props.getValue() || false }
        onChange={this.handleChange}
        // required={this.props.showRequired()}
        // error={this.props.showError()}
        // helperText={this.props.getErrorMessage()}
    />
  }

  handleChange = event => {
    this.props.setValue(event.target.checked); 
    // console.log('value=', event.target.checked);
  }
}

export default withFormsy(CheckboxField);
