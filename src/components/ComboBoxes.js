/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, Tooltip } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { i18n } from "@lingui/core";
// import { t } from "@lingui/macro";
import { t, defineMessage, Trans } from "@lingui/macro";

// const i18n = setupI18n();

function aTooltip(props){
  // if (props.title) 
  const title = props.title;
  return <Tooltip {...props} title={title ? title: ''} enterDelay={300}/>
};

export const OptionTooltip = withStyles({

  tooltip: {
    fontSize: "1em",
    // color: "yellow",
    // backgroundColor: "blue"
  }
})(aTooltip);

function createWordlistTooltipLabel(value)
{
  const {items, owner_id, descr} = value;
  return (
    <><em>{items && items.toString()} </em>
    {/* <Trans>items by</Trans> <b>{owner_id.toString()}</b><br />{descr} */}
    <Trans>items</Trans><br />{descr}
    </>
    );
}

const formatOptionLabel = (option) => { 
  // const { value, label, description } = option;
  return (option &&
  <OptionTooltip title={option.label}>

  {/* <div style={{ display: "flex" }}> */}
  {/* <div style={{minWidth: 40, textAlign: 'right', marginRight:14}}>{value}</div> */}
  <div>{option.label}</div>
    {/* <div style={{ marginLeft: "10px", color: "#ccc" }}>
      {description}
    </div> */}
  {/* </div> */}
  </OptionTooltip>)
};

const formatWordlistOptionLabel = (option) => (
  // { size = '00000000', author='Anonymous', label, description }
    <OptionTooltip 
      title={createWordlistTooltipLabel(option)}
    >
  
    <div style={{ display: "flex" }}>
    <div style={{minWidth: 40, textAlign: 'right', marginRight:14}}>{option.items.toString()}</div>
    <div>{option.name}</div>
      {/* <div style={{ marginLeft: "10px", color: "#ccc" }}>
        {description}
      </div> */}
    </div>
    </OptionTooltip>
  );

// export const ComboBox = React.forwardRef((props, ref) => {
export function ComboBox(props){
  const { clearOnBlur, handleHomeEndKeys, textFieldLabel, ...rest } = props;

  return (
    <Autocomplete
      {...rest}
      // clearOnBlur={clearOnBlur}
      // handleHomeEndKeys={handleHomeEndKeys}
      // textFieldLabel={textFieldLabel}

      // handleHomeEndKeys={handleHomeEndKeys}
    //   id={props.id} //"list-option"
      // debug
      ListboxComponent={innerProps => <div {...innerProps} />}
      getOptionSelected={(option, value) => option.label === value.label || option.label === '' }
      
      getOptionLabel={(option) => {
        if (!option) return '';
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if ("inputValue" in option && option.inputValue) {
          return option.inputValue;
        }
        // else return '';
   
        // Regular option
        return option.label;
      }}
      // getOptionSelected={(option, value) => option.label === value.label || option.label === ''}
      // renderOption={formatOptionLabel}
      // renderInput={}
    />
  );
};
// });

export function SearchSelect(props){
// export const SearchSelect = React.forwardRef((props, ref) => {
  const { error, /*clearOnBlur, handleHomeEndKeys, */textFieldLabel, loading, ...rest } = props;
  return (
  <ComboBox {...rest} 
    // ref={ref}
    // clearOnBlur={clearOnBlur}
    // handleHomeEndKeys={handleHomeEndKeys}
    // textFieldLabel={textFieldLabel}
    renderOption={formatOptionLabel}
    loading={loading}
    renderInput={params => {
      // console.log('params', params);
      // console.log('props', props);
      return (
      <OptionTooltip title={params.inputProps.value}>
      <TextField
        {...params}
        label={textFieldLabel}
        margin="dense"
        // variant="outlined"
        fullWidth
        error={error}
        // maxLength="2"
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {loading ? <CircularProgress color="primary" size={20} /> : null}
              {params.InputProps.endAdornment}
            </>
          ),
        }}
        />
      </OptionTooltip>)
    }}
    />);
};
// });

