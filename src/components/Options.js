import React, { Component, useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core//ListItemText';
import ListSubheader from '@material-ui/core//ListSubheader';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/icons/Settings';
// import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import { Input, ListItemSecondaryAction, TextField}  from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, Tooltip } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import { i18n } from "@lingui/core";

import { t, defineMessage, Trans, Plural } from "@lingui/macro";
import {getPropsByPrefix} from '../lib/stringLib';

const dataRowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row nowrap",
  border: "0",
  width: '90px'
  // height: "40px",
  // borderBottom: "1px solid rgb(224, 224, 224)"
};
const useStyles = makeStyles( {
    customWidth: {
        '& div.MuiPaper-root': {
            // this is just an example, you can use vw, etc.
            width: '350px',
        }
    },
    inputRight: {
      textAlign: "right",
      fontSize:15
    }    
});

// function OptionsContent(props){
//   const [rowData, setRowData] = useState(props.rowData || []);
//   const containerStyle = props.containerStyle || {};
//   const editableTableStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//   }

//   function renderRow(dataRow, index) {
//     const dataRowStyle = {
//         width: "100%",
//         display: "flex",
//         flexFlow: "row nowrap",
//         border: "0",
//         // height: "40px",
//         // borderBottom: "1px solid rgb(224, 224, 224)"
//     };

//     return (
//         <div className="options-row" key={index} style={dataRowStyle}>
//             {this.state.colSpec.map((col) => (
//                 <div
//                     className={"options-cell " + col.fieldName}
//                     key={col.fieldName + index}
//                     style={{width: col.width}}
//                 >
//                     {this.renderInputField(col, index, dataRow)}
//                 </div>
//             ))}
//             {/* {this.renderRowButtons(index)} */}
//         </div>
//     )
// }

//   return (
//     <div className="options-container" style={containerStyle}>
//         <div className="options-editable-table" style={editableTableStyle}>
//             {/* {renderHeader()} */}

//             {rowData.map((dataRow, i) => (
//                 renderRow(dataRow, i)
//             ))}
//         </div>
//     </div>
// )
// }

export function OptionsButton(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();

    // get initialState() {
    //   return {
    //     anchorEl: null,
    //   };
    // }

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }
    
    const handleItemClick = (value) => () => {
    this.handleClose();
    }

    function handleClose() {
        setAnchorEl(null);
    }

    // const { classes,
    //     // interfaceLang 
    //     } = props;

    return (    <>
                <IconButton //className={classes.button} 
                aria-label="Options"
                onClick={handleClick.bind(this)}
                >
                <Icon />
                </IconButton>
                {/* <Menu open={Boolean(anchorEl)}
                onClose={handleClose.bind(this)}/> */}
                <Menu
                id="OptiondMenu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose.bind(this)}
                className={classes.customWidth}
                >
                  {Boolean(anchorEl) && <OptionsContent {...props} onAcceptClose={handleClose.bind(this) 
                  } classes={classes}/>
                }
                </Menu>
                </>
                );
}

// "oMethod": 0, // Rote learning, Mnemotechnics
// "oBatch": 50, // max=200
// "oTestLang": 0, // 0 - studied lang, 1 - mother lang
// "oWordRepeat": 3, // number of repeats
// "oAfterWordPause": 3000, // millisec
// "oCardMode": 0, // 0 - by meaning, 1 - by learned word, 2 - random
// // "oPronSource": 0, // 0 - synthesiser, 1 - Text-to-speech https://translate.google.com/translate_tts?ie=UTF-8&q=TEXT&tl=en&client=tw-ob
// // "oPronRate": 1/0.6, "oPronPitch: 0"


export class OptionsContent extends Component {
  constructor(props) {
    super(props);
    this.prefix = this.props.uDicIsSelected ? 'ouDic' : 'odic';
    this.numberOfLessonsName = this.prefix + 'NumOfLessons';
    this.numberOfBatches = this.props[this.numberOfLessonsName];
    this.state = this.initState;
    this.state.maxBatchSize = Math.ceil(props.items.length/this.numberOfBatches);
    this.state.isChanged = false;
    }

    get initState(){
      return getPropsByPrefix(this.props, this.prefix);
    }

    // classes = useStyles();

    handleChange = (event) => {
      // console.log(name, event.target.value)
      this.setState({ [event.target.name]: event.target.value, isChanged: true });
    };

    handleChangeNumber = (event) => {
      const { value, name, step, min, max } = event.target;
      const Value = parseInt(value, 10), Step = parseInt(step, 10),
        Min = parseInt(min, 10), Max = parseInt(max, 10);
      if (isNaN(Value)) return;
      if (Value > Max || Value < Min) return;
      this.setState({ [name]: Value, isChanged: true });
    }

    handleChangeDoubleInput = (event) => {
      const { value, name, /*step,*/ min, max } = event.target;
      const Value = parseInt(value, 10), //Step = parseInt(step, 10),
        Min = parseInt(min, 10), Max = parseInt(max, 10);
      if (isNaN(Value)) return;
      if (Value > Max || Value < Min) return;
      let state = {};
      if (name === this.numberOfLessonsName) { 
        state = { maxBatchSize: Math.ceil(Max/Value), [name]: Value};
      }
      else { // batch/lesson size is changed
        state = { maxBatchSize: Value, [this.numberOfLessonsName]: Math.ceil(Max/Value)}
      }
      this.setState({ ...state, isChanged: true });
    }

