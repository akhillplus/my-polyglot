import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import LangPair from './LangPair';
// import { Trans } from '@lingui/macro';
// import { I18n } from "@lingui/react";
import { i18n } from "@lingui/core";
// import { t } from "@lingui/macro";
// import { setupI18n } from "@lingui/core";

import { t, defineMessage, Trans } from "@lingui/macro";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Checkbox, FormControlLabel, Link} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { Button } from "@material-ui/core";
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ReverseIcon from '@material-ui/icons/Autorenew';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import green from '@material-ui/core/colors/green';

import withSnackbar from './withSnackbar';
import C from '../constants';
import { makeHalfPath, mixState, getFileExt } from '../lib/stringLib';

import {SearchSelect, SearchWordlistSelect, SortBySelect, DicSortingCriteria,
    LimitsSelect, OptionTooltip} from './ComboBoxes';
import {DataSheetView} from './Trees';
import {handleOn, defaultRejecter, downloadResolver, makeGetOptions} from '../lib/async';
import {modalLoading} from './ModalLoading';
import axios from '../lib/asyncRouts';

const styles = theme => ({
    // {
    //   const transition = {
    //     duration: theme.transitions.duration.shortest,
    //   };
      // return {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '0 24px 0 24px',
      },
      // checkedControl: {
      // fontSize: 20,
      // padding: 6,
      // color: green[600],
      // '&$checked': {
      //   color: green[500],
      // }},
    
      label: {
        fontSize: '1rem'
        },
    
      shrunk: {
        shrink: true
      },
    
      checked: {},
      button: {
        // color: green[600],
        '&:hover': {
          color: green[600]
        }
      },
      formControl: {
      margin: "8px 8px 8px 50px",//theme.spacing(2),
      // margin: '12px 0',  
      minWidth: 160,
      fontSize: '2rem',
      // width: '100%'
      },
      formControlExpansionPanelDetails: {
        // display: 'flex',
        // flexFlow: 'column',
        margin: 0, //theme.spacing(1),
        // margin: '12px 0',  
        // minWidth: 350,
        width: '100%'
        },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '66.66%',
        flexShrink: 0,
        marginLeft: 20
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
      expansionPanel: {
        margin: "16px 0",
        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
        //elevation1: 
        // margin: 5
      },
      serverInfoExpansionPanel: {
        boxShadow: "none",
        // backgroundColor: 'blue'
      },
      expansionPanelDetails: {
        // margin: '10px 0',
        // border: 'dotted',
        padding: '0px 12px 20px 24px'
      },
      pulledExpansionPanelDetails: {
        marginBottom: '12px',
        // border: 'dotted',
        padding: '0px 12px 8px 24px'
      },
      expansionPanelSummary: {
        root: {
          minHeight: '44px',
          '&$expanded': {
            //   margin: '12px 0',
            margin: '10px 0',
            },
     
        },
        content: {
          // display: 'flex',
          // flexGrow: 1,
          // transition: theme.transitions.create(['margin']/*, transition*/),
          margin: '10px 0',
          // '& > :last-child': {
          //   paddingRight: 32,
          // },
          '&$expanded': {
          //   margin: '12px 0',
          margin: '10px 0',
          },
        },
        // margin: '20px 0 20px 0'
      },
      inputFile: {
        display: 'none',
      },
      margin: {
        margin: theme.spacing(1),
      },
      cssLabel: {
        '&$cssFocused': {
          color: green[500],
        },
      },
      cssFocused: {},
      cssUnderline: {
        '&:after': {
          borderBottomColor: green[500],
        },
      },
      // reveseIconSize: {
        fontSizeLarge: {
          fontSize: 40,
        },
    
        tooltipStyle: {
          fontSize: 12,
        }
    });
    
// const filter = createFilterOptions();

// const i18n = setupI18n();
const nullDicNameObject = {id: 0, name: ''};
const ZERO_SUBSPECIALTY_VALUE = {value: 0, label: ''};

class WLTab2 extends Component 
{
    static propTypes = {
    };
    static defaultProps = {
        transitionTimeout: 1000,
    };

