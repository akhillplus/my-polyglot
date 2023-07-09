import React from 'react';
import { Trans } from '@lingui/macro';
// import { t } from "@lingui/macro";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

// import PropTypes from 'prop-types';

import TabContent from './TabContent';
import WLTab1 from './WordlistTab1';
import WLTab2 from './WordlistTab2';
import {TabLabel} from './CustomElements';

//const styles = theme => ({
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    boxShadow: 'none',
    // padding: 8
    // margin: 8
  },
  card: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      flexBasis: '25rem',
      flexGrow: 0
    },
        // padding: 8,
        // marginTop: 18, 
        // marginLeft: 12,
        padding: '5px 5px 0 5px'
  },
  tabRoot: {
    // textTransform: "initial",
    // width: "100%",
    // display: "block",
    opacity: 0.45,

    "&:hover": {
      color: "green",
      opacity: 1,
      // textTransform: "initial"
    },
    "&$tabSelected": {
      color: "green",
      fontWeight: theme.typography.fontWeightMedium,
      // textTransform: "capitalize"
    },
    "&:focus": {
      color: "green",
      // textTransform: "capitalize"
    }
  },
  tabSelected: {},
}));


// class WLTabs extends Component 
function WLTabs(props)
{
  const classes = useStyles();
  const transitionTimeout = props.transitionTimeout || 1000;

        let activeTab = props.tab === 0 ?
              <TabContent>
                <WLTab1  {...props}
                onLangPairChange={props.onLangPairChange(0)}
                // interfaceLang={interfaceLang}
                learnedLang={props.uDicLearnedLang}
                motherLang={props.uDicMotherLang}
                // onLangPairChange={onLangPairChange(tab)}
                // //// specialtyFieldOptions={specialtyFieldOptions}
                // onFileChange={onFileChange}
                // onFileUpload={onFileUpload}
                // onChangeSpecialtyFields={onChangeSpecialtyFields}
                // uDicPanelOpen={uDicPanelOpen}
                // uDicPath={uDicPath}
                // uDicName={uDicName}
                // uDicDescription={uDicDescription}
                // uDicSpecialty={uDicSpecialty}
                // uDicSubspecialty={uDicSubspecialty}
                // //// uDicAgreed={uDicAgreed}
                // onPanelExpanded={onPanelExpanded}
                // onChangeName={onChangeName}
                // onChangeDescription={onChangeDescription}
                // onChangeAgreed={onChangeAgreed}
                // //// resolver={resolver}
                // messenger={messenger}
                helperTexts={[]}
                />
              </TabContent> : 
          //   break;
    
          // case 1:
            // activeTab =
              <TabContent>
                <WLTab2 {...props}
                onLangPairChange={props.onLangPairChange(1)}
                // interfaceLang={interfaceLang}
                learnedLang={props.learnedLang}
                motherLang={props.motherLang}
                // onLangPairChange={onLangPairChange(tab)}
                // specialtyFieldOptions={specialtyFieldOptions}
                // onChangeSpecialtyFields={onChangeSpecialtyFields}
                // dicSpecialty={dicSpecialty}
                // dicSubspecialty={dicSubspecialty}
                // onMinChange={onMinChange}
                // onMaxChange={onMaxChange}
                // // resolver={resolver}
                // messenger={messenger}
                />
              </TabContent>;
            // break;
        // }

        return (
          <Card className={classes.card}>
            {/* <div className={classes.root}> */}
          <Tabs
              value={props.tab}
              onChange={props.onTab}
              indicatorColor="primary"
              textColor="inherit"
              // variant="fullWidth"
            >
              <Tab /*value='true'*/ 
              // style={{textTransform: 'capitalize'}} 
              label={<TabLabel 
                checked={props.tab === 0}
                name="uDicIsSelected"
                labelText={<Trans>Custom word list</Trans>}/>}
                classes={{
                root: classes.tabRoot,
                selected: classes.tabSelected }}/>
              <Tab disabled={!props.user}/*value='false'*/ 
              // style={{textTransform: 'capitalize'}} 
              label={<TabLabel
                checked={props.user && props.tab !== 0}
                name="uDicIsSelected"
                labelText={<Trans>Server word list</Trans>} />}
              classes={{
                root: classes.tabRoot,
                selected: classes.tabSelected }}/>
            </Tabs>
            {
            transitionTimeout > 0 ?
              <Fade key={props.tab} in={true} timeout={transitionTimeout}>
                {activeTab}
              </Fade>
              : activeTab
            }
            </Card>
        );
      // }
};

// export default withStyles(styles)(WLTabs);
export default WLTabs;
