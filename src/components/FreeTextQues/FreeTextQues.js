import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { QUESTYPE } from '../../localConfig/quesConfig';
import * as actionTypes from '../../store/actions'

const FreeTextQues = (props) =>{
    // console.log(props.question)
    const dispatch=useDispatch();
    const updateAnswers=(question_id, answer_id, answer) =>dispatch({
        type: actionTypes.UPDATEANSWERS,
        question_id: question_id,
        answer_id: answer_id,
        provided_answer: answer
    })
    const [textValue, setTextValue]=useState(()=>{
        return sessionStorage.getItem(props.question.id) ? JSON.parse(sessionStorage.getItem(props.question.id)) : '';
    })
    const [error, setError]=useState('')

    const textValueChangeHandler=(e, answer_id)=>{
        if(props.question.question_type_id === QUESTYPE.FreeTextOnlyNumbers && isNaN(e.target.value)){
            setError("Only numbers are allowed for this answer")
        }
        else{
            sessionStorage.setItem(props.question.id, JSON.stringify(e.target.value))
            updateAnswers(props.question.id, answer_id, e.target.value)
            setTextValue(e.target.value)
            updateAnswers(props.question.id, answer_id, e.target.value)
            setError('')
        }
    }

    return <div className='FreeTextQues'>
        <div key={props.question.id} dangerouslySetInnerHTML={{__html: props.question.content}}/>
        <textarea value={textValue} onChange={(e)=>textValueChangeHandler(e,props.question.choices[0].id)}/>
        <p style={{color: 'red'}}>{error}</p>
    </div> ;
}

export default FreeTextQues;