import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Input from '@material-ui/core/Input';

// import { t, Trans } from "@lingui/macro";

import { DisableBlock } from './CustomElements';

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary, //secondary,
    // backgroundColor: theme.palette.grey[100],    

    '&:hover > $content': {
      backgroundColor: theme.palette.grey[400],//theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
//   content: {
//     color: theme.palette.text.secondary,
//     borderTopRightRadius: theme.spacing(2),
//     borderBottomRightRadius: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//     fontWeight: theme.typography.fontWeightMedium,
//     '$expanded > &': {
//       fontWeight: theme.typography.fontWeightRegular,
//     },
//   },
//   group: {
//     marginLeft: 0,
//     '& $content': {
//       paddingLeft: theme.spacing(2),
//     },
//   },
//   expanded: {},
//   selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
    '&:hover > $content': {
      backgroundColor: theme.palette.grey[400],//theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: theme.palette.grey[400],//theme.palette.action.hover,
      // backgroundColor: 'transparent',
    },
    // backgroundColor: theme.palette.grey[400],    
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
    '&:hover > $content': {
      backgroundColor: theme.palette.grey[400],//theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: theme.palette.grey[400],//theme.palette.action.hover,
      // backgroundColor: 'transparent',
    },
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
    fontSize:15
  },
  inputRight: {
    textAlign: "right",
    fontSize:15
  },
  resize:{
    fontSize:15
  },
}));

export function LabelValue(props){
  const classes = useTreeItemStyles();
  const { name, value, label, min, max, step, onChange} = props.info;
  return (
  <>
  {label && <label for={name} className={classes.resize}>{label}</label>}
  {label && ': '}
  <Input
  id={name}
  name={name}
  value={value}
  readOnly={false}
  // fullWidth
  // disabled={true}
  type="number"  
  classes={{
    input: classes.inputRight,
   }}
  inputProps={{ min, max, step }}
  onChange={onChange}
  /></>
  );
}

function DataSheetRow(props) {
  const classes = useTreeItemStyles();
  const { prefix, checked, onCheck, labelText, labelName, key, nodeId, onChange, labelInfo,
    labelIcon: LabelIcon/*, color, bgColor,*/  , ...other} = props;

  return (
    <TreeItem
      nodeId={nodeId}
      key={key}
      label={
        <div className={classes.labelRoot}>
         <LabelIcon checked={checked} onChange={onCheck} size='small' color="primary" className={classes.labelIcon} />
          <Grid container style={{ textAlign: 'left', verticalAlign: 'baseline', position:"relative"}}
          direction="row"
          // justify="flex-start"
          alignItems="center"
          justify="space-between"
          // spacing={1}
          // alignItems="flex-start"
          >
          {/* <LabelIcon checked={check} size='small' color="primary" className={classes.labelIcon} /> */}
          {/* <div style={{ textAlign: 'left', verticalAlign: 'baseline', position:"relative"}}> */}
          <Grid item xs={2} >
          <Typography variant="subtitle1" className={classes.labelText}>
            {labelText}
          </Typography>
          </Grid>
          
          {/* <Typography variant="caption" color="inherit"> */}
            {labelInfo.map((item, index) => {
            const { value, subLabel, subName, ...other } = item;
            return (
            <Grid item xs={8/labelInfo.length /*+ index - 1*/} wrap='nowrap'>
              {/* <Box flexShrink={0}> */}
              <LabelValue /*disabled={!check} */info={{name: prefix + subName + labelName, onChange, 
              value, label: subLabel, min: item.min, max: item.max, step: item.step}}/>
              {/* </Box> */}
            </Grid>)
            }
            )}
          {/* </Typography> */}
          {!checked && <DisableBlock />}
          {/* <div style={{position:"absolute", top:0, left:0, width:"100%", height:"100%",backgroundColor:"white", opacity:".4"}}>
          </div> */}
          </Grid>
        </div>
      }
    //   style={{
    //     '--tree-view-color': color,
    //     '--tree-view-bg-color': bgColor,
    //   }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

DataSheetRow.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
//   labelIcon: PropTypes.elementType.isRequired,
  // labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export function DataSheetView(props) {
  const {labelText, data, onChange, prefix, checkedItems, onCheck} = props;
  const classes = useStyles();

  return (
    <>
    <TreeView
    //   className={classes.root}
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      <TreeItem key={-1} nodeId={'-1'} label={labelText} 
    //   labelIcon={Label}
      >
        {
        data.map((item, idx) => {
        return (
        <DataSheetRow key={idx} nodeId={idx.toString()} prefix={prefix} onChange={onChange} 
          labelText={item.labelText} labelName={item.labelName} labelInfo={item.labelInfo}
          labelIcon={Checkbox} checked={checkedItems[idx]} onCheck={onCheck(idx)}
          
          // labelIcon={<Checkbox
          //       color='primary'
          //       edge="start"
          //       checked={true}
          //       tabIndex={-1}
          //       disableRipple
          //       // inputProps={{ 'aria-labelledby': labelId }}
          //     /> }

        />
        );})}
      </TreeItem>
    </TreeView>
    </>
  );
}
