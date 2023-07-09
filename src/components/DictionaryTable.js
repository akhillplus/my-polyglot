import React from 'react';
// import { connect } from "react-redux";
import classNames from 'classnames';
import PropTypes from 'prop-types';
// import { i18n } from "@lingui/core";
// import { useLingui } from "@lingui/react";
// import { t } from "@lingui/macro";
// import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
// import TableFooter from '@material-ui/core/TableFooter';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
//import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
//import DeleteIcon from '@material-ui/icons/Delete';
//import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
// import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import green from '@material-ui/core/colors/green';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { OptionTooltip } from './ComboBoxes';
import { Grid } from '@material-ui/core';
// import UnsortedModeIcon from '@material-ui/icons/FormatListNumbered';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
//format_list_numbered FormatListNumbered
import { t, defineMessage, Trans } from "@lingui/macro";

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
    marginTop: 0
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
);
          
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  // console.log(stabilizedThis);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

// function outOfSorting(){return (a, b) => {return 0;};}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 0, 
    paddingTop: 0,
    paddingBottom: 0,// theme.spacing(3),
    // color: green[600],
    // '&$checked': {
    //   color: green[500],
    // },
  },
  superhead: {backgroundColor: green[400],
    flexGrow: 1,
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold'

    //'green',//"#efefef",//'rgba(76, 175, 80, 0.35)'
  },
  head: {
    // paddingRight: 5,
    // border: 'none',
    // borderRadius: 4,
    // color: "green",
    // backgroundColor: 'rgba(76, 175, 80, 0.35)', //'green', //"#efefef",
    backgroundColor: green[50],
    position: "sticky",
    top: 0,
    align: 'center',
    height: 50
  },
  table: {
 //   minWidth: 200,
//    height: 100,
   tableLayout: "fixed"
  },
  tableWrapper: {
    overflow: 'auto',
  },
  row: {
    // height: 25,
    // '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.background.default,
    // },
  },
  сheckBoxCell: {
    width: 60,
    padding: 0,
    // border: 'none',
    // borderRadius: 4,
    // color: "green"
    // backgroundColor: 'rgba(76, 175, 80, 0.35)', //'green', //"#efefef",

  },

  langCells: {
    align: 'center'
  },

  tableLayout: 'fixed',
  //tableBodyHeight: { height: 100 }
  tableSortLabelRoot: {
    color: 'green',
    fontSize: '0.9rem',
    '&:hover': {
      color: 'green',
      fontSize: '1rem'
    }, 
    '&:focus': {
      color: 'green',
      fontSize: '1rem'
    } 
  },
  tableSortLabelActive: {
    color: 'green',
    fontSize: '1rem'
  },
  input: {
    marginLeft: 0,
    padding: 0, // '7px 0px 6px 0px'
    // flex: 1,
    fontSize: '0.9rem'
  },
  iconButton: {
    padding: 0,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  button: {
    // width: 8 * theme.spacing(1),
    // height: 8 * theme.spacing(1),
    padding: 0,
    color: theme.palette.secondary.main,
    "&$buttonDisabled": {
        color: '#9FA8DA'//theme.palette.indigo[900]
    }
  },
  buttonDisabled: {},
});

