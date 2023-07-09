import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';

import SnackbarContext from './SnackbarContext';
import { SnackbarContentWrapper } from './Snackbars';
import { withStyles } from '@material-ui/core/styles';

import { SpecialtyFields, SubspecialtyRecords, WordlistNameRecords } from '../data/SpecialtyFields';
import { StateSaver } from '../data/StateSaver';
import { ModalContent } from './ModalContent';
import { CircularIndeterminate, CircularProgressWithLabel, Loading} from './CustomElements';

const styles = theme => ({
 /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }}`. */
 anchorOriginBottomLeft: {
  // ...bottom1,
  left: 80,
  // ...left,
  // [theme.breakpoints.up('sm')]: {
    // right: 'auto',
    // ...bottom3,
    // ...left3,
  // },
},
modal: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
},
paper: {
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
},

})

class SnackbarProvider extends Component {
    queue = [];

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openModal: false,
            contextValue: {
                handleEnqueueSnackbar: this.handleEnqueue,
                handleCloseSnackbar: this.handleClose,
                specFields: SpecialtyFields,
                subspecsCache: SubspecialtyRecords,
                wordlistCache: WordlistNameRecords,
                stateCache: StateSaver,
                handleOpenModal: this.handleOpenModal,
                handleCloseModal: this.handleCloseModal
                // modal
            },
        };
    } 

    // state = {
    //   open: false,
    // };
  
    handleEnqueue = (id, params={}) => /*() =>*/ {
      console.log('enqueued: ', id, params);
      this.queue.push({
        id: id,
        params: params,
        // key: new Date().getTime(),
      });
  
      if (this.state.open) {
        // immediately begin dismissing current message
        // to start showing new one
        this.setState({ open: false });
      } else {
        this.processQueue();
      }
    };
  
    processQueue = () => {
      if (this.queue.length > 0) {
        this.setState({
          messageInfo: this.queue.shift(),
          open: true,
        });
      }
    };
  
    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({ open: false });
    };
  
    handleExited = () => {
      this.processQueue();
    };

    handleOpenModal = (modalContentInfo) => {
      this.setState({ openModal: true, modalContentInfo });
      // this.handleEnqueue('proba');
    };
  
    handleCloseModal = (event, reason) => {
      // if (reason === 'clickaway') {
      //   return;
      // }
  
      this.setState({ openModal: false });
    };

    render() {
        const { children, classes } = this.props;
        const { contextValue, messageInfo={}, openModal, modalContentInfo } = this.state;
        const hideBackdrop = modalContentInfo && modalContentInfo.hasOwnProperty('hideBackdrop');
        return (
        <SnackbarContext.Provider value={contextValue}>
        <Modal
        open={openModal}
        onClose={this.handleCloseModal}
        hideBackdrop={hideBackdrop}
        // aria-labelledby="simple-modal-title"
        // aria-describedby="simple-modal-description"
        disableBackdropClick disableEscapeKeyDown
        >
        <> 
        <ModalContent info={modalContentInfo} />
        </>
        </Modal>

        {children}
        <Snackbar
          anchorOrigin={{
            vertical: 'top',//bottom',
            horizontal: 'center', //'left',
          }}
          classes={{anchorOriginBottomLeft: classes.anchorOriginBottomLeft}}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
        >
        <SnackbarContentWrapper
           onClose={this.handleClose}
           messageId={messageInfo.id}
           messageParams={messageInfo.params}
        />
        </Snackbar>
        </SnackbarContext.Provider>
        );
    }
}

SnackbarProvider.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func,
    onExited: PropTypes.func,
};

SnackbarProvider.defaultProps = {
    onClose: undefined,
    onExited: undefined,
};

export default withStyles(styles)(SnackbarProvider);
