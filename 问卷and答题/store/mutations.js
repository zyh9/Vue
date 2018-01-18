import {types} from './types.js';

// 定义state的值
const state = {
    pos:null,
    answer:[],
    survey:[],
    weixin:null,
    normal:'',
    checked:'',
    lastBg:'',
    lastImg:'',
    avatar:'',
    lastSurveyBg:''
}

// 每个action的提交引发state的改变
const mutations = {
    [types.START_ACTION](state,arr){
        state.pos = arr[0];
        state.weixin = arr[1];
        state.normal = arr[2];
        state.checked = arr[3];
        state.lastBg = arr[4];
        state.lastImg = arr[5];
        state.avatar = arr[6];
        state.lastSurveyBg= arr[7];
    },
    //答题数据
    [types.PROBLEM_LIST](state,list){
        state.answer = list;
        // console.log(state.answer)
    },
    [types.PROBLEM_CLEAN](state){
        state.answer = [];
    },
    //问卷数据
    [types.QUESTION_LIST](state,list){
        state.survey = list;
    },
    [types.QUESTION_CLEAN](state){
        state.survey = [];
    }
}

// 获取到变化的值
const getters = {
    pos(state){
        return state.pos;
    }
}

// 导出
export default{
	state,
	mutations,
	getters
}
