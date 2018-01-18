import {types} from './types.js';
// console.log(types)
const actions = {
    start({commit},arr){
        commit(types.START_ACTION,arr)
    },
    nextProblem({commit},list){
        commit(types.PROBLEM_LIST,list)
    },
    problemClean({commit}){
        commit(types.PROBLEM_CLEAN)
    },
    nextQuestion({commit},list){
        commit(types.QUESTION_LIST,list)
    },
    questionClean({commit}){
        commit(types.QUESTION_CLEAN)
    },
}

export default actions;