// class EnhancedTableHead extends React.Component {
//   createSortHandler = property => event => {
//     this.props.onRequestSort(event, property);
//   };
let EnhancedTableHead = ({ /*onSelectAllClick, */sortable, order, orderBy, learnedLang, motherLang, 
  studiedFilterText = '', meaningFilterText = '', classes={}, 
  handleChangeTableFilters=f=>f, handleClearTableFilters=f=>f,
  onRequestSort=f=>f/*numSelected, rowCount*/,
  onChangeSortable=f=>f}) => {
      const rows = [
        { id: 'studied', numeric: false, disablePadding: true, label: learnedLang ? learnedLang.name : '???' },
        { id: 'meaning', numeric: false, disablePadding: true, label: motherLang ? motherLang.name : '???' }
        //{ id: 'included', numeric: true, disablePadding: false, label: 'Fat' },
        //{ id: 'indicator2', numeric: true, disablePadding: false, label: 'Carbs' },
      ];
      let sortLabelTooltip = t`Sort`, 
      columnFilterTooltip = t`Search`, columnFilterPlaceholder = t`Search…`;
      return (
       <TableHead>
         <TableRow className={classes.superhead}>
         <TableCell classes={{root: classes.сheckBoxCell}}
          padding="default"/*"checkbox"*/
          />
         <TableCell className={classes.superhead}> <Trans>Word List Table</Trans>
           </TableCell>
         <TableCell />
         </TableRow>
        <TableRow className={classes.head}>
          <TableCell  
          classes={{root: classes.сheckBoxCell}}
          padding="default"/*"checkbox"*/
          // children={ 
          //   <FormControlLabel
          //   value="top"
          //   control={<Switch color="primary" size="small" onChange={onChangeSortable}/>}
          //   label={<Typography style={{fontSize:13}}><Trans>Sort</Trans></Typography>}
          //   labelPlacement="top"
          // />
          //   <Button /*size="small" */
          //   onClick={() => {}}
          //   value={false} aria-label="bold">
          //   <UnsortedModeIcon fontSize="small" />
          // </Button>
          // }

          >
            {/* <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            /> */}
          <FormControlLabel
            value="top"
            control={<Switch color="primary" size="small" onChange={onChangeSortable}/>}
            label={<Typography style={{fontSize:11}} color="primary"><Trans>Sortable</Trans></Typography>}
            labelPlacement="top"
          />

          </TableCell>

          {rows.map(
            (row) => (
              <TableCell
                className={classes.head}
                key={row.id}
                align='center'//{row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
              <Grid container direction='column'>
              <Grid item style={{paddingTop: 10}}>
                 <OptionTooltip
                  title={sortable ? sortLabelTooltip : ''}                  
                  placement={'bottom-start'}
                  enterDelay={300}
                > 
                  <TableSortLabel
                    active={sortable && orderBy === row.id}
                    hideSortIcon={!sortable}
                    color='primary'
                    direction={order}
                    onClick={(event) => onRequestSort(event, row.id)}
                    classes={{
                      root: sortable ? classes.tableSortLabelRoot: classes.tableSortLabelActive,
                      active: classes.tableSortLabelActive
                    }}
                  >
                    <span>
                    {`${row.label} `}
                    {row.id === 'studied' && 
                    <em><small><Trans>(learned)</Trans></small></em>}
                    </span>
                  </TableSortLabel>
                </OptionTooltip>

              </Grid>
              <Grid>
              {/* <IconButton disabled color="secondary"  */}
              {/* classes={{ root: classes.button, disabled: classes.buttonDisabled }}
              className={classes.iconButton}  aria-label="Search"> */}
              {/* <SearchIcon /> */}
              {/* </IconButton> */}
              <OptionTooltip
                  title={columnFilterTooltip}
                  placement={'bottom-start'}
                  enterDelay={300}
              > 

              <InputBase
              className={classes.input}
              placeholder={columnFilterPlaceholder}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon fontSize='small' style={{color: 'rgba(0, 0, 0, 0.34)'}}
                  onClick={() => {document.getElementById(row.id === 'studied' ? 'studiedFilterText': 'meaningFilterText').focus();}}
                  />
                </InputAdornment>
              }
              endAdornment={
                <IconButton color="primary" 
                disabled={row.id === 'studied' ? 
                  studiedFilterText === '' : meaningFilterText === ''}
                className={classes.iconButton} aria-label="Clear"
                onClick={handleClearTableFilters(row.id)}>
                <ClearIcon fontSize='small'/>
                </IconButton>
              }
              // inputRef={(input) => { this.nameInput = row.id === 'studied' ? 'studiedInput' : 'motherInput'}}
              inputProps={{ 'aria-label': 'Search in column', 
                id: row.id === 'studied' ? 'studiedFilterText': 'meaningFilterText'}}
              onChange={handleChangeTableFilters(row.id)}
              dir={row.id === 'studied' ? (learnedLang && learnedLang.rtl ? 'rtl' : 'ltr') : 
                    (motherLang && motherLang.rtl ? 'rtl' : 'ltr')}
              />
              </OptionTooltip>
              {/* <Divider className={classes.divider} /> */}
              </Grid>
              </Grid>
              </TableCell>
              ),
            this,
          )}
          </TableRow>
      </TableHead>
      )
}

EnhancedTableHead.propTypes = {
 // numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
 // onSelectAllClick: PropTypes.func.isRequired,
  // order: PropTypes.string.isRequired,
  // orderBy: PropTypes.string.isRequired,
 // rowCount: PropTypes.number.isRequired,
};

