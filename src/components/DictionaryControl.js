import React, { Component } from 'react'
import { GameStage } from './GameStage';
import C from '../constants';
import initialState from '../data/initialState';
import { includeDicItem, excludeDicItem, changeUserDicSelected, changeEntireState } from '../actions';
import { dicItems  } from '../store/reducers';
import EnhancedTable from './DictionaryTable';
import WordlistTabs from './WordlistTabs';
import { uploadToDisk } from './WordlistGetPut';
import { CSVtoArray, isCSVvalid, TabTextToArray, isTabTextValid } from '../lib/FileToArray';
// import { BackgroundSvg, BackgroundSVG } from './CustomElements';
import PropTypes from 'prop-types';
// import { useSnackbar } from './useSnackbar';
import withSnackbar from './withSnackbar';
import { Trans, t } from '@lingui/macro';
// import { t } from "@lingui/macro";

import { withStyles/*, MuiThemeProvider, createMuiTheme */} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';
import CircularProgress from '@material-ui/core/CircularProgress';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import FilledInput from '@material-ui/core/FilledInput';
import { Button } from "@material-ui/core";
//import Button from '@material-ui/core/Button';

// import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Langs from '../data/langs';
import { detectLanguage} from '../lib/gt';
import backgroundSvg from '../images/favicon.svg'
// import { changeLearnedLang, changeMotherLang } from '../actions';
import {GUEST_KEY} from '../store/index';
import { getFileExt, setLocaleCookie, devMode } from '../lib/stringLib';
import { delay } from '../lib/async';
import { filterState } from '../store/index';

import CryptoJS from 'crypto-js';//CryptoJS.enc.Utf8
// import AES from 'crypto-js/aes';
// import GZIP from 'gzip-js';
import JSZip, { forEach } from 'jszip';
import {modalLoading} from './ModalLoading';

import {CircularIndeterminate, CircularProgressWithLabel, AlertMessage} from './CustomElements';

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
    },
    header: {
      [theme.breakpoints.down('xs')]: {
        margin: 0,
        '& > .MuiGrid-item': {
          padding: '0px 12px',
        },
      },
    }
});

class Form extends GameStage {

      constructor(props) {
      super(props);
      if(props.playAreaState){
        this.state = props.playAreaState;
      } else {
        this.state = this.initState;
      }
      // this.handleWindowClose = (ev) => 
      // {  
      //     ev.preventDefault();
      //     // return
      //     alert('Need saving? just save');
      //     ev.returnValue = 'Are you sure you want to close?';
      // }

      // this.specialtyFieldOptions = SpecialtyFields.map(
      //   item => ({ value: item.id, label: this.props.interfaceLang === 'en' ? item.en : item.ru }) );
      // this.defaultSpecialty = this.specialtyFieldOptions.filter(
      //   item => item.value === dictionary.dicSpecialty)[0];
      // this.undefinedSpecialty = this.specialtyFieldOptions[0];

      // this.baseState = this.state;
    }

  get initState() {
      const props = this.props;
      const state = filterState(props);

      let sItems = props.altItems, 
          uItems = props.items;
      if (props.uDicIsSelected === false ){
        sItems = props.items;
        uItems = props.altItems;
      }

      return {...state,
        // learnedLang : props.learnedLang,
        // motherLang  : props.motherLang,
        // uDicLearnedLang : props.uDicLearnedLang,
        // uDicMotherLang  : props.uDicMotherLang,
        uDicIsSelected: (!props.user || props.uDicIsSelected === true) ? true: false,
        // uDicPath: props.uDicPath || '',
        // dicHalfPath: props.dicHalfPath || '',
        // dicSpecialty: props.dicSpecialty || 0,
        // dicSubspecialty: props.dicSubspecialty || 0,
        // uDicPanelOpen: props.uDicPanelOpen || false,
        // uDicSpecialty: props.uDicSpecialty || 0,
        // uDicSubspecialty: props.uDicSubspecialty,// || null,
        // uDicName: props.uDicName,
        // dicId: props.dicId  || 0,
        // dicName: props.dicName || '', 
        // dicDescription: props.dicDescription || '', 
        // dicItems: props.dicItems, dicSubscrs: props.dicSubscrs,

        // uDicDescription: props.uDicDescription || '',
        // dicDescription: props.dicDescription || '',
        // uDicAgreed: props.uDicAgreed || false,
        // dicMinSubscriptions: props.dicMinSubscriptions || C.subscriptionsMinProps.min, 
        // dicMaxSubscriptions: props.dicMaxSubscriptions || C.subscriptionsMaxProps.max, 
        // dicMinItems: props.dicMinItems || C.itemsMinProps.min,
        // dicMaxItems: props.dicMaxItems || C.itemsMaxProps.max,
        // dicMinSize: props.dicMinSize || C.sizeMinProps.min,
        // dicMaxSize: props.dicMaxSize || C.sizeMaxProps.max,
        // dicFilterFields: props.dicFilterFields || [false, false, false],
        // dicSortBy: props.dicSortBy,
        // uDicUrl: props.uDicUrl || '',
        uItems: uItems,
        sItems: sItems,
        // page: props.page, 
        // rowsPerPage: props.rowsPerPage, 
        // sortable: false,
        // order: props.order,
        // orderBy: props.orderBy,
        // isChanged: false,
        uDicIsLoaded: props.uDicPath && props.uDicIsLoaded,
        // screenWidth: window.outerWidth, screenHeight: window.outerHeight,
        studiedFilterText: '', 
        meaningFilterText: '',
      }
    }

