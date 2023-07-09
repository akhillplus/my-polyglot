import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import CryptoJS from 'crypto-js'
import axios from 'axios'

import rootReducer from './reducers'
import initialStateData from '../data/initialState.js'
import { getCookie, setCookie, isEmptyObj, isDemoMode, separateState } from '../lib/stringLib'
import { makeOptions, defaultRejecter } from '../lib/async'
import C from '../constants'


export const GUEST_KEY = 'Guest'
export const storage = localStorage

export const EligibleKeyNames = [C.REDUX_STORE_NAME, C.DEMO_REDUX_STORE_NAME, C.GAME_STATE_NAME,
    C.DEMO_GAME_STATE_NAME, C.UDIC_GAME_STATE_NAME, C.STUFF_NAME, C.DEMO_STUFF_NAME, C.UDIC_STUFF_NAME]
export const UnencodableKeyNames = [C.GAME_STATE_NAME,
    C.DEMO_GAME_STATE_NAME, C.UDIC_GAME_STATE_NAME]
export const SortableKeyNames = UnencodableKeyNames

export const toStorage = (key, obj) => {
    storage[key] = JSON.stringify(obj)
}

export const fromStorage = (key) => {
    return JSON.parse(storage[key]);
}

const makeCryptoKey = (user) => {
    return (user && user.id) ? user.id.toString() : GUEST_KEY;
}

const getHash = (str) => {
    return CryptoJS.MD5(str).toString();
}

const makeRecordKeyName = (keyType, string, user) => {
    let name = [], i = 0
    name[i ++] = keyType
    // if (user && user.id) {
        // if (keyType === GAME_STATE_NAME || keyType === STUFF_NAME) 
        if (!(C.REDUX_STORE_NAME === keyType 
                || C.DEMO_REDUX_STORE_NAME === keyType || C.DEMO_GAME_STATE_NAME === keyType
                    || C.DEMO_STUFF_NAME === keyType)) {
                name[i ++] = user.id.toString(16).padStart(C.PADDED_USERID_LEN, '0')
            if (!(C.STUFF_NAME === keyType || C.UDIC_STUFF_NAME === keyType 
                    /*|| C.DEMO_STUFF_NAME === keyType*/)) 
                name[i ++] = user.last_modified.toString(16).padStart(C.PADDED_TIMESTAMP_LEN, '0')
        }
    // }
    // if (keyType !== DEMO_REDUX_STORE_NAME) 
    name[i] = getHash(string)
    return name.join('-')
}

// const getRecord = (keyName, keyValue) => {
//     const keyValue = decode(keyValue);
//     const hash = getHash(keyValue);
//     const keyParams = keyName.split('-');
//     if (keyParams[3] !== hash) return null;
//     return keyValue;
// }

export const getRecordKeysForName = (name) => (user) => {
    const emptyObj = { arrActual:[], arrNotActual:[]}
    // const objForName = emptyObj
    let userId = 0, userTs = 0;//Date.now()/1000
    if (user) {userId = user.id; userTs = user.last_modified}
    const keyArray = Object.keys(storage) 
    return (keyArray.length > 0) ? keyArray.reduce(({arrActual, arrNotActual}, key) => {
        // let {arrActual, arrNotActual} = obj
        const keyParams = key.split('-')
        const hiKeyPart = keyParams[0]
        if (!EligibleKeyNames.includes(hiKeyPart)) {
            arrNotActual.push(key)
        return {arrActual, arrNotActual}
        }
        const loKeyPartCond = C.REDUX_STORE_NAME === hiKeyPart 
                || C.DEMO_REDUX_STORE_NAME === hiKeyPart || C.DEMO_GAME_STATE_NAME === hiKeyPart
                    || C.DEMO_STUFF_NAME === hiKeyPart
        if (hiKeyPart === name){
            if ((loKeyPartCond || parseInt(keyParams[1], 16) === userId) 
                && (loKeyPartCond || C.STUFF_NAME === hiKeyPart || C.UDIC_STUFF_NAME === hiKeyPart
                            /*|| C.DEMO_STUFF_NAME === hiKeyPart*/ || parseInt(keyParams[2], 16) >= userTs)
                        && keyParams[keyParams.length-1] === getHash(
                            UnencodableKeyNames.includes(key) ? storage[key] : decode(storage[key], makeCryptoKey(user))))
                            arrActual.push(key)
            else arrNotActual.push(key)
        }
        return {arrActual, arrNotActual}
    }, emptyObj) : emptyObj
}

