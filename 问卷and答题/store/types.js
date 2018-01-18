// export const START_ACTION = 'START_ACTION';
// export const PROBLEM_LIST = 'PROBLEM_LIST';
// export const PROBLEM_CLEAN = 'PROBLEM_CLEAN';
// export const QUESTION_LIST = 'QUESTION_LIST';
// export const QUESTION_CLEAN = 'QUESTION_CLEAN';

import keymirror from 'keymirror';

let types = keymirror({
    START_ACTION:null,
    PROBLEM_LIST:null,
    PROBLEM_CLEAN:null,
    QUESTION_LIST:null,
    QUESTION_CLEAN:null
})

export {types};