    afterDownload(blob, userId){
      return CryptoJS.AES.decrypt(blob, userId ? userId.toString() : GUEST_KEY).toString(CryptoJS.enc.Utf8);
    }

    beforeUpload(data, user) {
      // let options = {
      //   level: 3,
      //   name: 'blob.gz',
      //   timestamp: parseInt(Date.now() / 1000, 10)
      // };
    // let user = this.props.user;
    let userId = user ? user.id : null;
    let stuff = data;//JSON.stringify(this.fileContent);
    // console.log('after sringify:', stuff);
    // stuff = GZIP.zip(stuff, options); // array of bytes
    // console.log('after zip:', stuff);

    stuff = CryptoJS.AES.encrypt(stuff, userId ? userId.toString() : GUEST_KEY).toString();
    // console.log('after encrypt:', stuff);
    // stuff = unescape(encodeURIComponent(stuff)); // Convert the string to UTF-8
    // console.log('after unescape/encodeUri:', stuff);
    // stuff = GZIP.zip(stuff, options); // array of bytes
    // console.log('after zip:', stuff);
    
    let blob = new Blob([stuff],{/*type:'application/gzip'*/type: 'text/plain; charset=x-user-defined-binary'});
    // console.log('after blob:', blob);

    // let blob = new Blob([stuff], { type: 'text/json' });
    return blob;
  }

    handleChangeFilterFields = index => event => {
      let dicFilterFields = this.state.dicFilterFields;
      dicFilterFields[index] = event.target.checked;
      this.setState({ dicFilterFields, isChanged: true });
    }

    handleChangeMinMax = prefix => event => {
      // console.log(event, event.target.value)
      // const prefix = 'dic';
      const minPrefix = prefix + 'Min', maxPrefix = prefix + 'Max';
      const { value, name, step, /*min, max*/ } = event.target;
      let partyName, partyValue, 
        Value = parseInt(value, 10), Step = parseInt(step, 10)
        /*, Min = parseInt(min), Max = parseInt(max)*/;
      if (isNaN(Value)) return;

      if (name.startsWith(minPrefix)) {
        partyName = maxPrefix + name.substring(minPrefix.length);
        partyValue = this.state[partyName];
        if ( Value > partyValue - Step) return;
      }
      else if (name.startsWith(maxPrefix)) {
        partyName = minPrefix + name.substring(maxPrefix.length);
        partyValue = this.state[partyName];
        if ( Value < partyValue + Step) return;
      }
      else return;
      this.setState({ [name]: Value, isChanged: true });
    }

    handleChangeLangPair = (tab) => (event) => {
      // this.props.subspecsCache.clear();
      let specsName = tab === 0 ? 'uDicSpecialty' : 'dicSpecialty';
      let subspecsName = tab === 0 ? 'uDicSubspecialty' : 'dicSubspecialty';
      if (tab === 0) this.setState({uDicName: '', uDicDescription: ''});
      this.setState({ [event.target.name]: event.target.value, [specsName]: null, [subspecsName]: null, isChanged: true });
    }