// export const readActualStateValue = (name, user) => {
//     const {arrActual, arrNotActual} = getRecordKeysForName(name)(user)
//     if (arrNotActual.length > 0) arrNotActual.forEach(element => {storage.removeItem(element)});
//     return arrActual.sort().reverse()[0]
// }

export const toSessionStorage = (key, obj) => {
    sessionStorage[key] = JSON.stringify(obj)
}

export const fromSessionStorage = (key) => {
    return JSON.parse(sessionStorage[key]);
}

const purgeStoreByName = (storeName, user) => {
    const {arrActual, arrNotActual} = getRecordKeysForName(storeName)(user)
    if (arrNotActual.length > 0) arrNotActual.forEach(element => {storage.removeItem(element)})
    return arrActual
}

const saveToStoreByName = (storeNamePrefix, text, user) => {
    if (!text) return;
    const storeKey = makeRecordKeyName(storeNamePrefix, text, user)
    const content = UnencodableKeyNames.includes(storeNamePrefix) ? text : encode(text, makeCryptoKey(user))
    // while 
    const {arrActual, arrNotActual} = getRecordKeysForName(storeNamePrefix)(user)
    if (arrNotActual.length > 0) arrNotActual.forEach(element => {storage.removeItem(element)});

    const arr = SortableKeyNames.includes(storeNamePrefix) ? arrActual.sort() : null

    while (true)
    {
        try {
            if (arrActual.length > 0) arrActual.forEach(element => {storage.removeItem(element)});
            storage[storeKey] = content
            break;
        } catch (e) {
            if (arr && Array.isArray(arr) && arr.length > 0) 
            {
                const element = arr.shift()
                storage.removeItem(element)
            // } else if () { remove C.DEMO_STUFF_NAME
            } else {
                throw Error('notEnoughSpace')
            }
        }
    }
}

const uploadState = (file, id) => {
    // if (isDemoMode()) return Promise.resolve(file)

    return  (isDemoMode()) ? Promise.resolve(file) : file ? axios(makeOptions('/upload/state'), {file, id})
        .then((res) => { 
            // if(this.props.enqueueSnackbar) this.props.enqueueSnackbar(res.data.message);
            console.log(res.data.message);
            return Promise.resolve(file)}) : 
        Promise.resolve(null)
}

export const saveToStorage = (store) => {
    const storeName = window.location.pathname === '/' ?
        C.REDUX_STORE_NAME : C.DEMO_REDUX_STORE_NAME
    // const userCookie = getCookie('user')
    // const state = 
    let { user: feUser, items: file, altItems: altFile, ...state} = store //.getState()
    file = file ? JSON.stringify(separateState(file)) : null
    const altItems = altFile ? JSON.stringify(separateState(altFile)) : null
    const last_modified = feUser ? feUser.last_modified : 0
    // else 
    return uploadState(file, feUser ? feUser.id : null)
    .catch((err) => {const m = defaultRejecter(err); console.log(m.message);
        return Promise.resolve(file)
        // if (this.props.enqueueSnackbar) this.props.enqueueSnackbar(m.message);
    })
    .then((items) => {
    let user = JSON.parse(getCookie('user') || 'null')
    if (!user && !isDemoMode()) user = feUser // cookie may have been deleted ??
    if (user && user.last_modified <= last_modified) user.last_modified ++; // failed to save on server
    const content = JSON.stringify({...state, user})

    // saves states
    let tryCountdown = 2
    while (tryCountdown > 0)
    {
        // if (items && Array.isArray(items) && items.length > 0) {
        if (items) {
        try {
            if (storeName === C.REDUX_STORE_NAME) {
                let stateKeyPrefix = state.uDicIsSelected ? C.UDIC_GAME_STATE_NAME : C.GAME_STATE_NAME
                let stuffKeyPrefix = state.uDicIsSelected ? C.UDIC_STUFF_NAME : C.STUFF_NAME
                let stuffFileContent = state.uDicIsSelected ? window.uFileContent : window.sFileContent
                if (stuffFileContent) {saveToStoreByName(stuffKeyPrefix, stuffFileContent, user)
                }
                saveToStoreByName(stateKeyPrefix, items, user)

                if (altItems){
                stateKeyPrefix = !state.uDicIsSelected ? C.UDIC_GAME_STATE_NAME : C.GAME_STATE_NAME
                stuffKeyPrefix = !state.uDicIsSelected ? C.UDIC_STUFF_NAME : C.STUFF_NAME
                stuffFileContent = !state.uDicIsSelected ? window.uFileContent : window.sFileContent

                if (stuffFileContent) {saveToStoreByName(stuffKeyPrefix, stuffFileContent, user)
                }
                saveToStoreByName(stateKeyPrefix, altItems, user)
                }

                window.uFileContent = window.sFileContent = null
            } 
            else { // DEMO_REDUX_STORE_NAME
                if (window.uFileContent) {saveToStoreByName(C.DEMO_STUFF_NAME, window.uFileContent, null)
                    window.uFileContent = null
                }
                saveToStoreByName(C.DEMO_GAME_STATE_NAME, items, null)
            }
        } catch (e) {
            let arrActual;
            if (storeName === C.REDUX_STORE_NAME) {
                const stateKeyPrefix = state.uDicIsSelected ? C.UDIC_STUFF_NAME : C.STUFF_NAME
                arrActual = purgeStoreByName(stateKeyPrefix, user)
            } else {
                arrActual = purgeStoreByName(C.DEMO_STUFF_NAME, user)
            }
            // arrActual = arrActual.sort()
            // if (arrActual.length <= 1) break
            // else storage.removeItem(arrActual.shift())

            if (-- tryCountdown <= 0) {
                try {
                saveToStoreByName(storeName, content, user) // app state
                } catch (e) {
                    saveToModalCookie(storeName, user, state)
                    break
                }
            }
            continue
        }
        }
        try {
            saveToStoreByName(storeName, content, user) // app state
            } catch (e) {
                saveToModalCookie(storeName, user, state)
                break
            }
        break
    }})
}

