
// Action type constants
// TODO: Action type constant
export const SET_USER = "@@ExerciseGraph/SET_USER"
export const SET_ERROR = "@@ExerciseGraph/SET_ERROR"
export const SET_LAYOUT = "@@ExerciseGraph/SET_LAYOUT"
export const SET_REVISION = "@@ExerciseGraph/SET_REVISION"
export const SET_EXERCISES = "@@ExerciseGraph/SET_EXERCISES"
export const SET_DATA = "@@ExerciseGraph/SET_DATA"

// default graph state
export const initGraph = {          
  user: null,
  error: '',
  layout: {
    xaxis : {'title': 'Etudiants'},
    yaxis : {'title': 'Score (%)'},
    title : "Comparaison de votre score avec les autres étudiants",
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