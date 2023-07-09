import React from 'react'
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { withStyles/*, MuiThemeProvider, createMuiTheme */} from '@material-ui/core/styles';

import Langs from '../data/langs';

const styles = theme => ({	
    formControl: { 
        margin: "8px 8px 8px 16px",
        //theme.spacing(2), 
        // margin: '12px 0', 
        minWidth: 160, 
        fontSize: '2rem', // width: '100%' 
    },
});

// class LangSelect extends Component {

//     constructor(props){
//         super(props);
//         this.state = this.initialState;
//       }
  
//     get initialState() {
//         return {
//         };
//     }
  
//     render() {
function LangSelect(props){
        const { classes, langLabel, lang, selectInputProps, noneItem, onChange, disabled } = props;

        // console.log('lang :',lang);

        return (
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor={selectInputProps.id}>
        {langLabel}    
        {/* <Trans>Learned Language</Trans> */}
        </InputLabel>
        <Select
            value={lang}
            onChange={onChange}
            inputProps={selectInputProps
            //     {
            // name: 'learnedLang',
            // id: 'learnedLang',
            // }
           }
            // align={learnedLangAlign}
            disabled={disabled}
        >
        <MenuItem value={0}>
            <em>{noneItem}
            </em>
        </MenuItem>
        {Langs.map(
        (l, id) => (
            <MenuItem value={l.value} key={id}>{l.name}</MenuItem>
        ),
        this,
        )}
        </Select>
        </FormControl>
        )
    // }
}

LangSelect.propTypes = {
    classes:    PropTypes.object,
    // lang:       PropTypes.string, 
    selectInputProps: PropTypes.object.isRequired,
    // noneItem:   PropTypes.string,
    onChange:   PropTypes.func
};

export default withStyles(styles)(LangSelect);
