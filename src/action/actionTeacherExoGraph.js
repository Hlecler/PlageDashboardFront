
// Action type constants
// TODO: Action type constant
export const SET_USER = "@@TeacherExoGraph/SET_USER"
export const SET_ERROR = "@@TeacherExoGraph/SET_ERROR"
export const SET_LAYOUT = "@@TeacherExoGraph/SET_LAYOUT"
export const SET_REVISION = "@@TeacherExoGraph/SET_REVISION"
export const SET_EXERCISES = "@@TeacherExoGraph/SET_EXERCISES"
export const SET_DATA = "@@TeacherExoGraph/SET_DATA"

// default graph state
export const initGraph = {          
  user: null,
  error: '',
  layout: {
        title : "Scores des étudiants à l'exercice",
        datarevision: 0,
      },
  revision: 0,
  exercises: [],
  data : [{
        values: [0, 0, 0, 0],
        labels: ['0-25%', '>25-50%', '>50-75%', '>75-100%'],
        type: 'pie',
        marker: {
          colors: ['rgb(230, 0, 0)', 'rgb(255, 120, 0)', 'rgb(230, 255, 0)', 'rgb(0, 220, 0)']
        }
      }]
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