    handleChangeNamed = (name) => (event) => {
      // console.log(name, event.target.value)
      this.setState({ [name]: event.target.value, isChanged: true });
    };

    handleChangeChecked = (name) => (event) => {
      this.setState({ [name]: event.target.checked, isChanged: true })
    }

    handleChangeSpecialtyFields(id, option){
      // console.log('id, option :', id, option); //this.state[id]
      
      if (this.state[id] !== option)
        this.setState({ [id]: option, isChanged: true });
      // this.forceUpdate();
    };

    handleChangeDicName(option) {
      this.setState({ dicNameObject: option, dicName: option.value });
    };

    panelHandleChange(event, expanded) {
      if (this.props.user !== null) {
        if (this.state.uDicIsSelected === false){
          this.setState({
            uDicIsSelected: true, isChanged: true
          });
          // this.props.handleChangeUserDicSelected(true);
        }
        else if (this.state.uDicIsSelected === true)
        this.setState({
          uDicIsSelected: false, isChanged: true
        });
        // this.props.handleChangeUserDicSelected(false);
      }
    };

    panel1HandleChange(event, expanded) {
      if (this.props.user !== null && this.state.uDicIsSelected === false){
      this.setState({
        uDicIsSelected: true//, listItems: [...altItems]
      });
      }
    };
    
    panel2HandleChange(event, expanded) {
      if (this.props.user !== null && this.state.uDicIsSelected === true){
      this.setState({
        uDicIsSelected: false//, listItems: [...altItems]
      });
      }
    };

    handlePanelExpanded(event, expanded) {
      this.setState({
        uDicPanelOpen: expanded//, listItems: [...altItems]
      });
    };

    handleReverseLangs() {
    let tempLang = this.state.learnedLang;
    this.setState({ learnedLang: this.state.motherLang, motherLang: tempLang, isChanged: true });    
    };

    handleChangeDicLoading = (handle) => {
      // this.setState({dicLoading: true });
      return modalLoading(handle, this, 'dicLoading').bind(this);
    }

    handleChangeSDic(dicItem, sItems){
      const { path, id, name, descr, items, subscrs} = dicItem;
      this.setState({ dicId: id || null, dicName: name || '', dicHalfPath: path || '', 
          dicDescription: descr || '', dicItems: items || null, dicSubscrs: subscrs || null,
          sItems, isChanged: true});
    }

    handleIncluded(event, id, checked) {
      event.target.checked = !checked;
      let action = checked ? includeDicItem : excludeDicItem;

      if (this.state.uDicIsSelected === true) {
        this.setState({ uItems: dicItems(this.state.uItems, action(id)), isChanged: true });
      }
      else {
        this.setState({ sItems: dicItems(this.state.sItems, action(id)), isChanged: true });
      }
      };

      handleRequestSort(ev, property) {
        let orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') { order = 'asc';}
        this.setState({order, orderBy});
      };

      handleChangeSortable(ev) {
        // console.log('ev.target.checked', ev.target.checked);
        this.setState({sortable: ev.target.checked});
      };
    
    handleChangePage(event, page) {
      this.setState({ page });
    };

    handleChangeRowsPerPage(event) {
      this.setState({ rowsPerPage: parseInt(event.target.value) });
    };

    checkTxtFileExt (fileItem) {
      let validExts = [".tsv", ".txt", ".csv"];
      // let fileExt = fileItem.name;
      let fileExt = getFileExt(fileItem.name);
      if (validExts.indexOf(fileExt) < 0) {
        return false;
      }
      return true;
    }

    checkPkgFileExt (fileItem) {
      let validExts = [".apkg"];
      // let fileExt = fileItem.name;
      let fileExt = getFileExt(fileItem.name);
      if (validExts.indexOf(fileExt) < 0) {
        return false;
      }
      return true;
    }

