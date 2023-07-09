import axios from 'axios';
// import curlirize from 'axios-curlirize';
import { getCookie } from '../lib/stringLib';

import { makeOptions, makeGetOptions} from '../lib/async';

/*
* Posts some data to url after upload
* @param key Datastore Entity key (urlsafe)
*/
function postUploadHandler(content) {
    return axios(makeOptions('/upload/postupload', content))
       .then((res) => { 
           return res.data;
        })//, (err) => { throw err.message;} )
}

export function uploadToDisk(content) {
    // let formData = new FormData(); // Currently empty
    let url = content.uDicUrl;
    let pathLength = url.indexOf(':') + 1;
    let xPath = url.substring(pathLength);

    let saveToDisk = url.startsWith('disk:'); // saves on the server disk
    let instance = axios.create();

    instance.defaults.headers.common = {};

    // curlirize(instance);
    return instance({
        url: saveToDisk ? '/upload/wordlist': xPath,
        method: saveToDisk ? 'post' : 'put',
    //    data: saveToDisk ? formData : content.blob,
        data: content.blob,
        headers: saveToDisk ? {
        // 'X-CSRF-TOKEN': token !== null ? token.getAttribute('content') : ''
        // 'Content-Encoding': 'gzip',
        // 'Content-Type' : `multipart/form-data; boundary=${formData._boundary}`,
        'Content-Type': content.blob.type,
        'Content-Encoding': 'gzip',
        'X-PATH': xPath,
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') || ''
        } : 
        {
        'Content-Type': content.blob.type,
        'Content-Encoding': 'gzip'
        },
        timeout: 600000, // 10 min
        onUploadProgress: content.onUploadProgress
   })
   .then((res) => {
       const size = res.data.data;
        let {uDicUrl, uDicSubspecialty, blob, ...requestData} = content;
        requestData.path = xPath;
        requestData.size = size;
        // console.log(requestData);
        return postUploadHandler(requestData);
    },
    (err) => { 
        console.log(err);
        throw Error('uploadFailure');
    })
}

export function download(url) {
    let instance = axios.create();
    instance.defaults.headers.common = {};

    return instance({
       url: url,
       method: 'get',
    //    data: file,
    //    headers: {
    //    'Content-Type': file.type,
    //   }
   })
   .then((res) => {
    //    $('#messages').append('<p>' + Date().toString() + ' : ' + file.name + ' ' + '<span id="' + key + '"' + '></span></p>');
    //    return postUploadHandler(key);
    return res.file;
    },
    (err) => { 
        console.log(err);
        throw Error('downloadFailure');
    }
   )
}

/**
* Used as callback in Ajax request (to avoid closure keeping state)
*/
// var uploadCallback = function (uploadedFile) {
//    return function (data) {
//        let url = data['url'];
//        let key = data['key'];
//        return upload(url, uploadedFile, key);
//    }
// };

/**
* Used as callback in Ajax request (to avoid closure keeping state)
*/
var downloadCallback = function () {
    return function (data) {
        let url = data['url'];
        // let key = data['key'];
        return download(url/*, uploadedFile, key*/);
    }
 };
 /**
* After selecting files and clicking Open button uploading process is initiated automatically
* First request to get signed url is made and then actual upload is started
* @param files: selected files
*/
// export function putFile(file) {
//     //    for (let i = 0; i < files.length; i++) {
//         //    let file = files[i];
//         //    let filename = file.name;
//            return axios(makeGetOptions("/signed_url", {
//                    filename: file.name,
//                    content_type: file.type
//                }))
//                .then(uploadCallback(file));
//         //    );
//     //    }
// }

// export function getFile(file) {
//     //    for (let i = 0; i < files.length; i++) {
//         //    let file = files[i];
//         //    let filename = file.name;
//             return axios(makeGetOptions("/signed_url", {
//                     filename: file.name,
//                     content_type: file.type
//                 }))
//                 .then(downloadCallback(file));
//         //    );
//     //    }
// }