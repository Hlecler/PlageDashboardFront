// Modules
import { combineReducers } from 'redux';
import { initGraph, SET_USER, SET_REVISION, SET_DATA, SET_EXERCISES, SET_LAYOUT, SET_ERROR } from '../action/actionTeacherExoGraph';


const user = ( state = initGraph.user, action ) => action.type === SET_USER ? action.payload : state ;
const error = ( state = initGraph.error, action ) => action.type === SET_ERROR ? action.payload : state;
const layout = ( state = initGraph.layout, action ) => action.type === SET_LAYOUT ? action.payload : state;
const revision = ( state = initGraph.revision, action ) => action.type === SET_REVISION ? action.payload : state;
const exercises = ( state = initGraph.exercises, action ) => action.type === SET_EXERCISES ? action.payload : state;
const data = ( state = initGraph.data, action ) => action.type === SET_DATA ? action.payload : state;




// Main Reducer
export default combineReducers({
  user,
  error,
  layout,
  revision,
  exercises,
  data
});