  handleFileChange(event) {
  if (window.File && window.FileReader /*&& window.FileList && window.Blob*/) {
    let file = event.target.files[0];
    document.getElementById("uDicPath").value = ""; // for SELECT FILE button to work properly 
    if (this.checkTxtFileExt(file)) {
      if (file.size > C.MAX_DIC_FILE_SIZE) {
        this.props.enqueueSnackbar('error.fileload.tooBigFileSize');
        return false;
      }
      this.readTxtFile(file);
    }
    else if (this.checkPkgFileExt(file)) {
      if (file.size > C.MAX_DIC_FILE_SIZE) {
        this.props.enqueueSnackbar('error.fileload.tooBigFileSize');
        return false;
      }
      this.readPkgFile(file);
    }
    
    else {
      this.props.enqueueSnackbar('error.fileload.invalidExtension', 
          { fileName: file.name });
      return false;
    }
  } else {
    this.props.enqueueSnackbar('error.fileload.browserNotSupportingFileLoad');
    }
  }

  handleFileUpload(state, requestData){
    
    let blob = this.beforeUpload(window.uFileContent, this.props.user);
    
    return uploadToDisk({blob, items: this.fileContentObject.length, ...requestData})
    .then((list) => {
    this.props.wordlistCache.addList({...requestData, list});
    this.setState({uDicPanelOpen: false, ...state}); // save new state of the component
    this.props.enqueueSnackbar('success.fileUpload.successfull');
    })
  }

  // detectLang = (str) => {const dl = detectLanguage.bind(this); return delay(1200).then(dl(str));};

  handleLoadTxt = (file) => (e) => {
    let errors = 0, firstErrLine = 0;
    const fileExt = file.name.substring(file.name.lastIndexOf('.'));
    let isValid = isTabTextValid, lineToArray = TabTextToArray;
    this.studiedLangText = this.motherLangText = '';
    let scopeCount = C.SCOPE_COUNT_VALUE || 2;
    
    if (fileExt === '.csv') { isValid = isCSVvalid; lineToArray = CSVtoArray;}
    this.oldFileContentObject = this.fileContentObject;
    window.uFileContent = e.target.result;
    this.fileContentObject = e.target.result.split(/\r?\n/g)
        .map((line, index, array) => { 
          if (!isValid(line) && (index + 1 < array.length)) { // is not valid and not the last empty string
              if (firstErrLine === 0) firstErrLine = index + 1;
              errors ++;
              return null;
          } 
          else if (firstErrLine === 0) { 
              let fields = lineToArray(line);
              if (fields !== null && fields.length >= 2) {
                let studied = fields[0].trim(), meaning = fields[1].trim();

                // if (!studied || !meaning) { firstErrLine = index + 1;
                //   errors ++;
  
                if (index > 0 && scopeCount > 0) { // skip head line and compile the texts to recognize
                  this.studiedLangText += (this.studiedLangText === '' ? '': ' ') + studied;
                  this.motherLangText += (this.motherLangText === '' ? '': ' ') + meaning;
                  scopeCount--;
                }
                return { id: ++index, studied, meaning};
              }
          }
          return null;
        });
    
    if (errors) {

      this.fileContentObject = this.oldFileContentObject;
      // this.setState({uDicIsLoading: false});
      this.handleLoadClose();

      this.props.enqueueSnackbar('error.fileload.fileErrors', 
            { errNumber: errors, lineNumber: firstErrLine });
            return;
      }
      return this.handleLoadSuccess(file.name);
      }

    handleLoadSuccess(fileName) {
      if (this.studiedLangText === '' && this.motherLangText === '') {
        this.studiedLangText = this.fileContentObject[0].studied;
        this.motherLangText = this.fileContentObject[0].meaning;
      }

      Promise.allSettled([
        detectLanguage(this.studiedLangText).catch(() => {return 0;}),
        detectLanguage(this.motherLangText).catch(() => {return 0;})
      ])
      // .catch(err => {this.props.enqueueSnackbar(err.message);})
      .then(values => {
      this.setState({ uDicPath: fileName, 
        uDicLearnedLang: values[0].value, uDicMotherLang: values[1].value,
        uItems: this.fileContentObject.filter(line => line !== null), 
        uDicName: '',
        uDicSpecialty: this.props.uDicSpecialty,
        uDicSubspecialty: null,
        uDicDescription: '',
        uDicPanelOpen: false,
        uDicAgreed: false,
        isChanged: true,
        // uDicIsLoading: false
    });
    this.handleLoadClose();
    this.props.enqueueSnackbar('success.fileload.successfull');
    })
  }

  handleLoadOpen(){
  this.setState({uDicIsLoading: true});
  this.props.openModalMode({id:'none', hideBackdrop: true});
  }

