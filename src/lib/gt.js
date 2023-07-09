/* eslint-disable no-unused-expressions, no-mixed-operators, no-redeclare, no-sequences, eqeqeq*/
// https://www.autohotkey.com/boards/viewtopic.php?style=17&f=6&t=63835
// an alternative: https://www.npmjs.com/package/google-translate-token

import { devMode } from './stringLib';

import axios from 'axios';
// import curlirize from 'axios-curlirize';
// import { getCookie } from './stringLib';
// Ensure environment variables are read.

      var TKK = ((function() {
        var a = 561666268;
        var b = 1526272306;
        return 406398 + '.' + (a + b);
      })());

      function b(a, b) {
        for (var d = 0; d < b.length - 2; d += 3) {
            var c = b.charAt(d + 2),
                c = "a" <= c ? c.charCodeAt(0) - 87 : Number(c),
                c = "+" == b.charAt(d + 1) ? a >>> c : a << c;
            a = "+" == b.charAt(d) ? a + c & 4294967295 : a ^ c
        }
        return a
      }

      function tk(a) {
          for (var e = TKK.split("."), h = Number(e[0]) || 0, g = [], d = 0, f = 0; f < a.length; f++) {
              var c = a.charCodeAt(f);
              128 > c ? g[d++] = c : (2048 > c ? g[d++] = c >> 6 | 192 : (55296 == (c & 64512) && f + 1 < a.length && 56320 == (a.charCodeAt(f + 1) & 64512) ?
              (c = 65536 + ((c & 1023) << 10) + (a.charCodeAt(++f) & 1023), g[d++] = c >> 18 | 240,
              g[d++] = c >> 12 & 63 | 128) : g[d++] = c >> 12 | 224, g[d++] = c >> 6 & 63 | 128), g[d++] = c & 63 | 128)
          }
          a = h;
          for (d = 0; d < g.length; d++) a += g[d], a = b(a, "+-a^+6");
          a = b(a, "+-3^+b+-f");
          a ^= Number(e[1]) || 0;
          0 > a && (a = (a & 2147483647) + 2147483648);
          a %= 1E6;
          return a.toString() + "." + (a ^ h);
      }

export function detectLanguage(str, tl='en', sl='auto')
{
  const proxyurl = '/proxy'; //window.location.origin +'/proxy.php'; // ?csurl='
  // const proxyurl = 'http://localhost:8000/';//process.env.REACT_APP_CORSPROXY;
  // const proxyurl = devMode() ? process.env.REACT_APP_CORSPROXY : '';
  // console.log(process.env.REACT_APP_NAME, 'proxyurl', proxyurl);
  // const proxyurl = "https://cors-anywhere.herokuapp.com/";
  let parameters = `single?client=t&sl=${sl}&tl=${tl}&hl=${tl}&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&otf=1&ssel=3&tsel=3&pc=1&kc=2&tk=`;
    // var instance = axios.create({ 
    //   // withCredentials: true, baseURL: window.location.origin,
    // });
    // curlirize(instance);

    // instance.defaults.headers.common = {};
    // instance.defaults.withCredentials = true; 
    let url = 'https://translate.google.com/translate_a/' + parameters + tk(str) + '&q=' + encodeURIComponent(str);
    // console.log(proxyurl + url);
    // instance.defaults.baseURL = window.location.origin;
    // return Promise.resolve('ru');
    return axios.get(proxyurl, { 
      // data: {csurl: url},
      headers: {
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Content-Type': 'application/json;charset=utf-8',
      // 'Referrer-Policy': 'no-referrer-when-downgrade',
      // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
      // 'X-Requested-With': 'XMLHttpRequest',
      // 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
      // 'Referer' : window.location.href.replace(/\/$/, "")
      // 'X-Proxy-URL': 'http://example.com/api/method',
      'X-Proxy-URL': url
    },})
      .then((res) => {
        // console.log('gt res :', res /*JSON.stringify(res)*/);
        return res.data[2]; // probability res.data[6]
      })
      // .catch((err) => {
      //   // console.log('err :', err);
      //   // throw 'error';
      //   return 0;
      // })
      ;
}