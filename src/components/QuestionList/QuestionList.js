import React from 'react';

import { QUESTYPE } from '../../localConfig/quesConfig';
import FreeTextQues from '../FreeTextQues/FreeTextQues';
import SingleChoiceQues from '../SingleChoiceQues/SingleChoiceQues';

import './QuestionList.css'

const QuestionList=(props)=>{
    let listQuestions=props.questions.map((question, index)=>{
        if(question.question_type_id === QUESTYPE.SingleChoice){
            return <li>
                <SingleChoiceQues id={question.id} question={question}/>
            </li>
            
        }
        else{
            return <li>
                <FreeTextQues id={question.id} question={question}/>
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