  handleLoadClose(){
    this.setState({uDicIsLoading: false});
    this.props.closeModalMode();
  }

  handleLoadStart(e) {
    this.handleLoadOpen();
  }

  handleLoadAbort(e) {
    this.handleLoadClose();
    this.props.enqueueSnackbar('info.fileload.cancelled');
  }

  // handleLoadProgress(e) {
    
  // }

  handleLoadError(e) {
  // this.setState({uDicIsLoading: false});
  const prefix = 'error.fileload.';
  let message = 'whileReading';
  switch(e.target.error.code) {
    case e.target.error.NOT_FOUND_ERR:
      message = 'notFound';
      break;
    case e.target.error.NOT_READABLE_ERR:
      message = 'notReadable';
      break;
    // case e.target.error.ABORT_ERR:
    default:
  };
  this.handleLoadClose();
  this.props.enqueueSnackbar(prefix + message);
}

  readTxtFile(file) {
      const reader = new FileReader();
      reader.onloadstart = this.handleLoadStart.bind(this);
      // reader.onprogress = this.handleLoadProgress;
      reader.onabort = this.handleLoadAbort.bind(this);
      reader.onerror = this.handleLoadError.bind(this);
      reader.onload = this.handleLoadTxt(file);
      reader.readAsText(file);
  }

  readPkgFile(file){
    const reader = new FileReader();
    reader.onloadstart = this.handleLoadStart.bind(this);
    // reader.onprogress = this.handleLoadProgress;
    reader.onabort = this.handleLoadAbort.bind(this);
    reader.onerror = this.handleLoadError.bind(this);
    reader.onload = this.handleLoadPkg(file);
    reader.readAsArrayBuffer(file);
  }

  handleLoadPkg = (file) => (e) => {
    this.oldFileContentObject = this.fileContentObject;
    // window.uFileContent = e.target.result;

    let oldUFileContent = window.uFileContent, oldMedia = window.uFileContentMedia, oldSrc = window.uFileContentSrc;
    window.uFileContent = window.uFileContentMedia = window.uFileContentSrc = undefined;
    // let promises = [];
    JSZip.loadAsync(e.target.result)                                   // 1) read the Blob
    .then(function(zip) {
        zip.forEach(function (relativePath, zipEntry) {  // 2) print entries
          let content;
          const entryName = zipEntry.name.toString();
            if(entryName !== 'media') {
              content = new Uint8Array(zipEntry.file);
              if(entryName === 'collection.anki2') {
                window.uFileContent = getFileContentFromSqliteDb(content);
                // this.fileContentObject = 
              }
              else window.uFileContentSrc[entryName] = content;
            }
            else window.uFileContentMedia = JSON.parse(zipEntry.file);
        });
        Object.keys(window.uFileContentSrc).forEach((media, index) => URL.createObjectURL(
          new Blob([window.uFileContentSrc[media].buffer], { type: getFileExt(window.uFileContentMedia[media]) } /* (1) */)
        ));
        this.handleLoadSuccess(file);
        // ++++promises.push(zip.file(file.name).async("text"));
    }, function (e) {
      window.uFileContent = oldUFileContent;
      window.uFileContentMedia = oldMedia;
      window.uFileContentSrc = oldSrc;
      this.handleLoadError(e);
    })
    // +++Promise.all(promises).then(function (data) {
      // do something with data
    // });
  }

  // handleLoad(file) {
  //   this.handleLoad(file);
  // }

  handleRestore() {
    this.props.closeSnackbar();
    this.setState(this.initState);
  }

  handleChangeTableFilters = (column) => (event) => {
    let needle = event.target.value.toLowerCase();
    this.setState( column === 'studied' ? { studiedFilterText: needle} :
      { meaningFilterText: needle});
    
  }

  handleClearTableFilters = (column) => (event) => {
    this.setState( column === 'studied' ? { studiedFilterText: ''} :
       { meaningFilterText: ''});
    document.getElementById(column === 'studied' ? "studiedFilterText": "meaningFilterText")
      .value = "";
    
  }

  handleChangeDicSortBy = (event, newValue) => {
    if (newValue) this.setState({dicSortBy:newValue.value, isChanged: true})
  }