    onChange = this.handleChange.bind(this);
    onChangeNumber = this.handleChangeNumber.bind(this);
    onChangeDoubleInput = this.handleChangeDoubleInput.bind(this);

    render() {

    const OptionsArray = [
      {id: this.prefix + 'Method', label: defineMessage({message: 'Learning method'}),
       inputType: 'Select',
       values: [
        { value: 0, label: defineMessage({message: 'Rote learning'})},
        { value: 1, label: defineMessage({message: 'Mnemonics'})}], 
        onChange: this.onChange },
      {id: this.numberOfLessonsName, label: defineMessage({message: 'Split into'}),
       inputType: 'DoubleInput',
       values: [1, this.props.items.length, 1],
       onChange: this.onChangeDoubleInput,
      },
      {id: this.prefix + 'TestLang', label: defineMessage({message: 'Langauge of test'}),
      inputType: 'Select',
      values: [
        { value: 0, label: defineMessage({message: 'Studied language'})},
        { value: 1, label: defineMessage({message: 'Mother language'})}], 
        onChange: this.onChange },
      {id: this.prefix + 'WordRepeat', label: defineMessage({message: 'Number of repeats'}),
        inputType: 'Input',
        values: [0, 10, 1],
        onChange: this.onChangeNumber,
       },
       {id: this.prefix + 'AfterWordPause', label: defineMessage({message: 'Pause before next word'}),
       inputType: 'Input',
       values: [100, 10000, 100],
       onChange: this.onChangeNumber,
       },
// "CardMode": 0, // 0 - by meaning, 1 - by learned word, 2 - random
      {id: this.prefix + 'CardMode', label: defineMessage({message: 'Langauge of test'}),
      inputType: 'Select',
      values: [
        { value: 0, label: defineMessage({message: 'Studied language'})},
        { value: 1, label: defineMessage({message: 'Mother language'})}], 
        onChange: this.onChange },
// // "oPronSource": 0, // 0 - synthesiser, 1 - Text-to-speech https://translate.google.com/translate_tts?ie=UTF-8&q=TEXT&tl=en&client=tw-ob
// // "oPronRate": 1/0.6, "oPronPitch: 0"

       ];
        return <>
        <List dense sx={{ width: '100%', /*maxWidth: 360,*/ bgcolor: 'background.paper' }}
        subheader={
            <ListSubheader component="div" id="options-subheader">
              <Trans>Options</Trans>
            </ListSubheader>
          }
        >
    { OptionsArray.map(item => 
    { const id = item.id, value = this.state[id], 
      label = i18n._(item.label.id), inputType = item.inputType,
      onChange = item.onChange, values = item.values;
      // values = inputType === 'Select' ? values.map(i18n._(item.values;
      return (
        <ListItem
          key={`option-item-${id}`}
          // disablePadding
        >
        <ListItemText id={id} primary={label} />
        { inputType === 'Switch'? 
        <Switch edge="end"
          name={id}
          onChange={onChange}
          checked={value}
        //   inputProps={{
        //     'aria-labelledby': 'switch-list-label-bluetooth',
        //   }}
        />
        : inputType === 'Input' ?
        <Input edge='end' style={{ width: 100 }} type='number' value={value}
          name={id}
          inputProps={{ min: values[0], max: values[1], step: values[2] }}
          onChange={onChange}
          classes={{ input: this.props.classes.inputRight, }}/>
        : inputType === 'DoubleInput' ?
        <>
        <Input edge='start' style={{ width: 40 }} type='number' value={value}
          name={id}
          inputProps={{ min: values[0], max: values[1], step: values[2] }}
          onChange={onChange}
          classes={{ input: this.props.classes.inputRight, }}
          />
        <ListItemText primary={<Plural value={value} 
          zero=" lessons max of" one=" lesson of" few=" lessons max of" other=" lessons max of"/>}  />
        <Input edge='end' style={{ width: 50 }} type='number' value={this.state['maxBatchSize']}
          name={'maxBatchSize'}
          inputProps={{ min: values[0], max: values[1], step: values[2] }}
          onChange={onChange}
          classes={{ input: this.props.classes.inputRight, }}/>
        <ListItemText primary={<Plural value={this.state['maxBatchSize']} 
          zero=" items" one=" item" few=" items" other=" items"/>}/>
        </>
        : //inputType === 'Select' ?
        <Select edge='end'
        name={id}
        value={value}
        onChange={onChange}
        // inputProps={selectInputProps
        //     {
        // name: 'learnedLang',
        // id: 'learnedLang',
        // }
      //  }
        // align={learnedLangAlign}
        // disabled={disabled}
    >
    {values.map(
    (l, id) => (
        <MenuItem value={l.value} key={id}>{i18n._(l.label.id)}</MenuItem>
    ),
    this,
    )}
    </Select>}
        </ListItem>
    )})}
          </List>
     <Divider />
     <List>
      <ListItem>
      <ListItemText />
      <ListItemSecondaryAction><Button
        onClick={() => {this.props.onAcceptOptionChanges(this.state); 
        this.props.onAcceptClose(); this.setState({isChanged: false})}}
        disabled={!this.state.isChanged}
      >
        <Trans>Accept changes</Trans></Button></ListItemSecondaryAction>
      </ListItem>
      </List>
    </>
    }};
