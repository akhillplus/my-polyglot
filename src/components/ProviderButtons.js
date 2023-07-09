import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {darken} from '@material-ui/core/styles/colorManipulator'
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
// import {FacebookBox, Instagram, TwitterBox, Google} from "mdi-material-ui";
import FacebookSvg from '../images/LoginRegister/facebook.svg';
import InstagramSvg from '../images/LoginRegister/instagram.svg';
import TwitterSvg from '../images/LoginRegister/twitter.svg';
import GoogleSvg from '../images/LoginRegister/google.svg';
// import SvgIcon from '@material-ui/core/SvgIcon';

let FacebookBox = (props) => (
  <img src={FacebookSvg} alt='' {...props}/>
);

let Instagram = (props) => (
  <img src={InstagramSvg} alt='' {...props}/>
);

let TwitterBox = (props) => (
  <img src={TwitterSvg} alt='' {...props}/>
);

let Google = (props) => (
  <img src={GoogleSvg} alt='' {...props}/>
);

const providerColors = {
  instagram: {
    primary: '#fff' //'#24292e'
  },
  facebook: {
    primary: '#fff' //'#3b5998'
  },
  twitter: {
    primary: '#fff' //'#1da1f2'
  },
  google: {
    primary: '#fff' //'#4285F4'
  }
};

/*
Properties
base color
icon
button label
 */

export class ProviderButton extends Component {
  render() {
    const {
      classes,
      ProviderIcon, providerLabel,
      login, register,
      provider, // for instance tracking in tests
      ...restOfProps
    } = this.props;

    let label;
    if (login) {
      label = `${providerLabel}`
    }
    else if (register) {
      label = `${providerLabel}`
    }
    else {
      label = providerLabel;
    }

    return (
        <Button fullWidth={true}  {...restOfProps} variant="outlined" color="default"
        onClick={this.handleClick} classes={{
          root: classes.root
        }}
        >
          <ProviderIcon className={classes.leftIcon}/>
          {label}
        </Button>
    );
  }

  handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(this.props.provider);
    }
  }
}

function createProviderButton(provider, baseColor, icon, label) {
  const styles = theme => ({
    leftIcon: {
      width: "30px",
      height:"30px", 
      marginRight: theme.spacing(1)
    },
    root: {
      textTransform: 'capitalize',
      backgroundColor: baseColor,
      '&:hover': {
        backgroundColor: darken(baseColor, 0.2),
      }
    }
  });

  const inner = withStyles(styles)(ProviderButton);

  const component = class extends Component {
    static propTypes = {
      ...Button.propTypes,
      login: PropTypes.bool,
      register: PropTypes.bool,
      onClick: PropTypes.func
    };

    render() {
      return React.createElement(inner, {
        ProviderIcon: icon,
        providerLabel: label,
        provider,
        ...this.props
      })
    }

  };

  return component;
}

export const FacebookButton =
    createProviderButton("facebook", providerColors.facebook.primary, FacebookBox, "Facebook");
export const InstagramButton =
    createProviderButton("instagram", providerColors.instagram.primary, Instagram, "Instagram");
export const TwitterButton =
    createProviderButton("twitter", providerColors.twitter.primary, TwitterBox, "Twitter");
export const GoogleButton =
    createProviderButton("google", providerColors.google.primary, Google, "Google");