  findLang = lang => {return Langs.find(item => item.value === lang);}

  onResolveLang = (lang) => (value) => {
    console.log(lang, value);
    this.setState({[lang]: value, isChanged: true});
  }

  render() {
    const { learnedLang, 
            motherLang,
            uDicLearnedLang,
            uDicMotherLang,
            uDicIsSelected,
            uDicPanelOpen,
            uDicPath,
            uDicName,
            dicSpecialty,
            dicId, dicName, dicHalfPath, dicDescription, dicItems, dicSubscrs,
            uDicSpecialty,
            dicSubspecialty,
            uDicSubspecialty,
            uDicDescription,
            // uDicUploaded,
            // zeroSubspecialty,
            page, rowsPerPage, 
            order, orderBy, sortable,
            uItems, sItems,
            isChanged,
            uDicIsLoading,
            // uDicIsLoaded,
            // screenWidth, /*screenHeight,*/ 
            studiedFilterText, meaningFilterText,
            dicMaxSubscriptions, dicMinSubscriptions,
            dicMaxSize, dicMinSize,
            dicMaxItems, dicMinItems,
            dicFilterFields } = this.state,
            
          { classes, user/*, transitionTimeout*/ } = this.props;

    let items = uDicIsSelected === true ? uItems: sItems;
    let llang = uDicIsSelected === true ? uDicLearnedLang : learnedLang;
    let mlang = uDicIsSelected === true ? uDicMotherLang : motherLang;
    // const backgroundSvgStr = encodeURIComponent(renderToStaticMarkup(<BackgroundSVG />));

    return (
        // <form autoComplete="on" /*onSubmit={handleSubmit}*/>
        <Grid container spacing={2}>
        <Grid item xs={12} /*classes={{item: classes.header}}*/>
        <Grid container alignItems="center" justify="space-between" spacing={2}>

        <Grid item xs={8} sm={8} md={8} lg={8}>
        <Typography variant="h5" /*gutterBottom*/ component="h2">
        <Trans>Word list settings</Trans>
        </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2}>
        <Button size="small" className={classes.button}
        onClick={this.handleRestore.bind(this)}
        disabled={isChanged !== true}
        ><Trans>Restore</Trans></Button>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2}>
        <Button size="large" className={classes.button} onClick={this.saveChanges.bind(this)}
        disabled={isChanged !== true}
        ><Trans>Save</Trans></Button>
        </Grid>
        </Grid>
        <Divider />

        </Grid>
        
        <Grid container spacing={5} alignItems="flex-start">
        <Grid item xs={12} sm={12} md={6} lg={6} 
          // style={{textAlign:'center', backgroundImage:`$url("data:image/svg+xml,${backgroundSvgStr}")`,
          // backgroundRepeat:'no-repeat'}}
          >

          <Grid item //class='logoBG'
          >

