import * as actionTypes from './actions';

const initialState={
    questions: [],
    answerList: []
}

const reducer =(state=initialState, action)=>{
    switch (action.type){
        case actionTypes.SETQUESTIONS:
            let answerList=sessionStorage.getItem('answerList') ? (
                JSON.parse(sessionStorage.getItem('answerList'))) : (
                action.questions.map(question => ({
                    question_id: question.id,
                    question: question.content,
                    question_type_id: question.question_type_id,
                    difficulty_level_id: question.difficulty_level_id,
                    assigned_score: question.assigned_score,
                    choices: question.choices,
                    isAnswered: false,
                    isCorrect: false}))
                )
            console.log(answerList)
            sessionStorage.setItem('answerList',JSON.stringify(answerList)) 
            return{
                ...state,
                questions: action.questions,
                answerList: answerList
            }
        case actionTypes.UPDATEANSWERS:
            let updatedAnswerList=state.answerList.map(answer => {
                if(answer.question_id === action.question_id){
                    return {
                        ...answer,
                        isAnswered: true,
                        isCorrect: true,
                        providedAnswer: action.answer
                    }
                }
                else{
                    return answer
                }
            })
            // console.log(updatedAnswerList)
            sessionStorage.setItem('answerList',JSON.stringify(updatedAnswerList))
            return{
                ...state,
                answerList: updatedAnswerList
            }
        default:
            return state
    }
}

export default reducer