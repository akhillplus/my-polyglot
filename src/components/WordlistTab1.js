import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LangPair from './LangPair';
import { t, Trans } from '@lingui/macro';
import { i18n } from "@lingui/core";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Checkbox, Link} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { Button } from "@material-ui/core";
//import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import ReverseIcon from '@material-ui/icons/Autorenew';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Typography from '@material-ui/core/Typography';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import green from '@material-ui/core/colors/green';
// import { useTheme } from '@material-ui/core/styles';

import {SearchSelect, OptionTooltip} from './ComboBoxes';
import withSnackbar from './withSnackbar';
import {defaultRejecter, defaultFinally, delay} from '../lib/async';
import {modalLoading} from './ModalLoading';
import { DisableBlock } from './CustomElements';

import { detectLanguage} from '../lib/gt';
import { getFileExt, isDemoMode } from '../lib/stringLib';

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
      paddingLeft: 10,
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
          // '&$disabled': {
          //   backgroundColor: 'white'
          // }
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
      disabled: {
        backgroundColor: 'white'
      }
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
      },
  });
  
const filter = createFilterOptions({
  matchFrom: 'start',
  trim: true,
  limit: 100

  // stringify: option => option.title,
});

const ZERO_AUTOCOMPLETE_VALUE = {value: 0, label: ''};
const ZERO_SPECIALTY_VALUE = ZERO_AUTOCOMPLETE_VALUE;
const ZERO_SUBSPECIALTY_VALUE = ZERO_AUTOCOMPLETE_VALUE;

class WLTab1 extends Component 
{
    static propTypes = {
        transitionTimeout: PropTypes.number,
        // tab: PropTypes.number,
      };
    static defaultProps = {
        transitionTimeout: 1000,
    };

    constructor(props) {
        super(props);
        this.specialtyFieldOptions = this.props.specFields.map(item => 
          ({ value: item.value, label: i18n._(item.label.id)}));

        this.state = this.initialState;
        // this.refSearchSelect = React.createRef();
      }
  
    get initialState() {
      return {
          zeroSubspecialty: undefined,//null, //{value: 0, label: '' },
          subspecialtyCache: [], //this.props.subspecsCache,
          uDicSubspecialty: 0, //this.props.uDicSubspecialty,
          uDicSubspecialtyValue: ZERO_SUBSPECIALTY_VALUE,//{value: 0, label: ''},
          // uDicSubspecialtyValueInputValue: '',
          // specialtyInputValue: null, 
          specialtyInputValue: this.specialtyFieldOptions.find(item => item.value === this.props.uDicSpecialty),
          loading: false,
          uploading: 0,
          uDicAgreed: false,
          uDicName: this.props.uDicName, 
          uDicDescription: this.props.uDicDescription,
          uDicUrl: null,
          // uDicPath: this.props.uDicPath,
          errors: []
          // uploadPath: ''
        }
      }

      clearErrors(id = null){
        let errors = this.state.errors;
        if (id) errors[id] = false;
        else errors = [];
        this.setState({errors});
      }

      handleChangeAgreed = (event) => {
        this.setState({uDicAgreed: event.target.checked});
      }

      resolver = (object) => {
        let retObject = {};
        if (object.hasOwnProperty('data'))
        {
          let subspecialtyCache = object.data ? object.data: [];
          if (!object.url && !object.url 
              && subspecialtyCache.length === 0 
                && this.state.uDicSubspecialtyValue === ZERO_SUBSPECIALTY_VALUE)
          retObject.message = 'info.subspecs.noItemsAvailable';
            this.setState({subspecialtyCache});
            retObject.uDicSubspecialty = object.subspec;
            if (object.url) { 
              retObject.uDicUrl = object.url; this.setState({ uDicUrl: object.url});
            }
        }
        // else if (object.hasOwnProperty('message'))
        // {
        //     let {message, messageParams} = object;
        //     if (messenger) messenger(message, messageParams);
        //     else throw message;
        // }
        return retObject;
      };

      // setLoadStatus = flag => { this.setState({loading: flag})};

      // setUploadStatus = flag => { 
      //   if (flag) this.props.openModalMode({id:'circularIndeterminate'});
      //   else this.props.closeModalMode();