const saveToModalCookie = (storeName, user, fe_state) => {
    let modalCookie = {...user, fe_state}
    if (storeName === C.DEMO_REDUX_STORE_NAME) modalCookie['mode'] = 'demo'
    setCookie('user', JSON.stringify(modalCookie))
}

// export const saveStateToStorage = () => { saveToStorage(store)}

const logger = store => next => action => {
    let result
    console.groupCollapsed("dispatching", action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

const saver = store => next => action => {
    let result = next(action)
    if (isStorablePath()) {
        const appState = store.getState()
        saveToStorage(action.type === C.CHANGE_ENTIRE_STATE ?
            appState : {...appState, items: null, altItems: null})
        }
    return result
}

export const encode = (str, key) => {
    // CryptoJS.AES.encrypt(str, key).toString()
    return str
}

export const decode = (str, key) => {
    // return CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8)
    return str
}

const isStorablePath = () => {
    const pathname = window.location.pathname
    return pathname === '/' || pathname === '/demo'
}

export const readActualStateValue = (key, user) => {
    let {arrActual, arrNotActual} = getRecordKeysForName(key)(user)
    let retValue = null
    if (arrActual.length > 0) {
        arrActual = arrActual.sort().reverse()
        retValue = decode(storage[arrActual.shift()], makeCryptoKey(user))
     }
     if (arrNotActual.length > 0) arrNotActual.forEach(element => {storage.removeItem(element)})
     if (arrActual.length > 1) arrActual.forEach((element, idx) => {if (idx > 0) storage.removeItem(element)})
     return retValue
}

const filterUserProperties = (user) => {
    return {id: user.id, email: user.email, name: user.name, fe_state: user.fe_state !== null, last_modified: user.last_modified}
}

export const filterState = (state) => {
    let retState = {}
    for (const property in initialStateData) {
        const propVal = state[property]; 
        if (propVal !== undefined) retState[property] = propVal
        else retState[property] = initialStateData[property]
    }
    // retState['items'] = state['items']
    // retState['altItems'] = state['altItems']
    
    return retState
}

const readAppState = () => {
    if (!isStorablePath()) return {}
    const userCookie = getCookie('user')
    let bUser = JSON.parse(userCookie || 'null') 
    const storeName = window.location.pathname === '/' ? C.REDUX_STORE_NAME : C.DEMO_REDUX_STORE_NAME
    // if (bUser) {
    //     bUser =  {...bUser, last_modified: bUser.last_modified/*Date.parse(bUser.last_modified)*/}
    // }
    const bFeState = bUser ? bUser.fe_state : null
    let state = readActualStateValue(storeName, bUser)
    state = state ? JSON.parse(state) // actual state found 
            :  bFeState ? JSON.parse(bFeState): initialStateData

    return {...state, user: (storeName === C.DEMO_REDUX_STORE_NAME ? null :
                filterUserProperties(bUser))}
}

const store = createStore(rootReducer, readAppState(),
        composeWithDevTools(applyMiddleware(logger, saver))
    )

export default store;