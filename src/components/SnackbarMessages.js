import React from 'react';
import PropTypes from 'prop-types';
// import { Trans  } from '@lingui/react';
import { Trans, Plural, t } from '@lingui/macro';

// export const ErrorFileloadTooBigFileSize = (props) => {
//     const str = (props.number/1000000).toFixed(2);
//     // console.log(str);
//     // const message = <Trans>File is too big. Max. file size is {str} MB.</Trans>;
//     return (<Trans components={{0:<b />}} id={`File is too big. Max. file size is <0>${str}</0> MB.`}/>);
// }
// const str = (0x3000000/1000000).toFixed(2);

// const message = t`Hello ${str}`;

// export const ErrorFileloadTooBigFileSize = (props) => {
//     const str = (props.number/1000000).toFixed(2);

//     // const message = t({
//     //   id: 'msg.hello.greeting',
//     //   // comment: 'Greetings at the homepage',
//     //   message: "Hello {str}"
//     // })
//     // return (<Trans>File is too big. Max. file size is {str} MB.</Trans>
//     // // <Trans id="Hello {name}" values={{ name: 'Arthur' }}/>
//     // );
//         return (<Trans components={{0:<b />}} values={{str}} id='isId' message="File is too big. Max. file size is <0>{str}</0> MB."/>);
// }

export const SuccessFileloadSuccessfull = () =>
<Trans id='success.fileload.successfull'>File is loaded successfully!</Trans>