    constructor(props) {
        super(props);
    
        this.state = {
          // tab: props.tab,
          subspecialtyCache: [],
          dicCache: [],// props.wordlistCache[],
          // loading: false,
          dicNameObject: props.dicId ? 
          { id: props.dicId, name: props.dicName, path: props.dicHalfPath, items: props.dicItems,
            descr: props.dicDescription, subscrs: props.dicSubscrs}: nullDicNameObject,

            dicMinSubscriptions: props.dicMinSubscriptions, dicMinItems: props.dicMinItems,
            dicMaxSubscriptions: props.dicMaxSubscriptions, dicMaxItems: props.dicMaxItems,
            dicMinSize: props.dicMinItems, dicMaxSize: props.dicMaxSize  
          }
      }

      resolver = (attrib) => (object) => {
        //   console.log(object);
        let retObject = {};

        const stateAttrib = 
          attrib === 'dicName' ? 'dicCache': 
          attrib === 'dicSubspecialty' ? 'subspecialtyCache': 
          null;

        if (stateAttrib === null) return {message: 'stateAttrib'};

        if (object.hasOwnProperty('data')) {
            this.setState({ [stateAttrib]: object.data ? object.data: []});
            // if ( this.props.messenger) this.props.messenger(''/*, messageParams*/);
        }
        if (object.hasOwnProperty('message') && this.props.messenger)
        {
            let {message, messageParams} = object;
            this.props.messenger(message, messageParams);
            // this.setState({subspecialtyCache: object.subspecs});
        }
        return retObject;
      }

      handleChangeSpecialty = (event, newValue) => {
        let dicSpecialty = this.props.dicSpecialty;

        // this.props.messenger('newValue');

        if ( newValue && dicSpecialty !== newValue.value){
        // this.props.subspecsCache.get(
        //   {spec: newValue.value, ll: this.props.learnedLang, ml: this.props.motherLang}, 
        //     this.resolver.bind(this));
        this.props.onChangeSpecialtyFields("dicSpecialty", newValue.value);
        this.props.onChangeSpecialtyFields("dicSubspecialty", null);
        this.setState({subspecialtyCache:[], dicCache:[], dicNameObject: nullDicNameObject});
        this.props.onChangeSDic({},[]);
        }
      }

      // getFileExt = (fileName) => {
      //   return getFileExt(fileName);
      //   // return getFileExt(this.props.uDicIsSelected ? this.props.uDicPath : this.props.dicHalfPath);
      // }

      // getAltFileExt = (fileName) => {
      //   return getFileExt(fileName);
      //   // return getFileExt(!this.props.uDicIsSelected ? this.props.uDicPath : this.props.dicHalfPath);
      // }

      handleChangeName = (event, newValue) => {
        let dicNameId = this.state.dicNameObject.id;

        if (!newValue) newValue = nullDicNameObject;

        if ( dicNameId !== newValue.id){
          this.setState({dicNameObject:newValue});
          const path = newValue.path ? makeHalfPath(newValue.path, C.WL_PATH_DELIMITER): undefined;
        return axios(makeGetOptions('/download/stuff', 
          {spec: this.props.dicSpecialty, ll: this.props.learnedLang, ml: this.props.motherLang, path}))
        .then((res) => {
          const stuff = downloadResolver(res);
          window.sFileContent = stuff;
          this.props.onChangeSDic(newValue, mixState({}, stuff, getFileExt(path)));
        })
        .catch(defaultRejecter);
        }
      }

      handleOnOpenName = (event, newSubspecialtyValue) => {
        let { dicSpecialty, dicSubspecialty, wordlistCache } = this.props;
        if (newSubspecialtyValue !== undefined) dicSubspecialty = newSubspecialtyValue;
        if ( dicSpecialty/* && dicSubspecialty.length !== 0*/){
          return wordlistCache.get(
            {spec: dicSpecialty, ll: this.props.learnedLang, ml: this.props.motherLang,
             subspecs: dicSubspecialty.map(item => item.value)}
            )
            // .catch(defaultRejecter)
            .then(this.resolver('dicName'));
        }
        return Promise.resolve(0);
      }


      handleOnOpenSubspecialty = () => {
        let dicSpecialty = this.props.dicSpecialty;
        if ( dicSpecialty){
          return this.props.subspecsCache.get(
            {spec: dicSpecialty, ll: this.props.learnedLang, ml: this.props.motherLang}
            )
            .catch(defaultRejecter)
            .then(this.resolver('dicSubspecialty'));
        }
        return 0;
      }

