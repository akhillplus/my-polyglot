import C from './constants';

export const changeUpdatingState = (flag) => (
  {
      type: C.CHANGE_UPDATING_STATE,
      updating: flag
    }
)

export const changeSelectedTab = (selectedTab) => (
  {
      type: C.CHANGE_SELECTED_TAB,
      tab: selectedTab //,
      //namespace: tabNamespace
    }
)

export const handleDrawer = (open) => (
  {
    type: C.HANDLE_DRAWER,
    drawerOpen: open
  }
)

export const addDicItem = (id, studied, meaning) => (
  {
    type: C.ADD_DIC_ITEM,
    id,
    studied, 
    meaning
  }
)

export const excludeDicItem = (id) => (
  {
    type: C.EXCLUDE_DIC_ITEM,
    id,
    ex: 1
  }
)

export const includeDicItem = (id) => (
  {
    type: C.INCLUDE_DIC_ITEM,
    id,
    ex: undefined
  }
)

export const changeDicOrders = (order, orderBy) => (
  {
    type: C.CHANGE_ORDERS,
    order,
    orderBy
  }
)

export const changeRowsPerPage = (rowsPerPage) => (
  {
    type: C.CHANGE_ROWS_PER_PAGE,
    rowsPerPage
  }
)

export const changePage = (page) => (
  {
    type: C.CHANGE_PAGE,
    page
  }
)

export const changeLearnedLang = (learnedLang) => (
  {
    type: C.CHANGE_LEARNED_LANG,
    learnedLang
  }
)
export const changeMotherLang = (motherLang) => (
  {
    type: C.CHANGE_MOTHER_LANG,
    motherLang
  }
)

export const changeUserDicSelected = (flag) => (
  {
    type: C.CHANGE_USER_DIC_SELECTED,
    flag
  }
)

export const changeInterfaceLang = (interfaceLang) => (
  {
    type: C.CHANGE_INTERFACE_LANG,
    interfaceLang
  }
)

export const changeUser = (user) => (
  {
    type: C.CHANGE_USER,
    user
  }
)

export const changeItems = (items) => (
  {
    type: C.CHANGE_ITEMS,
    items
  }
)

export const changeAltItems = (altItems) => (
  {
    type: C.CHANGE_ALTITEMS,
    altItems
  }
)

export const changeEntireState = (newState) => (
  {
    type: C.CHANGE_ENTIRE_STATE,
    newState
  }
)
