import React from 'react';
import PropTypes from 'prop-types';
import { Trans, Plural } from '@lingui/macro';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

// import { I18n } from "@lingui/react";
// import { t } from "@lingui/macro";
import {CircularIndeterminate, CircularProgressWithLabel, AlertMessage} from './CustomElements';

export function ModalContent(props) {
    let {id, value, message} = props.info;
    // const prefix = 'modal.';
    return (
        !id || id === 'circularIndeterminate' ? 
        <CircularIndeterminate />  :
        id === 'none' ? <></> :
        id === 'circularWithValue' ?
        <CircularProgressWithLabel value={value} message={message}/> :
        id === 'alertMessage' ?
        <AlertMessage message={message}/> :
        <Typography variant="caption" >{id}</Typography>
    );
}