// function(a, b) {
//   var keyA = new Date(a.updated_at),
//     keyB = new Date(b.updated_at);
//   // Compare the 2 dates
//   if (keyA < keyB) return -1;
//   if (keyA > keyB) return 1;
//   return 0;
// }

function baseCompFunc(keyA, keyB) {
  if (keyA < keyB) return -1;
  if (keyA > keyB) return 1;
  return 0;
}

export const DicSortingCriteria = [
  {value: 'none', label: defineMessage({message: 'No sort'}), 
    compFunc: undefined },
  {value: 'subs0', label: defineMessage({message: 'Subscriptions ↓'}), 
    compFunc: (a, b) => a.subscrs - b.subscrs},
  {value: 'subs1', label: defineMessage({message: 'Subscriptions ↑'}),
    compFunc: (a, b) => b.subscrs - a.subscrs},
  {value: 'n0', label: defineMessage({message: 'Name ↓'}),
  compFunc: (a, b) => baseCompFunc(a.name.toUpperCase(), b.name.toUpperCase())},
  {value: 'n1', label: defineMessage({message: 'Name ↑'}),
  compFunc: (a, b) => baseCompFunc(b.name.toUpperCase(), a.name.toUpperCase())},
  {value: 'items0', label: defineMessage({message: 'Items ↓'}),
    compFunc: (a, b) => a.items - b.items},
  {value: 'items1', label: defineMessage({message: 'Items ↑'}),
    compFunc: (a, b) => b.items - a.items},
  {value: 's0', label: defineMessage({message: 'Size ↓'}),
    compFunc: (a, b) => a.size - b.size},
  {value: 's1', label: defineMessage({message: 'Size ↑'}),
  compFunc: (a, b) => b.size - a.size},
  {value: 'cr0', label: defineMessage({message: 'Created ↓'}),
  compFunc: (a, b) => baseCompFunc(new Date(a.created_at), new Date(b.created_at))},
  {value: 'cr1', label: defineMessage({message: 'Created ↑'}),
  compFunc: (a, b) => baseCompFunc(new Date(b.created_at), new Date(a.created_at))},
  {value: 'ud0', label: defineMessage({message: 'Updated ↓'}),
  compFunc: (a, b) => baseCompFunc(new Date(a.updated_at), new Date(b.updated_at))},
  {value: 'ud1', label: defineMessage({message: 'Updated ↑'}),
  compFunc: (a, b) => baseCompFunc(new Date(b.updated_at), new Date(a.updated_at))}
];

export function SortBySelect(props)
{
  const { value, textFieldLabel/*, ...rest*/ } = props;
  const options = DicSortingCriteria.map(item => 
    ({ value: item.value, label: i18n._(item.label.id)}));
  const val = options.find(item => item.value === value);
  return (
  <ComboBox {...props}
  options={options}
  value={val}
  // loading={true}
  disableClearable={true}
  getOptionLabel={option => option.label}

    renderOption={formatOptionLabel}
    renderInput={params => {
      // console.log({props.value.label});
      return (
      <OptionTooltip title={params.inputProps.value}>
      <TextField
        {...params}
        label={textFieldLabel}
        margin="dense"
        fullWidth
      />
      </OptionTooltip>)
    }}
    />);
}

export function SearchWordlistSelect(props)
{
  const { value, textFieldLabel, loading, clearOnBlur, ...rest } = props;
  return (
  <Autocomplete {...rest} 
  value={value}
  loading={loading}
  // clearOnBlur={true}
    renderOption={formatWordlistOptionLabel}
    getOptionLabel={option => option.name}
    // getOptionSelected={(option, value) => option.id === value.id || option.name === ''}
    renderInput={params => {
      // console.log({props.value.label});
      // let value = params.inputProps.value;
      return (
      <OptionTooltip title={(value && value.id) ? createWordlistTooltipLabel(value) : ''}>
      <TextField
        {...params}
       // value={value.name}
        label={textFieldLabel}
        margin="dense"
        fullWidth
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {loading ? <CircularProgress color="primary" size={20} /> : null}
              {params.InputProps.endAdornment}
            </>
          ),
        }}
      />
      </OptionTooltip>)
    }}
    />);
}