      handleChangeSpecialty = (event, newValue) => {
        // this.setState({specialty: newValue.value});

        let uDicSpecialty = this.state.uDicSpecialty;
        if ( newValue && uDicSpecialty !== newValue.value){
          // this.props.subspecsCache.get(newValue.value, 
          // {spec: newValue.value, ll: this.props.learnedLang, ml: this.props.motherLang}, 
          // this.setWaitStatus.bind(this)).then(this.resolver);
        this.setState({
          uDicSpecialty: newValue,
          zeroSubspecialty: undefined,
          uDicSubspecialty: 0,      
          uDicSubspecialtyValue: ZERO_SUBSPECIALTY_VALUE,
          subspecialtyCache:[],
          uDicAgreed: false,
          uDicUrl: null,
          specialtyInputValue: this.specialtyFieldOptions.find(item => item.value === newValue.value)
        });
        // this.handleChangeSpecialtyValue(newValue.value);
        // document.getElementById('uDicSubspecialty').value = '';

        this.props.onChangeSpecialtyFields("uDicSpecialty", newValue.value);
        // this.props.onChangeSpecialtyFields("uDicSubspecialty", null);
        // this.setState({subspecialtyCache:[]})
        }
      };

      setSubspecialtyValue = (specs, value, label) => {
        return specs ? 
            specs.find(item => item.value === value) : {value: 0, label: label};
      }

      handleOnOpenSubspecialty = () => {
        let { uDicSpecialty, learnedLang, motherLang } = this.props;
        if ( uDicSpecialty){
          return this.props.subspecsCache.get(
            {spec: uDicSpecialty, ll: learnedLang, ml: motherLang}
            // ,this.setWaitStatus.bind(this)
            )
            .catch(defaultRejecter) // ajax common server error responses handling
            .then(this.resolver)
            .then(defaultFinally.bind(this))
            // .catch((err) => { console.log(err);});
        }
         return 0;
      }

      handleChangeSubspecialty = (event, newValue) => {
        if (!newValue) return; //newLabel = null;

        const specs = this.state.subspecialtyCache;
        const newLabel = ('inputValue' in newValue) ?  
            newValue.inputValue.trim() : newValue.label !== '' ? newValue.label : undefined;
        
        if (!newLabel) return; 

        // let newZeroObject = {value: 0, label: ('inputValue' in newValue) ? newLabel: ''};
        let newZeroObject = 'inputValue' in newValue ? {value: 0, label: newLabel} : undefined;
        let sValue = this.setSubspecialtyValue(specs, newValue.value, newLabel);

        if (sValue === undefined) sValue = newZeroObject;

        this.setState({
            zeroSubspecialty: newZeroObject, 
            uDicSubspecialty: newValue.value,
            uDicSubspecialtyValue: sValue,
            uDicUrl: null
          });
        };

        // handleChangeSpecialtyValue(value){
        // let specialtyInputValue = this.specialtyFieldOptions.find(item => item.value === value);
        //   this.setState({specialtyInputValue});
        // }

        handleProgress(progressEvent){
        let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
        this.props.openModalMode({id:'circularWithValue', value: percentCompleted, message: t`Uploading…`});
        // this.setState({uploading: percentCompleted});
        }

