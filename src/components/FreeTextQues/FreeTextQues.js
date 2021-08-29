import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { QUESTYPE } from '../../localConfig/quesConfig';
import * as actionTypes from '../../store/actions'

const FreeTextQues = (props) =>{
    // console.log(props.question)
    const dispatch=useDispatch();
    const updateAnswers=(id, answer) =>dispatch({
        type: actionTypes.UPDATEANSWERS,
        question_id: id,
        answer: answer
    })
    const [textValue, setTextValue]=useState(()=>{
        return sessionStorage.getItem(props.question.id) ? JSON.parse(sessionStorage.getItem(props.question.id)) : '';
    })
    const [error, setError]=useState('')

    const textValueChangeHandler=(e)=>{
        if(props.question.question_type_id === QUESTYPE.FreeTextOnlyNumbers && isNaN(e.target.value)){
            setError("Only numbers are allowed for this answer")
        }
        else{
            sessionStorage.setItem(props.question.id, JSON.stringify(e.target.value))
            setError('')
            setTextValue(e.target.value)
            updateAnswers(props.question.id, e.target.value)
        }
    }

    return <div className='FreeTextQues'>
        <div key={props.question.id} dangerouslySetInnerHTML={{__html: props.question.content}}/>
        <textarea value={textValue} onChange={textValueChangeHandler}/>
        <p style={{color: 'red'}}>{error}</p>
    </div> ;
}

export default FreeTextQues;