EnhancedTableHead = withStyles(styles)(EnhancedTableHead);

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = ({ numSelected, classes={}}) =>
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Dictionary
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      {/* <div className={classes.actions}>
        {numSelected > 0 ? (
          <OptionTooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </OptionTooltip>
        ) : (
          <OptionTooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </OptionTooltip>
        )}
      </div> */}
    </Toolbar>


EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};


EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

//   handleSelectAllClick = event => {
//     if (event.target.checked) {
//       this.setState(state => ({ selected: state.data.map(n => n.id) }));
//       return;
//     }
//     this.setState({ selected: [] });
//   };
//const gunnarStyle       = { height: "30px", padding: "0px"};

const tableStyles = theme => ({
  root: {
  //   paddingRight: theme.spacing(1),
  },
  tableRow: {
    height: 30,
    // padding: '5px 16px 5px 16px'
  },
  tableCellPadding : {
  padding: '5px 16px 5px 16px'
  },
  tableLayout: {
    //   minWidth: 200,
   //    height: 100,
      tableLayout: "fixed"
     },
})

const EnhancedTable = ({classes={}, page=0, rowsPerPage=5, 
      data, order, sortable, orderBy, learnedLang, motherLang, 
      studiedFilterText = '', meaningFilterText = '',
      MAX_TABLE_STRLEN = 80, MAX_TABLE_TOOLTIP_STRLEN = MAX_TABLE_STRLEN + 1000,
      onChangeSortable=f=>f,
      handleChangeTableFilters=f=>f, handleClearTableFilters=f=>f,
      handleRequestSort=f=>f, handleIncluded=f=>f,
      handleChangePage=f=>f, handleChangeRowsPerPage=f=>f}) =>
      {
        // const maxCellStrLen = 80;
        let numSelected = data.length,
            emptyRows = getEmptyRows(page, rowsPerPage, data.length);
        let learnedLangAlign = (learnedLang && learnedLang.rtl === true) ? 'right': 'left';
        let motherLangAlign = (motherLang && motherLang.rtl === true) ? 'right': 'left';

        return (
        <Paper  style={{/*marginTop: 18, */padding: '5px 5px 0 5px'/*, backgroundColor: green[50]*/}}>
          <TableContainer><Table className={classes.tableLayout} aria-labelledby="tableTitle">
            <EnhancedTableHead
              sortable={sortable}
              numSelected={numSelected}
              order={order}
              orderBy={orderBy}
              learnedLang={learnedLang}
              motherLang={motherLang}
 //             onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              studiedFilterText={studiedFilterText}
              meaningFilterText={meaningFilterText}
              handleChangeTableFilters={handleChangeTableFilters}
              handleClearTableFilters={handleClearTableFilters}
              onChangeSortable={onChangeSortable}
            />
          {/* </Table> */}
         {/* </div> */}
                 {/* <div className={classes.tableWrapper}> */}

            {/* <div className={classes.tableBodyHeight}> */}
            {/* <Table className={classes.table}> */}
            <TableBody>
              { (sortable ? stableSort(data, getSorting(order, orderBy)) : data)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = (n.ex === undefined || n.ex === false); //selected.indexOf(n.id) !== -1;
                  return (
                    <TableRow
                      hover
                      /*onClick={event => handleIncluded(event, n.id)}*/
                      className={classes.tableRow} 
//                      style={gunnarStyle}
//                      role="checkbox"
//                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      // selected={isSelected}
                    >
                      <OptionTooltip
                        title={ isSelected ? t`Included to list` : t`Excluded from list`}
                        placement={'bottom-start'}
                        enterDelay={300}
                      >
                      <TableCell //style={gunnarStyle} 
                      // classes={{root: classes.tableCheckBoxCell}}
                      padding="checkbox">
                        <Checkbox
                        // classes={{
                        //   root: classes.root,
                        //   checked: classes.checked,
                        // }}
                        style={{ width: 25, height: 25,  padding: '5px 16px 5px 16px'}}
                        icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 20 }} />}
                        color="primary"
                        checkedIcon={<CheckBoxIcon style={{ fontSize: 20 }} />}
                        checked={isSelected} onChange={(event, checked)=> handleIncluded(event, n.id, checked) } />
                      </TableCell>
                      </OptionTooltip>
                      <OptionTooltip
                        title={n.studied.length > MAX_TABLE_TOOLTIP_STRLEN ? ( `${n.studied.substring(0, MAX_TABLE_TOOLTIP_STRLEN - 1)}…`) : n.studied}
                        placement={'bottom-start'}
                        enterDelay={300}
                      >
                      <TableCell //style={gunnarStyle} align="left" 
                      // component="div" 
                      scope="row" //padding="none"
                      align={learnedLangAlign}
                      className={classes.tableCellPadding}
                      // style={{direction: learnedLang.rtl === true ? 'rtl': "ltr"}}
                      dir={learnedLang && learnedLang.rtl === true ? "rtl": "ltr"}
                      >
                      { n.studied.length > MAX_TABLE_STRLEN ? 
                      ( `${n.studied.substring(0, MAX_TABLE_STRLEN - 1)}…`) : n.studied}
                      </TableCell>
                      </OptionTooltip>
                      <OptionTooltip
                        title={n.meaning.length > MAX_TABLE_TOOLTIP_STRLEN ? ( `${n.meaning.substring(0, MAX_TABLE_TOOLTIP_STRLEN - 1)}…`) : n.meaning}                  
                        placement={'bottom-start'}
                        enterDelay={300}
                      >
                      <TableCell //style={gunnarStyle} align="left" 
                      // component="div" 
                      scope="row" //padding="none"
                      align={motherLangAlign}
                      className={classes.tableCellPadding}
                      // style={{direction: motherLang.rtl === true ? 'rtl': "ltr"}}
                      dir={motherLang && motherLang.rtl === true ? "rtl": "ltr"}
                      >
                        { n.meaning.length > MAX_TABLE_STRLEN ? ( `${n.meaning.substring(0, MAX_TABLE_STRLEN - 1)}…`) : n.meaning}
                      </TableCell>
                      </OptionTooltip>
                      {/* <TableCell align="right">{n.fat}</TableCell> */}
                      {/* <TableCell align="right">{n.carbs}</TableCell>
                      <TableCell align="right">{n.protein}</TableCell> */}
                    </TableRow>
                  );
                })}
              { emptyRows > 0 && (
                <TableRow style={{ height: 30 * emptyRows }}>
                  {/* { <TableCell colSpan={6} /> } */}
                </TableRow>
              )}
            </TableBody>
            {/* <TableFooter>
            </TableFooter> */}
            </Table></TableContainer>
            <table /* style={tableStyle}*/>
            <tbody>
       <tr /*style={rowStyle}*/>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                // component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true,
                }}
                //spacer={{align: "center"}}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActionsWrapped}
              />
              </tr></tbody></table>
          </Paper>
      )
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  // numSelected: PropTypes.number.isRequired
};

