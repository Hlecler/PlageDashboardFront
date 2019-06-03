// Modules
import { createStore, combineReducers } from 'redux';

// Sub Reducers
import UserGraph from './reducer/UserGraph';
import ExerciseGraph from './reducer/ExerciseGraph';
import LogGraph from './reducer/LogGraph';
import TeacherExoGraph from './reducer/TeacherExoGraph';

const store = createStore(
  combineReducers({
    UserGraph,
    ExerciseGraph,
    LogGraph,
    TeacherExoGraph
  })
);

export default store;