      handleChangeDicSubspecialty = (event, newValue) => {
        this.props.onChangeSpecialtyFields("dicSubspecialty", newValue);

          this.handleOnOpenName(event, newValue)
          .then(() => {
            const cache = this.state.dicCache, dicNameId = this.state.dicNameObject.id;
          // if (newValue.length === 0) this.setState({dicNameObject: nullDicNameObject})
            if (cache.length === 0 || (dicNameId && !cache.find(item => item.id === dicNameId))) {
              this.setState({dicNameObject: nullDicNameObject});
              this.props.onChangeSDic({},[]);
              // this.props.onChangeSDic(newValue, mixState({}, stuff, getFileExt(path)));
            }
          })
        }
        
      filterDicNames = (item) => {
        const {dicFilterFields, dicMaxSize, dicMinSize, dicMaxItems, 
          dicMinItems, dicMaxSubscriptions, dicMinSubscriptions} = this.props;
        return dicFilterFields.reduce((prev, curr, index) => { 
          return prev && (!curr || (index === 0) ? (item.subscrs >= dicMinSubscriptions && item.subscrs <= dicMaxSubscriptions) :
          (index === 1) ? (item.items >= dicMinItems && item.items <= dicMaxItems) :
          (index === 2) ? (item.size >= dicMinSize && item.size <= dicMaxSize) : true)
        }, true)
      }