const getEmptyRows = (page, rowsPerPage, length) => (
  rowsPerPage - Math.min(rowsPerPage, length - page * rowsPerPage)
) 

export default withStyles(tableStyles)(EnhancedTable)

// const DictionaryTable = connect(
//     (state) =>
//     ({
//       data: state.dictionary.items,
//       numSelected: state.dictionary.items.length,
//       order: state.dictionary.order,
//       orderBy: state.dictionary.orderBy,
//       rowsPerPage: state.dictionary.rowsPerPage,
//       page: state.dictionary.page,
//       emptyRows: getEmptyRows(state.dictionary.page, state.dictionary.rowsPerPage, state.dictionary.items.length)
//     }),
//     (dispatch, ownProps) =>
//     ({
//     handleRequestSort(ev, property){

//       let orderBy = property;
//       let order = 'desc';
  
//       if (ownProps.orderBy === property && ownProps.order === 'desc') {
//         order = 'asc';
//       }
//       dispatch(changeDicOrders(order, orderBy))
//     },
//     handleIncluded(event, id, checked/*, selected*/){
//      // handleClick(id, selected)
//      event.target.checked = !checked
//       dispatch(checked ? includeDicItem(id) : excludeDicItem(id))
//     },
//     handleChangePage(event, page){
//       dispatch(changePage(page))
//     },
//     handleChangeRowsPerPage(event){
//       dispatch(changeRowsPerPage(parseInt(event.target.value)))
//     }
//   }))(EnhancedTable);


// export default withStyles(styles)(DictionaryTable);
