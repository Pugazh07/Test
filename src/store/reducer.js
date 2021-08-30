import * as actionTypes from './actions';

const initialState={
    questions: []
}

const reducer =(state=initialState, action)=>{
    switch (action.type){
        case actionTypes.SETQUESTIONS:
            return{
                ...state,
                questions: action.questions.filter(question => question.active)
            }
        case actionTypes.UPDATEANSWERS:
            let updatedAnswerList=[...state.questions].map(question => {
                if(question.id === action.question_id){
                    let isCorrect=false;
                    question.choices.forEach(element => {
                        if(element.id === action.answer_id && ((question.question_type_id ===2 && element.selected === true) || (question.question_type_id ===3 && element.content === parseInt(action.provided_answer)))){
                            isCorrect=true
                            console.log(isCorrect)
                        }
                    });
                    return {
                        ...question,
                        isAnswered: true,
                        isCorrect: isCorrect,
                        providedAnswer: action.provided_answer
                    }
                }
                else{
                    return question
                }
            })
            return{
                ...state,
                questions: updatedAnswerList
            }
        default:
            return state
    }
}

export default reducer