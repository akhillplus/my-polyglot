import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {  FacebookButton, 
          InstagramButton, 
          TwitterButton, 
          GoogleButton} from "./ProviderButtons";
import {
  PROVIDER_FACEBOOK,
  PROVIDER_INSTAGRAM, 
  PROVIDER_GOOGLE,
  PROVIDER_TWITTER
} from "./LoginRegister"

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    "& > *+*": {
      marginTop: theme.spacing(1)
    }
  }
});

class ProviderChoices extends Component {
  static propTypes = {
    login: PropTypes.bool,
    register: PropTypes.bool,
    onChoice: PropTypes.func,
    providers: PropTypes.arrayOf(PropTypes.string)
  };

  render() {
    const {
      classes,
      login,
      register,
      providers
    } = this.props;

    const commonProps = {
      login,
      register,
      // variant: 'contained',
      // color: 'primary',
      className: classes.button,
      onClick: this.handleClick
    };

    return (
          <Grid container direction='column'justify="space-between" spacing={1}> {/*className={classes.root}*/}
            <Grid item >
            <Grid container direction='row' justify="space-between" spacing={1} >
                <Grid item xs={6}>
                {providers.includes(PROVIDER_FACEBOOK) && <FacebookButton {...commonProps}/>}
                </Grid>
                <Grid item xs={6}>
                {providers.includes(PROVIDER_INSTAGRAM) && <InstagramButton {...commonProps}/>}
                </Grid>
            </Grid>
            </Grid>
            <Grid item>
            <Grid container direction='row' justify="space-between" spacing={1}>
                <Grid item xs={6}>
                {providers.includes(PROVIDER_TWITTER) && <TwitterButton {...commonProps}/>}
                </Grid>
                <Grid item xs={6}>
                {providers.includes(PROVIDER_GOOGLE) && <GoogleButton {...commonProps}/>}
                </Grid>
            </Grid>
            </Grid>
          </Grid>
    );
  }

  handleClick = providerId => {
    if (this.props.onChoice) {
      this.props.onChoice(providerId);
    }
  };
}

export default withStyles(styles)(ProviderChoices);
