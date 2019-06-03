
// Action type constants
// TODO: Action type constant
export const SET_USER = "@@LogGraph/SET_USER"
export const SET_ERROR = "@@LogGraph/SET_ERROR"
export const SET_LAYOUT = "@@LogGraph/SET_LAYOUT"
export const SET_REVISION = "@@LogGraph/SET_REVISION"
export const SET_LOGS = "@@LogGraph/SET_LOGS"
export const SET_DATA = "@@LogGraph/SET_DATA"

// default graph state
export const initGraph = { 
  user: null,
  error: '',
  layout: {
    xaxis : {'title': 'Jour'},
    title : "Nombre de log par jour",
    datarevision: 0,
  },
  revision: 0,
  logs: null,
  data : [
    {type: 'bar', x: [], y: [],
   name : "Logs",
   marker : {'color' : []}
   },
  ]
}

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
})

export const setError = (error) => ({
  type: SET_ERROR,
  payload:
    error
})

export const setLayout = (layout) => ({
  type: SET_LAYOUT,
  payload:
    layout
})

export const setRevision = (revision) => ({
  type: SET_REVISION,
  payload: revision
})

export const setLogs = (logs) => ({
  type: SET_LOGS,
  payload:
    logs
})

export const setData = (data) => ({
  type: SET_DATA,
  payload: data
})