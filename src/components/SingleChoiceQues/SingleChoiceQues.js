import React,{useState} from 'react';
import { useDispatch } from 'react-redux';

import * as actionTypes from '../../store/actions'
import './SingleChoiceQues.css'

const SingleChoiceQues =(props) =>{
    // console.log('[SingleChoiceQues.js]', props.question)
    const dispatch=useDispatch();
    const updateAnswers=(id, answer) =>dispatch({
        type: actionTypes.UPDATEANSWERS,
        question_id: id,
        answer: answer
    })
    const [selectedOption, setSelectedOption]=useState(()=>{
        return sessionStorage.getItem(props.question.id) ? JSON.parse(sessionStorage.getItem(props.question.id)) : null;
    })

    const optionSelectHandler = (e,id) =>{
        console.log(e.target)
        sessionStorage.setItem(props.question.id, JSON.stringify(id))
        setSelectedOption(id)
        updateAnswers(props.question.id, id)
    }

    return<div className='SingleChoiceQues'>
        <div key={props.question.id} dangerouslySetInnerHTML={{__html: props.question.content}}/>
        {props.question.choices.map(choice=>{
            // console.log(choice.id , selectedOption)
            return <>
            <input type='radio' value={choice.content} checked={choice.id === selectedOption} onChange={(e)=>{optionSelectHandler(e,choice.id)}}/>
            <span className='Radio' key={choice.id} dangerouslySetInnerHTML={{__html: choice.content}}/>
            </>
        })}
    </div>
}

export default SingleChoiceQues;