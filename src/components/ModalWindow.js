import React, {Component} from 'react';
// import ReactModal from 'react-modal';

let overlayStyle = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1240,
  backgroundColor: 'rgba(126,126,126, 0.6)',
}, contentStyle = {
  top: '15%',
  // left: screenWidth < 550 ? '20%': '35%',
  left: '35%',
  //// [theme.breakpoints.down('sm')]: {
  ////   left: '20%'
  //// },
  right: 'auto',
  bottom: 'auto',
  border: 'none',
  zIndex: 1250,
  backgroundColor: 'rgba(126,126,126, 0.6)', // 'rgba(170,170,170, 0.58)', //
  color: 'none',
  padding: 0,
  position: 'inherit',
  minWidth: 350
};

let style = {
 overlay: overlayStyle,
  content: contentStyle
};

export default class ModalWindow extends Component/*({ props })*/ {
      render () {
        let osc = this.props.overlayStyleChange, csc = this.props.contentStyleChange;
        let oStyle = {...overlayStyle, ...osc}, cStyle = {...contentStyle, ...csc};
        // console.log(oStyle, cStyle);
        return (
        <ReactModal
        closeTimeoutMS={100}
        //// parentSelector={getParent}
        {...this.props}
        // style={{...overlayStyle, overlay: osc}, 
        //         {...contentStyle, content: csc}}
          style={{...style, overlay: oStyle, content: cStyle }}
        >
        {this.props.children}
        </ReactModal>
      )
      }
}