        handleFileUpload(){
          const { learnedLang, motherLang, uDicSpecialty, 
                  uDicName, uDicDescription, uDicPath} = this.props;
          const { uDicSubspecialtyValue } = this.state;
          let errors = [], newSubspecialty = uDicSubspecialtyValue.value === 0;
          const errorIds = ['uDicName', 'uDicDescription', 'uDicSubspecialty'];
          return Promise.all([
            detectLanguage(uDicName),
            delay(400).detectLanguage(uDicDescription),
            newSubspecialty ? delay(800).detectLanguage(uDicSubspecialtyValue.label) : 
                Promise.resolve(motherLang)
            ])
            .catch(() => {throw Error('detectLanguage');})
            .then(values => {
              let anyErrors = values.reduce(
              (result, item, idx) => 
              {let e = /*idx !== 1 &&*/ item !== motherLang; errors[errorIds[idx]] = e; 
                return result || e;
              }, false);
              if (anyErrors === true) {
                if (newSubspecialty && (errors[errorIds[0]] || errors[errorIds[1]]))
                  errors['uDicSubspecialty'] = true;
                this.setState({errors});
                throw Error('motherLanguageNeeded');
              }
              else {
                return this.state.uDicUrl; // due to previous request for upload
              }
          })
          .then((assignedUrl) => {
          let sspec = parseInt(uDicSubspecialtyValue.value);
          let object = { spec: uDicSpecialty, ll: learnedLang, ml: motherLang, 
            subspec: sspec, title: uDicName, file_ext: getFileExt(uDicPath)};
          
          if (assignedUrl) {  // url has been already assigned
            object.uDicUrl = assignedUrl;
            object.uDicSubspecialty = sspec;
            return object;
          };

          if (newSubspecialty) object.name = uDicSubspecialtyValue.label;
          
          return this.props.subspecsCache.get(object) 
              .then(this.resolver);
          })
          .then((o) => {
            console.log(o);
            if (o.uDicUrl) {
              let subspec = o.uDicSubspecialty;
              return this.props.onFileUpload(
                { uDicName, uDicDescription, uDicSpecialty, 
                  uDicSubspecialty: subspec/*, uDicUrl: o.uDicUrl*/ },
                { spec: uDicSpecialty, ll: learnedLang, ml: motherLang, 
                  title: uDicName, descr: uDicDescription, subspec, 
                  onUploadProgress: this.handleProgress.bind(this), ...o })
                .catch((error) => {throw error;});
            }
            else throw Error('badUrl');
          })
          .catch((err) => {
            let prefix = 'error.fileUpload.';
            this.props.messenger(typeof err === 'object' ? err.message : prefix + err);
          })
          .then(() => { 
            this.setState({uDicAgreed: false});
            }); // finally executed code
        }    
      
