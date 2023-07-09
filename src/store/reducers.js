import C from '../constants'

export const dicItem = (state = {}, action) => {

  switch (action.type) {
    case C.EXCLUDE_DIC_ITEM:
      return (state.id !== action.id) ?
          state : {
          ...state,
          ex: true
      };
    case C.INCLUDE_DIC_ITEM:
      return (state.id !== action.id) ?
          state : {
          ...state,
          ex: undefined
      };
    case C.ADD_DIC_ITEM:
      return {
          id: action.id, 
          studied: action.studied,
          meaning: action.meaning,
          ex: action.ex
          };
    default:
        return state;
    }
}

export const dicItems = (state = [], action) => {
  switch (action.type) {
    case C.EXCLUDE_DIC_ITEM:
    case C.INCLUDE_DIC_ITEM:
        return state.map(c => dicItem(c, action));
    case C.ADD_DIC_ITEM:
        return [
        ...state,
        dicItem({}, action)
        ]
    case C.REMOVE_DIC_ITEM :
        return state.filter(
        c => c.id !== action.id
        )
    default:
        return state;
  }
}

export const dic = (state = {}, action) => {
  switch (action.type) {
    case C.CHANGE_PAGE:
    return {
      ...state,
      page: action.page
    };
    case C.CHANGE_ROWS_PER_PAGE:
    return {
      ...state,
      rowsPerPage: action.rowsPerPage
    };
    case C.CHANGE_ORDERS:
    return {
      ...state,
      order: action.order,
      orderBy: action.orderBy
    };
    case C.EXCLUDE_DIC_ITEM:
    case C.INCLUDE_DIC_ITEM:
    return {
      ...state,
      items: dicItems(state.items, action)
    }
    case C.CHANGE_LEARNED_LANG:
    return {
      ...state,
      learnedLang: action.learnedLang
    };
    case C.CHANGE_MOTHER_LANG:
    return {
      ...state,
      motherLang: action.motherLang
    };
    case C.CHANGE_USER_DIC_SELECTED:
    return {
      ...state,
      uDicIsSelected: action.flag
    };
    default:
    return state;
  }
}

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case C.CHANGE_UPDATING_STATE:
      return {
        ...state,
        updating: action.flag
      };
    case C.CHANGE_SELECTED_TAB:
      return {
        ...state,
        tab: action.tab
      };
    case C.HANDLE_DRAWER:
      return {
        ...state,
        drawerOpen: action.drawerOpen
      };
    // case C.EXCLUDE_DIC_ITEM:
    // case C.INCLUDE_DIC_ITEM:
    // case C.CHANGE_ORDERS: 
    // case C.CHANGE_PAGE: 
    // case C.CHANGE_ROWS_PER_PAGE:
    // case C.CHANGE_LEARNED_LANG: 
    // case C.CHANGE_MOTHER_LANG:
    // case C.CHANGE_USER_DIC_SELECTED:
    case C.CHANGE_PAGE:
    return {
      ...state,
      page: action.page
    };
    case C.CHANGE_ROWS_PER_PAGE:
    return {
      ...state,
      rowsPerPage: action.rowsPerPage
    };
    case C.CHANGE_ORDERS:
    return {
      ...state,
      order: action.order,
      orderBy: action.orderBy
    };
    case C.CHANGE_LEARNED_LANG:
    return {
      ...state,
      learnedLang: action.learnedLang
    };
    case C.CHANGE_MOTHER_LANG:
    return {
      ...state,
      motherLang: action.motherLang
    };
    case C.CHANGE_USER_DIC_SELECTED:
    return {
      ...state,
      uDicIsSelected: action.flag
    };
    case C.EXCLUDE_DIC_ITEM:
    case C.INCLUDE_DIC_ITEM:
    return {
      ...state,
      items: dicItems(state.items, action)
    }
      
    // return {
    //   ...state,
    //   dictionary: dic(state.dictionary, action)
    // };
    case C.CHANGE_INTERFACE_LANG:
    return {
      ...state,
      interfaceLang: action.interfaceLang
    };
    case C.CHANGE_USER:
    return {
      ...state,
      user: action.user
    };
    case C.CHANGE_ITEMS:
    return {
      ...state,
      items: action.items
    };
    case C.CHANGE_ALTITEMS:
    return {
      ...state,
      altItems: action.altItems
    };
    case C.CHANGE_ENTIRE_STATE:
    return {
      ...state,
      ...action.newState
    };
    default:
      return state;
  }
}

export default rootReducer;