      render() {
        const {
            classes,
            learnedLang,
            motherLang,
            dicSpecialty,
            dicSubspecialty,
            dicMinSubscriptions, dicMinItems,
            dicMaxSubscriptions, dicMaxItems,
            dicMinSize, dicMaxSize,
            onMinMax, onCheckFilterFields,
            onLangPairChange,
            // specialtyFieldOptions,
            onChangeSpecialtyFields,
            dicFilterFields,
            dicSortBy
            } = this.props,
            {subspecialtyCache, dicCache, dicNameObject} = this.state;

        const dicNoneItemText = t`Not defined`;
        const specialtyFieldLabel = t`Specialty field`;
        const subspecialtyFieldLabel = t`Subspecialty fields`;
        const dicSortByLabel = t`Sort By`;
        const isLimitsApplied = dicFilterFields.reduce(
          (result, item) => {return result || item === true;}, false);
        const filterLimitsApplied = isLimitsApplied ? t`(applied)`: t`(not applied)`;
        const dicLimitsLabel = t`Filter Limits` + ' ' + filterLimitsApplied;

        const minNameText = 'Min', maxNameText = 'Max';
        const minLabel=t`Min`, maxLabel=t`Max`;
        let langsNotDetected = !learnedLang || !motherLang;
        this.specialtyFieldOptions = this.props.specFields.map(item => 
          ({ value: item.value, label: i18n._(item.label.id)}));
        let specialtyInputValue = this.specialtyFieldOptions
          .find(item => item.value === (dicSpecialty ? dicSpecialty : 0 )) || ZERO_SUBSPECIALTY_VALUE;
        // let dicNameValue = dicCache.find(item => item.id === dicNameObject.id) || dicNameObject;
        return (
            <div>
                <form autoComplete="on" /*onSubmit={handleSubmit}*/>

                <Grid
                container
                // spacing={2}
                // className={classes.demo}
                alignItems='flex-start'//"center" 
                // direction={direction}
                justify="space-around"//"space-between"
                >
                <Grid item xs={12} sm={12}>
                <LangPair revButtonEnabled={false} 
                lang1={learnedLang} lang2={motherLang} 
                langId1='learnedLang' langId2='motherLang' 
                noneItemText={dicNoneItemText}
                onChange={onLangPairChange}
                />
                </Grid>
                <Grid container 
                // spacing={2} 
                justify="space-between">
                {/* <TextField InputLabelProps={{ shrink: true }} label="Some label" /> */}
                <Grid item xs={7}>
                <SearchSelect
                id="dicSpecialty"
                autoSelect={true}
                options={this.specialtyFieldOptions}
                // defaultValue={this.undefinedSpecialty}
                value={specialtyInputValue}
                // styles={customStyles}
                onChange={this.handleChangeSpecialty.bind(this)}
                textFieldLabel={specialtyFieldLabel}
                getOptionLabel={option => option.label}
                // getOptionSelected={(option) => option.value === dicSpecialty}
                disableClearable={true}
                disabled={langsNotDetected}
                clearOnBlur={true}
                />
                </Grid>
                <Grid item xs={12}>
                <SearchSelect
                id="dicSubspecialty"
                autoSelect={true}
                disabled={langsNotDetected || !dicSpecialty || !specialtyInputValue}
                options={subspecialtyCache}
                // defaultValue={[]}
                value={dicSubspecialty ? dicSubspecialty:[]}
                multiple
                // value={subspecialtyCache.find(item => (item.value === dicSubspecialty))}
                onOpen={modalLoading(this.handleOnOpenSubspecialty.bind(this), this, 'subspecsLoading')
                  // () => {handleOn(this.handleOnOpenSubspecialty.bind(this), this.setWaitStatus('subspecsLoading').bind(this))}
                }
                onChange={this.handleChangeDicSubspecialty.bind(this)}
                textFieldLabel={subspecialtyFieldLabel}
                // getOptionLabel={option => option.label}
                // filterOptions={(options, params) => {
                //   return options;
                // }}
                loading={this.state.subspecsLoading}
                clearOnBlur={true}
                />
                </Grid>
                </Grid>
                <Grid item xs={12} sm={12}>
                <SearchWordlistSelect
                id="dicName"
                options={dicCache
                  .filter(this.filterDicNames.bind(this))
                  .sort(
                  DicSortingCriteria.find(item => item.value === dicSortBy).compFunc)}
                value={dicNameObject}
                onChange={this.props.onDicLoading(this.handleChangeName.bind(this))
                }
                onOpen={modalLoading(this.handleOnOpenName.bind(this), this, 'namesLoading')
                  // () => {handleOn(this.handleOnOpenName.bind(this), this.setWaitStatus('namesLoading').bind(this))}
                }
                loading={this.state.namesLoading}
                textFieldLabel={<Trans>Word list</Trans>}
                disableClearable={true}
                disabled={langsNotDetected || dicSpecialty === 0 || !dicSubspecialty || dicSubspecialty.length === 0}
                />
                </Grid>
                {/* <Grid item xs={12} sm={12}>
                <Grid container justify='space-between' alignItems='flex-end' */}
                {/* //  spacing={2} */}
                 {/* > */}
                <Grid item xs={4}>
                <SortBySelect 
                id="dicSortBy"
                autoSelect={true}
                textFieldLabel={dicSortByLabel}
                value={dicSortBy}
                onChange={this.props.onChangeDicSortBy.bind(this)}
                // multiple
                />
                </Grid>
                <Grid item xs={8}>
                  <DataSheetView labelText={dicLimitsLabel} 
                  onChange={onMinMax}
                  prefix='dic'
                  checkedItems={dicFilterFields}
                  onCheck={onCheckFilterFields}
                  data={[
                    {labelText: t`Subscriptions`, labelName: 'Subscriptions',
                      labelInfo: [{subLabel: minLabel, subName: minNameText, value: dicMinSubscriptions, ...C.subscriptionsMinProps},
                              {subLabel: maxLabel, subName: maxNameText, value: dicMaxSubscriptions, ...C.subscriptionsMaxProps}]
                    },
                    {labelText: t`Items`, labelName: 'Items',
                    labelInfo: [{subLabel: minLabel, subName: minNameText, value: dicMinItems, ...C.itemsMinProps},
                              {subLabel: maxLabel, subName: maxNameText, value: dicMaxItems, ...C.itemsMaxProps}]
                    },
                    {
                      labelText: t`Size`, labelName: 'Size',
                      labelInfo: [{subLabel: minLabel, subName: minNameText, value: dicMinSize, ...C.sizeMinProps},
                            {subLabel: maxLabel, subName: maxNameText, value: dicMaxSize, ...C.sizeMaxProps}]
                  },
                  ]} />
                </Grid>
                <Grid item xs={12} sm={3} style={{textAlign: "center"}}>

                {/* <Button size="small" className={classes.button} 
                component="span"
                onClick={() => {this.props.openModalMode({id:'id'});}}
                ><Trans>Search</Trans></Button> */}
                </Grid>
                </Grid>
                </form>
                </div>
                )
                }
}

export default withSnackbar(withStyles(styles)(WLTab2));