      render() {

        const {
            classes,
            interfaceLang,
            learnedLang,
            motherLang,
            uDicPanelOpen,
            uDicPath,
            fileLoading,
            uDicName,
            // // uDicAgreed,
            uDicSpecialty,
            // uDicSubspecialty, 
            uDicDescription,
            onFileChange,
            onFileUpload,
            onLangPairChange,
            // specialtyFieldOptions,
            onChangeName,
            onChangeDescription,
            onChangeSpecialtyFields,
            onPanelExpanded,
            // onChangeAgreed,
            descriptionPlaceholder,
            helperTexts,
            messenger
            // resolver

        } = this.props,

        { subspecialtyCache, zeroSubspecialty, uDicSubspecialty, specialtyInputValue, 
          uDicSubspecialtyValue, loading, errors, 
          // uDicName, uDicDescription, uDicSpecialty,
          uDicAgreed, uDicUrl/*, uDicPath*/} = this.state;

        let langsNotDetected = !learnedLang || !motherLang;

        const uDicNoneItemText = t`Not detected`;
        const specialtyFieldLabel = t`Specialty field`;
        const subspecialtyFieldLabel = t`Subspecialty field`;
        // const noOptionsText = 'Start typing a new option to add';// <Trans>Start typing a new option to add</Trans>;
        // const zeroSubspecialty = this.state.zeroSubspecialty ? null : {value: 0, label: noOptionsText };
        // const descriptionPlaceholder = ;

        // this.specialtyFieldOptions = this.props.specFields.map(item => 
        //   ({ value: item.value, label: i18n._(item.label.id)}));

        return (
          <>
                <form autoComplete="on" /*onSubmit={handleSubmit}*/>
                <Grid
                container
                // spacing={2}
                // className={classes.demo}
                alignItems="center" 
                // direction='column'//{direction}
                justify="space-around" //"space-between"
                >
                {/* <Grid item><p>{' '}<br /></p></Grid> */}
                <Grid item xs={12} sm={12}>
                <Grid container alignItems="center" justify='space-around'>
                <Grid item xs={3}>
                <label htmlFor="uDicPath" className="parent-span">
                <Button //variant="contained" 
                component="label"//component="span" 
                size="small"
                className={classes.button}>
                <Trans>Select file</Trans>
                <input
                accept=".txt, .tsv, .csv"  // text/plain
                className={classes.inputFile}
                id="uDicPath"
                // name="uDicPath"
                // value={uDicPath}
                // multiple
                type="file"
                onChange={(ev) => {onFileChange(ev); this.setState({uDicUrl:''/*, uDicPath: ev.target.files[0].name*/});}}
                />
                </Button>
                </label>
                </Grid>
                <Grid item xs={9}>
                <FormControl className={classes.formControlExpansionPanelDetails}>
                <InputLabel
                  htmlFor="uDicPath"
                  // shrink={uDicPath}
                  // disabled={!uDicPath}
                >
                <Trans>UTF-8 .tsv or .csv text file</Trans>
                </InputLabel>
                <OptionTooltip title={uDicPath}>
                <Input
                // id="uDicPath"
                // name="uDicPath"
                value={uDicPath}
                disabled={!uDicPath}
                // readOnly={true}
                type='text'
                // className={{backgroundImage: 'url(/images/search_preloader2.svg)'}}
                // classes={{
                // // underline: classes.cssUnderline,
                // // backgroundImage: url(/images/search_preloader2.svg)
                // }}
                endAdornment={
                    fileLoading && <CircularProgress color="primary" size={20} />
                }
                />
                </OptionTooltip>
                </FormControl>
                </Grid>
                {/* <Grid item xs={1}>
                {uDicIsPreloading && (
                <Loading/>
                )}
                </Grid> */}
                </Grid>
                </Grid>
                {/* {uDicIsPreloading && (
                <Grid item xs={1} sm={1} md={1} lg={1}>
                <Loading/>
                </Grid>
                )}  */}
                {/* <Grid item>
                <label htmlFor="uDicPath" className="parent-span">
                <Button component="span" size="small"
                className={classes.button}>
                <Trans>Select file</Trans>
                </Button>
                </label>
                </Grid> */}
                <Grid container //spacing={1} 
                direction='row' alignItems='flex-start'//"center"
                justify='flex-start'/*"space-between"*/>

                <Grid item xs={12} sm={12}>{
                uDicPath && <LangPair revButtonEnabled={false} 
                lang1={learnedLang} lang2={motherLang} 
                langId1='uDicLearnedLang' langId2='uDicMotherLang' 
                noneItemText={uDicNoneItemText}
                onChange={ev => {onLangPairChange(ev); 
                  // console.log('event:', ev);
                  // const func = this.handleChangeSpecialtyValue.bind(this); func(null);
                  if (ev.target.name === 'uDicMotherLang'){
                  this.setState({
                    specialtyInputValue: undefined,
                    uDicSpecialty: undefined,
                    uDicSubspecialtyValue: ZERO_SUBSPECIALTY_VALUE,
                    // uDicAgreed: false, uDicName: '', uDicDescription: ''
                    });
                    // onChangeName({target: {value: ''}});
                    // onChangeDescription({target: {value: ''}});
                  }
                }}
                // disabled={uDicPath === ''}
                />
                }
                </Grid>
                <Grid item xs={12} sm={12} style={{ position:"relative" }}>
                {(!langsNotDetected && !isDemoMode()) && 
                <ExpansionPanel 
                expanded={uDicPanelOpen}
                onChange={onPanelExpanded}
                // disabled={langsNotDetected && !uDicName}
                >
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon color="primary"/>}
                aria-controls="panel-content"
                >
                  {uDicPanelOpen ? 
                  <ExpandLessIcon 
                    color="primary"
                    // style={{fill: "currentColor",padding:0}}
                  
                  /> : <ExpandMoreIcon color="primary"
                  //  style={{fill: "currentColor",padding:0}}
                  />
                  }
                <Typography /*className={classes.heading}*/ /*variant="h6"*/><Trans>Saving on server</Trans></Typography>
                {/* <div className={classes.column}>
                <Typography className={classes.secondaryHeading}>Info for saving on server</Typography>
                </div> */}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails           
                classes={{
                root: classes.pulledExpansionPanelDetails,
                // focused: classes.cssFocused,
                }}
                >
                <Grid container //spacing={1} 
                direction='row' justify='space-between' alignContent="center">
                <Grid item xs={12}>
                <OptionTooltip title={uDicName ? uDicName: ''} 
                  // disabled={langsNotDetected && !uDicName}
                  >
                <TextField 
                id="uDicName"
                // autoComplete="uDicName"
                error={(errors['uDicName'] === true)}
                label={<Trans>Name</Trans>}
                value={uDicName}
                fullWidth={true}
                onChange={(ev) => { /*this.setState({uDicName: ev.target.value});*/ onChangeName(ev)}}
                // onBlur={(ev) => { onChangeName(ev)}}
                onFocus={() => this.clearErrors('uDicName')}
                required={true}
                disabled={langsNotDetected}
                placeholder={t({ id:'wordlist.tab.namePlaceholder', message:`Please, input here name using the mother language.`})}
                // helperText={!helperTexts['uDicName'] && <em><Trans>Please, use mother language</Trans></em>}
                // defaultValue="Default Value"
                // variant="filled"
                // variant='outlined'
                />
                </OptionTooltip>
                </Grid>
                <Grid item xs={12}>
                <OptionTooltip title={uDicDescription ? uDicDescription: ''} 
                  disabled={langsNotDetected || !uDicDescription}>
                <TextField 
                id="uDicDescription"
                // autoComplete="uDicDescription"
                label={<Trans>Description</Trans>}
                value={uDicDescription}
                onFocus={() => this.clearErrors('uDicDescription')}
                error={(errors['uDicDescription'] === true)}
                multiline
                rows={2}
                fullWidth={true}
                onChange={(ev) => {/*this.setState({uDicDescription: ev.target.value});*/onChangeDescription(ev)}}
                // onBlur={(ev) => {onChangeDescription(ev)}}
                required={true}
                disabled={langsNotDetected || !uDicName}
                placeholder={t({id:'wordlist.tab.descriptionPlaceholder', message:`Please, input here description using the mother language.`})}
                // helperText={<em><Trans>Please, input here a description using mother of learned language</Trans></em>}
                // defaultValue="Default Value"
                // variant="filled"
                // variant='outlined'
                />
                </OptionTooltip>
                </Grid>
                <Grid item xs={6}>
                <SearchSelect
                id="uDicSpecialty"
                autoSelect={true}
                options={this.specialtyFieldOptions}
                // defaultValue={this.undefinedSpecialty}
                value={specialtyInputValue || ZERO_SPECIALTY_VALUE}
                // styles={customStyles}
                onChange={this.handleChangeSpecialty.bind(this)}
                // clearOnBlur={null}
                textFieldLabel={specialtyFieldLabel}
                getOptionLabel={option => option.label}
                // getOptionSelected={(option) => option.value === specialtyInputValue.value}
                disabled={langsNotDetected || !uDicName || !uDicDescription}
                required={true}
                disableClearable={true}
                clearOnBlur={true}
                // ref={this.refSearchSelect}
                />
                </Grid>
                <Grid item xs={6}>
                <SearchSelect
                // key={subspecsKey}
                id="uDicSubspecialty"
                options={zeroSubspecialty ? subspecialtyCache.concat([zeroSubspecialty]): subspecialtyCache}
                value={uDicSubspecialtyValue || ZERO_SUBSPECIALTY_VALUE}
                // inputValue={uDicSubspecialtyValue ? uDicSubspecialtyValue.label :'' }
                onOpen={modalLoading(this.handleOnOpenSubspecialty.bind(this), this, 'loading')
                  // () => handleOn(this.handleOnOpenSubspecialty.bind(this), this.setLoadStatus.bind(this))
                }
                onChange={this.handleChangeSubspecialty.bind(this)}
                onFocus={() => this.clearErrors('uDicSubspecialty')}
                textFieldLabel={subspecialtyFieldLabel}
                // getOptionLabel={option => option.label}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params), parInputValue = params.inputValue;
                  // Suggest the creation of a new value
                  if (parInputValue/* !== ''*/) {
                  const isZeroSubspec = this.state.uDicSubspecialtyValue === ZERO_SUBSPECIALTY_VALUE;
                  filtered.push({
                  value: -1,
                  inputValue: parInputValue,
                  label: (isZeroSubspec ? t({id:'settingsTab1.subspecialties.addPhraseBegin', 
                      message: `Add "` }) : t({id:'settingsTab1.subspecialties.changePhraseBegin', 
                      message: `Change to "` }))
                       + parInputValue + t({ id:'settingsTab1.subspecialties.addPhraseEnd', message:`"`})
                  });
                  } 
                  // else if (options[0] === undefined) {
                  //   filtered[0] = {
                  //     value: 0,
                  //     inputValue: params.inputValue,
                  //     // this.theme.MuiAutocomplete.noOptionsText
                  //     label: 'this.props.noOptionsText' // theme.props.MuiAutocomplete.noOptionsText
                  //     };
                  // }
                  // else if (options.length === 0) {filtered.push({
                  //   value: 0,
                  //   inputValue: params.inputValue,
                  //   // this.theme.MuiAutocomplete.noOptionsText
                  //   label: 'this.props.noOptionsText' // theme.props.MuiAutocomplete.noOptionsText
                  //   });}

                  return filtered;
                  }}
                // noOptionsText={<Trans>Start typing new option to add</Trans>}
                // selectOnFocus
                selectOnFocus={false}
                clearOnBlur={true}
                handleHomeEndKeys={true}
                disabled={ langsNotDetected || !uDicName || !uDicDescription || !specialtyInputValue /*!== ZERO_SPECIALTY_VALUE*/}
                required={true}
                disableClearable={true}
                loading={loading}
                error={errors['uDicSubspecialty'] === true ? errors['uDicSubspecialty']:undefined }
                />
                </Grid>
                <Grid item xs={12}>
                {/* <br /> */}
                </Grid>
                <Grid item xs={1}>
                <Checkbox id='uDicAgreed' color="primary" 
                checked={uDicAgreed}
                onClick={this.handleChangeAgreed.bind(this)}
                disabled={!uDicPath || !uDicName || !uDicSpecialty 
                  || uDicSubspecialtyValue === ZERO_SUBSPECIALTY_VALUE 
                  || !uDicDescription}/>
                </Grid>
                <Grid item xs={8} style={{ textAlign: 'left', verticalAlign: 'baseline', position:"relative" }}
                // disabled={langsNotDetected}
                >
                {/* <div style={{ textAlign: 'left', verticalAlign: 'baseline', position:"relative" }}
                > */}
                {/* <p style={{ display: 'inline', width: '100%' }}> */}
                <Typography variant='body2'>
                <Trans>I agree to the</Trans>{" "}
                <Link className={classes.alignRight}
                href={window.location.origin + '/help/agreements/uploadtc.html'}
                target='_blank'
                underline='always'
                >
                <Trans>Terms and Conditions</Trans>
                </Link>
                {" "}<Trans>and</Trans>{" "}
                <Link /*className={classes.alignRight}*/ 
                href={window.location.origin + '/help/agreements/uploadpp.html'}
                target='_blank'
                underline='always'>
                <Trans>Private Policy</Trans></Link>
                {/* {i18n.locale === 'en' ? " of " : ' '} */}
                {' '}{t`of`}{' '}
                <Link href={window.location.origin} 
                //TypographyClasses={{root: classes.title}}
                // className={classes.button}
                underline='none'
                // component='h1'
                >
                {process.env.REACT_APP_NAME}
                </Link></Typography>
                {(!uDicPath || !uDicName || !uDicSpecialty 
                  || uDicSubspecialtyValue === ZERO_SUBSPECIALTY_VALUE 
                  || !uDicDescription) 
                  && 
                  <DisableBlock />
                // <div style={{position:"absolute", top:0, left:0, width:"100%", height:"100%",backgroundColor:"white", opacity:".4"}}>
                //   </div>
                }
                  {/* </div> */}
                </Grid>
                <Grid item xs={2}>
                <label htmlFor="uDicDescription" className="parent-span">

