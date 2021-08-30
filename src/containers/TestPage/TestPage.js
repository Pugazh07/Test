import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import QuestionList from '../../components/QuestionList/QuestionList';
import TestReport from '../../components/TestReport/TestReport';
import * as actionTypes from '../../store/actions';

import './TestPage.css';
import { DIFFICULTLEVEL } from '../../localConfig/quesConfig';
import { useSessionStorage } from '../../components/CustomHooks';


const TestPage = () =>{
    // const [questions, setQues]=useState([])
    const dispatch=useDispatch();
    const questions=useSelector(state=> state.questions)
    
    const setQuestions=(payload)=>dispatch({
        type: actionTypes.SETQUESTIONS,
        questions: payload
    })

    const [quesFetchError, setQuesFetchError]=useState(false)
    
    const [difficultLevel, setDifficultLevel]=useSessionStorage('difficultLevel',1)

    const [isSubmitted, setIsSubmitted]=useState(false)

    useEffect(()=>{
        let url="http://localhost"
        if(process.env.json_url){
            url=process.env.json_url
        }
        axios.get(url+':8000/questions').then(result=>{
            setQuesFetchError(false)
            setQuestions(result.data)
        }).catch(error=>{
            setQuesFetchError(true)
        })
    }, [])

    const nextLevelHandler=(e)=>{
        e.preventDefault();
        sessionStorage.setItem('difficultLevel',JSON.stringify(difficultLevel+1))
        setDifficultLevel(difficultLevel+1)
    }
    const prevLevelHandler=(e)=>{
        e.preventDefault();
        sessionStorage.setItem('difficultLevel',JSON.stringify(difficultLevel-1))
        setDifficultLevel(difficultLevel-1)
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        sessionStorage.setItem('questions',JSON.stringify(questions))
        setIsSubmitted(true)
    }
    // console.log(questions, quesFetchError, difficultLevel)

    let selectedQuestions=questions.filter(question => question.difficulty_level_id === difficultLevel && question.active)
    console.log(selectedQuestions)
    let pageContent = !quesFetchError ? (
        <form className='TestPage'>
            <h1 style={{textAlign: 'center'}}>{DIFFICULTLEVEL[difficultLevel]}</h1>
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
            setDifficultLevel(1)
            setIsSubmitted(false)
        }}/> : pageContent}
    </>
}

export default TestPage