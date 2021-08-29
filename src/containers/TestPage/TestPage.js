import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import QuestionList from '../../components/QuestionList/QuestionList';
import TestReport from '../TestReport/TestReport';
import * as actionTypes from '../../store/actions'

import './TestPage.css';


const TestPage = () =>{
    // const [questions, setQues]=useState([])
    const dispatch=useDispatch();
    const questions=useSelector(state=> state.questions)
    
    const setQuestions=(payload)=>dispatch({
        type: actionTypes.SETQUESTIONS,
        questions: payload
    })

    const [quesFetchError, setQuesFetchError]=useState(false)
    const [difficultLevel, setDifficultLevel]=useState(()=>{
        return sessionStorage.getItem('difficultLevel') ? JSON.parse(sessionStorage.getItem('difficultLevel')) : 1;
    })
    const [isSubmitted, setIsSubmitted]=useState(()=>{
        return sessionStorage.getItem('isSubmitted') ? JSON.parse(sessionStorage.getItem('isSubmitted')) : false;
    })

    useEffect(()=>{
        axios.get('http://localhost:3000/questions').then(result=>{
            setQuesFetchError(false)
            setQuestions(result.data)
        }).catch(error=>{
            setQuesFetchError(true)
        })
    }, [])

    const nextLevelHandler=()=>{
        sessionStorage.setItem('difficultLevel',JSON.stringify(difficultLevel+1))
        setDifficultLevel(difficultLevel+1)
    }
    const prevLevelHandler=()=>{
        sessionStorage.setItem('difficultLevel',JSON.stringify(difficultLevel-1))
        setDifficultLevel(difficultLevel-1)
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        sessionStorage.setItem('isSubmitted', JSON.stringify(true))
        setIsSubmitted(true)
    }
    // console.log(questions, quesFetchError, difficultLevel)

    let selectedQuestions=questions.filter(question => question.difficulty_level_id === difficultLevel && question.active)
    console.log(selectedQuestions)
    let pageContent = !quesFetchError ? (
        <form className='TestPage'>
        <main>
            {selectedQuestions && <QuestionList questions={selectedQuestions} />}
        </main>
        <section className='Navigation'>
            <button className='PrevLevel' style={{visibility: difficultLevel>1 ? 'visible' : 'hidden' }} onClick={prevLevelHandler}>
                {'<'}
            </button>
            {difficultLevel <3 && <button className='NextLevel' onClick={nextLevelHandler}>
                {'>'}
            </button>}
            {difficultLevel === 3 && <button className='Submit' onClick={submitHandler}>
                Submit
            </button>}
        </section>
    </form>
    ) : <p>404 Page not found</p>;

    return <>
        {isSubmitted ? <TestReport retakeTest={()=>{
            sessionStorage.setItem('isSubmitted', JSON.stringify(false))
            setIsSubmitted(false)
        }}/> : pageContent}
    </>
}

export default TestPage