                <Button size="small" component="span" className={classes.button} 
                disabled={ !uDicPath || !uDicName || !uDicSpecialty 
                  || uDicSubspecialtyValue === ZERO_SUBSPECIALTY_VALUE 
                  || !uDicDescription || !uDicAgreed }
                onClick={modalLoading(this.handleFileUpload.bind(this), this)
                  // () => handleOn(this.handleFileUpload.bind(this), this.setUploadStatus.bind(this))
                }
                >
                <Trans>Upload</Trans></Button>
                </label>
                </Grid>
                </Grid>

                </ExpansionPanelDetails>
                {/* <Divider />
                <ExpansionPanelActions>
                <Button size="small">Cancel</Button>
                <Button size="small" color="primary">
                Save
                </Button>
                </ExpansionPanelActions> */}
                </ExpansionPanel>
                }
                { 
                //uDicPath === '' 
                //  loading &&
                // <div style={{position:"absolute", top:0, left:0, width:"100%", height:"100%",backgroundColor:"white", opacity:".4"}}>
                //   <Loading />
                // </div>
                }
                </Grid>
                </Grid>
                </Grid>
                </form>
                </>
                )
                }
}

// export default withStyles(styles)(WLTab1); 
export default withSnackbar(withStyles(styles)(WLTab1));
