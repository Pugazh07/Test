import React from 'react';

import { QUESTYPE } from '../../localConfig/quesConfig';
import FreeTextQues from '../FreeTextQues/FreeTextQues';
import SingleChoiceQues from '../SingleChoiceQues/SingleChoiceQues';

import './QuestionList.css'

const QuestionList=(props)=>{
    let listQuestions=props.questions.map((question)=>{
        if(question.question_type_id === QUESTYPE.SingleChoice){
            return <li key={question.id.toString() + question.difficulty_level_id.toString()}>
                <SingleChoiceQues question={question}/>
            </li>
        }
        else{
            return <li key={question.id.toString()+question.difficulty_level_id.toString()}>
                <FreeTextQues question={question}/>
            </li>
        }
    })

    return<div className='QuestionList'>
        <ol>
        {listQuestions}
        </ol>
    </div>
}

export default QuestionList;