          <WordlistTabs 
            {...this.state}
            // interfaceLang={interfaceLang}
            // uDicLearnedLang={uDicLearnedLang}
            // uDicMotherLang={uDicMotherLang}
            // uDicName={uDicName}
            // // uDicAgreed={uDicAgreed}
            // uDicDescription={uDicDescription}
            // uDicSpecialty={uDicSpecialty}
            // uDicSubspecialty={uDicSubspecialty}
            // dicSpecialty={dicSpecialty}
            // dicSubspecialty={dicSubspecialty}
            // learnedLang={learnedLang} 
            // motherLang={motherLang}
            // uDicPanelOpen={uDicPanelOpen}
            // uDicPath={uDicPath || ''}
            fileLoading={uDicIsLoading}
            tab={uDicIsSelected === true ? 0 : 1}// (user !== null && uDicIsSelected === false) ? 1 : 0}
            onTab={this.panelHandleChange.bind(this)}
            onFileChange={this.handleFileChange.bind(this)}
            onFileUpload={this.handleFileUpload.bind(this)}
            onLangPairChange={this.handleChangeLangPair.bind(this)}
            onChangeName={this.handleChangeNamed("uDicName").bind(this)}
            onChangeDescription={this.handleChangeNamed("uDicDescription").bind(this)}
            onChangeSDic={this.handleChangeSDic.bind(this)}
            onMinMax={this.handleChangeMinMax('dic').bind(this)}
            onCheckFilterFields={this.handleChangeFilterFields.bind(this)}
            onPanelExpanded={this.handlePanelExpanded.bind(this)}
            onChangeSpecialtyFields={this.handleChangeSpecialtyFields.bind(this)}
            onChangeAgreed={this.handleChangeChecked('uDicAgreed').bind(this)}
            messenger={this.props.enqueueSnackbar}
            onDicLoading={this.handleChangeDicLoading.bind(this)}
            onChangeDicSortBy={this.handleChangeDicSortBy.bind(this)}
            // dicMaxSize={dicMaxSize}
            // dicMinSize={dicMinSize}
            // dicMinSubscriptions={dicMinSubscriptions} 
            // dicMinItems={dicMinItems}
            // dicMaxSubscriptions={dicMaxSubscriptions}
            // dicMaxItems={dicMaxItems}
            // dicFilterFields={dicFilterFields}
            user={user}
          />
          {/* </Paper> */}
          </Grid>

        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} >
        {
        this.state.dicLoading ?  
        <Typography style={{textAlign:"center", marginTop: 40}}/*gutterBottom*//* component="h2"*/>
          <CircularProgress color="primary" size={40} /></Typography>
            : 
          (items && items.length > 0) ? (
        <EnhancedTable
        page={page}
        rowsPerPage={rowsPerPage} 
        data={items.filter(row => row.studied.toLowerCase()
          .indexOf(studiedFilterText) > -1 && row.meaning.toLowerCase().indexOf(meaningFilterText) > -1)
        }
        order={order}
        orderBy={orderBy}
        sortable={sortable}
        onChangeSortable={this.handleChangeSortable.bind(this)}
        learnedLang={this.findLang(llang) }
        motherLang={this.findLang(mlang) }
        studiedFilterText={studiedFilterText}
        meaningFilterText={meaningFilterText}
        MAX_TABLE_STRLEN={C.MAX_WORDLIST_TABLE_STRLEN}
        handleRequestSort={this.handleRequestSort.bind(this)}
        handleIncluded={this.handleIncluded.bind(this)}
        handleChangePage={this.handleChangePage.bind(this)}
        handleChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
        handleChangeTableFilters={this.handleChangeTableFilters.bind(this)}
        handleClearTableFilters={this.handleClearTableFilters.bind(this)}
        />
        ) : (
          // <Paper>
          <Typography variant="h6" style={{color: "grey", textAlign:"center", marginTop: 20}}/*gutterBottom*//* component="h2"*/>
          <Trans>No items</Trans></Typography>
          // </Paper>
        )}
        {/* </Paper> */}
        </Grid>
        </Grid>
        </Grid>
        // </form> 
        )
 }}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  // user: PropTypes.object.isRequired,

//   learnedLang: PropTypes.string.isRequired,
//   motherLang: PropTypes.string.isRequired
  // this.handleChangeLearnedLang: PropTypes.function.isRequired,
  // this.handleChangeMotherLang: PropTypes.function.isRequired 
  //}
  // numSelected: PropTypes.number.isRequired,
  // onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
   // order: PropTypes.string.isRequired,
   // orderBy: PropTypes.string.isRequired,
  // rowCount: PropTypes.number.isRequired,
 };

// const ConnectedForm = connect(
//   (state) =>
//   ({
//     // tab: state.tab,
//     // // interfaceLang: state.interfaceLang,
//     // user: state.user,
//     // altItems: state.altItems,
//     // dictionary: state.dictionary,
//     ...state
//   }),   
//   (dispatch) =>
//   ({
//     handleChangeUserDicSelected(value) {
//       dispatch(changeUserDicSelected(value));
//     },
//   })
// )(Form);

// const ConnectedForm = connect(
//   (state) =>
// ({
//   // selectedTabIndex: state.tab
//   ...state
// }),   
// (dispatch) =>
// ({
//   handleChangeUserDicSelected(value) {
//     dispatch(changeUserDicSelected(value));
//   },
//   handleSaveChanges(state/*, props*/) {
//     // const newState = filterState(state);
//     // console.log(filteredState);
//     // const appState = filterState(props);
//     dispatch(changeEntireState(filterState(state)));
//   }
// })
// )(Form);
 
// export default withSnackbar(withStyles(styles)(Form));
export default withStyles(styles)(Form);
