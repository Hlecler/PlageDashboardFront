
// Action type constants
// TODO: Action type constant
export const SET_USER = "@@UserGraph/SET_USER"
export const SET_ERROR = "@@UserGraph/SET_ERROR"
export const SET_MODE = "@@UserGraph/SET_MODE"
export const SET_LAYOUT = "@@UserGraph/SET_LAYOUT"
export const SET_REVISION = "@@UserGraph/SET_REVISION"
export const SET_EXERCISES = "@@UserGraph/SET_EXERCISES"
export const SET_DATA = "@@UserGraph/SET_DATA"

// default graph state
export const initGraph = {      
  user: null,
  error: '',
  mode: 0,
  layout: {
    yaxis : {'title': 'Score (%)'},
    xaxis : {'title': 'Exercices'},
    title:"Vos résultats d'exercices",
    datarevision: 0,
  },
  revision: 0,
  exercises: [],
  data : [
    {type: 'bar', x: [], y: [],
   name : "Exercices",
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

export const setMode = (mode) => ({
  type: SET_MODE,
  payload: mode
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

export const setExercises = (exercises) => ({
  type: SET_EXERCISES,
  payload:
    exercises
})

export const setData = (data) => ({
  type: SET_DATA,
  payload: data
})