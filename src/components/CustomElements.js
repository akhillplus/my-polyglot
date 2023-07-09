import React from 'react';
import { css } from 'emotion'; 
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Trans, Plural } from '@lingui/macro';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // '& > * + *': {
    //   marginLeft: theme.spacing(2),
    // },
    // display: 'flex',
    zIndex: 1700,
    // minWidth: 350,
    alignItems: 'center',
    justifyContent: 'center',
    direction: "column",
    justify: "center",
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%, -50%)' 
  },
  alertRoot: {
    display: 'flex',
    // '& > * + *': {
    //   marginLeft: theme.spacing(2),
    // },
    // display: 'flex',
    zIndex: 1700,
    minWidth: 350,
    alignItems: 'center',
    justifyContent: 'center',
    direction: "column",
    justify: "center",
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,

  },
}));
// import PrelodAnimSvg from '../images/search_preloader2.svg';

const Svg = ({ size, ...props }) => (
    <svg
      height={size}
      width={size}
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
      className={css({
        display: 'inline-block',
        fill: 'currentColor',
        lineHeight: 1,
        stroke: 'currentColor',
        strokeWidth: 0,
      })}
      {...props}
    />
  );
   
const DownArrow = (props) => (
    <Svg size={20} {...props}>
    <path d="M7 10l5 5 5-5z"></path>  
    </Svg> 
  );

// export function BackgroundSvg(){
//       return (
//         <svg
//         width="210mm"
//         height="297mm"
//         viewBox="0 0 210 297"
//         version="1.1"
//         id="svg924"
//         // inkscape:version="1.1 (c68e22c387, 2021-05-23)"
//         // sodipodi:docname="favicon112.svg"
//         // xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
//         // xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
//         // xmlns="http://www.w3.org/2000/svg"
//         // xmlns:svg="http://www.w3.org/2000/svg"
//         >
//        {/* <sodipodi:namedview
//           id="namedview926"
//           pagecolor="#ffffff"
//           bordercolor="#666666"
//           borderopacity="1.0"
//           inkscape:pageshadow="2"
//           inkscape:pageopacity="0.0"
//           inkscape:pagecheckerboard="0"
//           inkscape:document-units="mm"
//           showgrid="false"
//           inkscape:zoom="0.21291386"
//           inkscape:cx="488.46045"
//           inkscape:cy="695.11679"
//           inkscape:window-width="1366"
//           inkscape:window-height="706"
//           inkscape:window-x="-8"
//           inkscape:window-y="-8"
//           inkscape:window-maximized="1"
//           inkscape:current-layer="layer1" />
//        <defs
//           id="defs921" /> */}
//        <g
//           // inkscape:label="Слой 1"
//           // inkscape:groupmode="layer"
//           // id="layer1"
//           >
//          <path
//             style="fill:none;fill-opacity:1;fill-rule:evenodd;stroke:#ef0000;stroke-width:4.7;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
//             d="m 66.520555,145.42754 0.007,1.55667 0.14882,30.40775 -8.76411,-0.21668 0.18759,-57.34453 29.422599,40.24273 C 90.202391,141.9697 102.12425,118.65047 126.6329,119.63772 l -0.0377,7.45607 c -19.97557,-1.38518 -43.905638,29.02552 -13.45356,47.92951 16.96388,6.35787 32.13387,-7.89917 31.48255,-20.58929 -13.77656,0.1602 -27.85826,0.34575 -33.05742,0.3206 -0.30894,-0.001 -0.90168,-0.29023 -0.88887,-0.007 l 0.36841,8.14438 20.45573,-0.0585"
//             // sodipodi:nodetypes="ccccccccccsscc"
//             id="path857" />
//        </g>
//      </svg>
//       );
// }  

// import React from "react";

