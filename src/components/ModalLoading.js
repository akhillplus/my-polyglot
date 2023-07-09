import {handleOn} from '../lib/async';

// const startLoading = () => {this.props.openModalMode({id:'circularIndeterminate'});/*this.setState({isLoading: true});*/}
// const endLoading = () => {this.props.closeModalMode();/*this.setState({isLoading: false});*/}

export function modalLoading(func, self, stateProp) {
    function loadingTrigger (flag) { 
        if (!stateProp && flag === true) this.props.openModalMode({id:'circularIndeterminate'});
        else if (stateProp && flag === true){
            this.setState({[stateProp]: true});
            this.props.openModalMode({id:'none', hideBackdrop: true});
        }

        // else if (typeof flag === "object") 
        //   this.props.openModalMode({id:'circularWithValue', value: flag.value, message: flag.message });
        // else if (typeof modalContentInfo === 'string') {
        //   this.setState({[modalContentInfo]: true})
        //   this.props.openModalMode(modalContentInfo);
        // }
        else /*if (flag === false)*/ {
          if (stateProp) this.setState({[stateProp]: false});
          this.props.closeModalMode();
        }
      }

    return (param1, param2) => handleOn(func, loadingTrigger.bind(self), 1200, param1, param2);
}