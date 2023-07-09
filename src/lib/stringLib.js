import Cookies from 'js-cookie';
// import { Cookies } from "react-cookie-consent";
import { CSVtoArray, isCSVvalid, TabTextToArray, isTabTextValid } from '../lib/FileToArray';
import { StateBits } from './bits'

export function preventInjection(html) {return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");}
export function kebabToCamelCase(string) {
        return string.replace(/-([a-z])/g, function (m) { return m[1].toUpperCase(); });
}
export function camelToKebabCase(string) {
        return string.replace(/([a-z][A-Z])/g, function (m) { return m[0] + '-' + m[1].toLowerCase() });
}

function getChar(off) {
        return String.fromCharCode('a'.charCodeAt(0) + off);
}

export function dummyToken(){
        return Math.random().toString(36).substring(2, 12) 
                + Math.random().toString(36).substring(2, 12) 
                + Math.random().toString(36).substring(2, 12);
}

export function getApiKey(obj) {
        let sid = getCookie('XSRF-TOKEN') || dummyToken();
        let date = new Date();
        let offset = date.getSeconds()/12;
        let suffix = Object.keys(obj).reduce((sum, key) => {
                let char = key.charAt(offset);
                if (char === '') char = '-';
                return sum + char; }, '');
        let idx = ++ window.sidx % 8;
        return getChar(offset) + suffix.toLowerCase() 
                + getChar(idx) + sid.charAt(idx);
}

export function getMeta(metaName) {
        const metas = document.getElementsByTagName('meta');

        for (let i = 0; i < metas.length; i++) {
                if (metas[i].getAttribute('name') === metaName) {
                return metas[i].getAttribute('content');
                }
        }

        return '';
}

export function getCookie(name) {
        return Cookies.get(name);
};

export function setCookie(name, value) {
        return Cookies.set(name, value);
};

export function setLocaleCookie(value){
        Cookies.set('locale', value);
        // document.cookie='locale=' + value /*+ ';domain=.' + window.location.origin*/ +  ';path=/'
}

export function readCookie(name)
{
        return getCookie(name);
//     var matches = document.cookie.match('(^|; )'+ name +'=([^;]*)');

//     if (matches) {
//         return decodeURIComponent(matches[2]);
//     }

//     return null;
}

export function getURIParam(parName)
{
    let obj = new URLSearchParams(window.location.search);
    return obj.get(parName);
}

// function onLanguageDetected(langInfo) {
//         for (let lang of  langInfo.languages) {
//                 console.log("Language is: " + lang.language);
//                 console.log("Percentage is: " + lang.percentage);
//         }
// }
      
//       var text = "L'homme est né libre, et partout il est dans les fers."
      
//       var detecting = browser.i18n.detectLanguage(text);
//       detecting.then(onLanguageDetected);
      

export function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
      }

export function devMode()
{
     return (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
}

export function getFileExt (filename) {
        return '.' + filename.split('.').pop();
}
  
export function isEmptyObj(obj) {
        for(var prop in obj) {
                if(Object.prototype.hasOwnProperty.call(obj, prop)) {
                return false;
                }
        }

        return JSON.stringify(obj) === JSON.stringify({});
}

export const isDemoMode = () => {return window.location.pathname === '/demo';}

export const makeHalfPath = (path, splitter, pos = 3) => {
        if (path) return path.split(splitter).slice(pos).join(splitter);
        return null;
}

export const mixState = (state, stuff, fileExt) => {
        const getLineToArrayFunc = (ext) => {
          let /*isValid = isTabTextValid,*/ liToArr = TabTextToArray;
          
          if (ext === '.csv') { /*isValid = isCSVvalid;*/ liToArr = CSVtoArray;}
          return liToArr;
        }
    
        if (!stuff) return null;
    
        let st = stuff.replace(/\r?\n$/g, ''); // deletes the last line at the end of the file
    
        const lineToArray = getLineToArrayFunc(fileExt);
    
        return st.split(/\r?\n/g).map((line, id) => {
          let fields = lineToArray(line), i = id + 1;
          const stId = StateBits.calcObject(state[i]);
          // if (fields !== null && fields.length >= 2) {
            let studied = fields[0].trim(), meaning = fields[1].trim();
            return { id: i, studied, meaning, ...stId};}
          // }
          );
}

export const separateState = (items) => {
        let state = {};
        items.map((obj, idx) => { const {id, studied, meaning, ...item} = obj;
          if (item && !isEmptyObj(item)) { let value = StateBits.calcValue(item); if (value) state[idx + 1] = value;} 
        });
        return state;
      }

function countTrailingZeroes(n) {
        n |= 0; // Turn to 32 bit range
        return n ? 31 - Math.clz32(n & -n) : 0;
    }

export function getPropsByPrefix(object, prefix) {
        let retObject = {};
        for (var property in object) {
                if (//object.hasOwnProperty(property) && 
                property.toString().startsWith(prefix)) {
                        retObject = {...retObject, [property]: object[property]};
                }
        }
        return retObject;
}
      