// export const BackgroundSVG = () => {
//   return (
//     <svg
//       width="1440"
//       height="416"
//       viewBox="0 0 1440 416"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <g filter="url(#filter0_f)">
//         <path
//           d="M32.0087 396L1435.89 396C1436.92 396 1437.44 396 1437.86 395.874C1438.83 395.585 1439.58 394.828 1439.87 393.86C1440 393.439 1440 392.923 1440 391.89L1440 25.3211C1440 24.022 1440 23.3724 1439.83 22.8897C1439.44 21.7733 1438.43 20.9917 1437.25 20.8942C1436.74 20.8521 1436.11 21.0162 1434.85 21.3444L30.9703 387.913C24.8649 389.507 21.8121 390.304 21.2343 390.887C19.8575 392.275 20.1544 394.587 21.8372 395.582C22.5435 396 25.6985 396 32.0087 396Z"
//           fill="url(#paint0_linear)"
//           fillOpacity="0.1"
//         />
//       </g>
//       <g filter="url(#filter1_f)">
//         <path
//           d="M1407.99 20L4.11 20C3.07734 20 2.56101 20 2.14043 20.1258C1.17249 20.4153 0.415257 21.1725 0.125781 22.1404C0 22.561 0 23.0773 0 24.11L0 390.679C0 391.978 0 392.628 0.169589 393.11C0.56181 394.227 1.57366 395.008 2.75296 395.106C3.26278 395.148 3.89113 394.984 5.14764 394.656L5.1483 394.656L1409.03 28.0867C1415.14 26.4925 1418.19 25.6954 1418.77 25.1129C1420.14 23.7252 1419.85 21.4125 1418.16 20.4176C1417.46 20 1414.3 20 1407.99 20Z"
//           fill="url(#paint1_linear)"
//           fillOpacity="0.1"
//         />
//       </g>
//       <defs>
//         <filter
//           id="filter0_f"
//           x="0.363708"
//           y="0.887634"
//           width="1459.64"
//           height="415.112"
//           filterUnits="userSpaceOnUse"
//           color-interpolation-filters="sRGB"
//         >
//           <feFlood flood-opacity="0" result="BackgroundImageFix" />
//           <feBlend
//             mode="normal"
//             in="SourceGraphic"
//             in2="BackgroundImageFix"
//             result="shape"
//           />
//           <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur" />
//         </filter>
//         <filter
//           id="filter1_f"
//           x="-20"
//           y="0"
//           width="1459.64"
//           height="415.112"
//           filterUnits="userSpaceOnUse"
//           color-interpolation-filters="sRGB"
//         >
//           <feFlood flood-opacity="0" result="BackgroundImageFix" />
//           <feBlend
//             mode="normal"
//             in="SourceGraphic"
//             in2="BackgroundImageFix"
//             result="shape"
//           />
//           <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur" />
//         </filter>
//         <linearGradient
//           id="paint0_linear"
//           x1="1440"
//           y1="396"
//           x2="0"
//           y2="396"
//           gradientUnits="userSpaceOnUse"
//         >
//           <stop stop-color="#0063FF" />
//           <stop offset="1" stop-color="#46E9FF" />
//         </linearGradient>
//         <linearGradient
//           id="paint1_linear"
//           x1="0"
//           y1="20"
//           x2="1440"
//           y2="20"
//           gradientUnits="userSpaceOnUse"
//         >
//           <stop stop-color="#0063FF" />
//           <stop offset="1" stop-color="#46E9FF" />
//         </linearGradient>
//       </defs>
//     </svg>
//   );
// };

// export default BackgroundSVG;


export function CustomArrow({ innerProps/*, isDisabled */}) {
//    <div {...innerProps}>
  return (
  <DownArrow  {...innerProps} style={{color: 'rgba(0, 0, 0, 0.54)'}} />
  )
//    </div>
}

// export function PreloadAnimation() {
//   return (
// 		  <img src={PrelodAnimSvg} alt='' /*width="100%" height="100%"*//>
//      );
// }

// export const PreloadAnimation = (props) => ( <img src={PrelodAnimSvg} alt='' {...props}/> );
// export const Loading = (props) => ( <ReactLoading type={"bars"} color={"white"} height={80} width={80} {...props}/> );

// style={{ textAlign: 'left', verticalAlign: 'baseline', position:"relative"}}
export const DisableBlock = () => (<div style={{position:"absolute", top:0, left:0, width:"100%", height:"100%",backgroundColor:"white", opacity:".4"}}>
</div>
);

export function CircularIndeterminate() {
  const classes = useStyles();

  return (

  // <Grid item xs={3} className={classes.root}> 
    <div className={classes.root}>
      <CircularProgress size={50} thickness={5}/>
    </div>
    // </Grid>
  );
}

export function CircularProgressWithLabel(props) {
  const classes = useStyles();
  return (
    // <Box position="relative" display="inline-flex" className={classes.root}>
    // <Grid container  direction="column"
    // justify="center"
    // alignItems="center">
    // <Grid item className={classes.root}>
    <div className={classes.root}>
    <Grid container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={0}
    >
    <Grid item>
    <CircularProgress variant='static' /* "determinate" {...props}*/ value={props.value} size={50} thickness={5}/>
      <Box
        top={-20}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textPrimary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
      </Grid>
      <Grid>
      <Typography variant="h7" color="textPrimary">{props.message}</Typography>
      </Grid>
      </Grid>
      </div>
  );
}

export function AlertMessage(props) {
  const classes = useStyles();
  const {message, button, severity, onClick} = 
    typeof props.message === 'object' ? props.message: {message:props.message};
  return (
    <div className={classes.alertRoot}>
    <Alert elevation={6} variant='filled'/*variant="outlined"*/ 
      severity={severity ? severity : 'error'}
      action={ button &&
        <Button color="inherit" size="small" onClick={onClick}>
          {button}
        </Button>
      }>
    <h4>{message}</h4>
    </Alert>
    </div>
    );
  }

export function TabLabel(props) {
  // const classes = useStyles();
  return (
    <div><Radio
      fontSize="inherit"
      checked={props.checked}
      name={props.name}
      color="primary"
      style={{verticalAlign: 'middle'/*, padding:0*/}}/>
      {props.labelText}
    </div>
  )
}
  

