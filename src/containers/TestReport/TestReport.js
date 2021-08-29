import React from 'react';
import { useSelector } from 'react-redux';

import './TestReport.css'

const TestReport =(props)=>{
    const {questions}= useSelector(state=>{
        console.log(state)
        return{
            questions: state.questions,
        }
    })
    sessionStorage.setItem('questions',JSON.stringify(questions))
    let score=questions.filter(question => question.question_type_id !== 1 && question.isCorrect)
    .reduce((total, ques)=> {
        console.log(total,ques)
        return total + ques.assigned_score
    }, 0)
    return<div className='TestReport'>
        <section style={{textAlign: 'center'}}>
        <h1 >Your Score is {score}</h1>
        <button onClick={props.retakeTest}>Retake</button>
        </section>
        
        <br/>
        <p>Questions that you have questioned correctly are:</p>
        <h1>EASY</h1>
        <ol>
            {questions.filter(question=>question.difficulty_level_id === 1).map(question => {
                return(
                    <li>
                        <span dangerouslySetInnerHTML={{__html: question.content}}/>
                        {question.question_type_id !== 2 && <>
                            <div style={{
                                color: question.isCorrect ? 'green' : 'red'
                            }}>Your Answer: <span style={{fontWeight: 'bold'}}>{
                                question.provided_answer ? question.provided_answer : 'Not Answered'
                                }</span>
                            </div>
                            <div style={{
                                color: 'green'
                                }}>Correct Ans: <span style={{fontWeight: 'bold'}}>{question.choices[0].content}</span></div>
                            </>
                        }
                        {question.question_type_id == 2 && <>
                            <div style={{color: question.isCorrect ? 'green' : 'red'}}>Your Answer: {question.providedAnswer ? <span dangerouslySetInnerHTML={{__html: question.providedAnswer}}/> : <span style={{fontWeight: 'bold'}}>Not Answered</span>}</div>
                            <div style={{color: 'green'}}>Correct Answer: {question.choices.map(choice => {
                                if(choice.selected){
                                    return <span key={choice} dangerouslySetInnerHTML={{__html: choice.content}}/> 
                                }
                            })}</div>
                        </>}
                        <div>Score: {question.assigned_score}</div>
                    </li>
                )
            })}
        </ol>
        <h1>MEDIUM</h1>
        <ol>
            {questions.filter(question=>question.difficulty_level_id === 2).map(question => {
                return(
                    <li>
                        <span dangerouslySetInnerHTML={{__html: question.content}}/>
                        {question.question_type_id !== 2 && <>
                            <div style={{
                                color: question.isCorrect ? 'green' : 'red'
                            }}>Your Answer: <span style={{fontWeight: 'bold'}}>{
                                question.provided_answer ? question.provided_answer : 'Not Answered'
                                }</span>
                            </div>
                            <div style={{
                                color: 'green'
                                }}>Correct Ans: <span style={{fontWeight: 'bold'}}>{question.choices[0].content}</span></div>
                            </>
                        }
                        {question.question_type_id == 2 && <>
                            <div style={{color: question.isCorrect ? 'green' : 'red'}}>Your Answer: {question.providedAnswer ? <span dangerouslySetInnerHTML={{__html: question.providedAnswer}}/> : <span style={{fontWeight: 'bold'}}>Not Answered</span>}</div>
                            <div style={{color: 'green'}}>Correct Answer: {question.choices.map(choice => {
                                if(choice.selected){
                                    return <span dangerouslySetInnerHTML={{__html: choice.content}}/> 
                                }
                            })}</div>
                        </>}
                        <div>Score: {question.assigned_score}</div>
                    </li>
                )
            })}
        </ol>
        <h1>HARD</h1>
        <ol>
            {questions.filter(question=>question.difficulty_level_id === 3).map(question => {
                return(
                    <li>
                        <span dangerouslySetInnerHTML={{__html: question.content}}/>
                        {question.question_type_id !== 2 && <>
                            <div style={{
                                color: question.isCorrect ? 'green' : 'red'
                            }}>Your Answer: <span style={{fontWeight: 'bold'}}>{
                                question.provided_answer ? question.provided_answer : 'Not Answered'
                                }</span>
                            </div>
                            <div style={{
                                color: 'green'
                                }}>Correct Ans: <span style={{fontWeight: 'bold'}}>{question.choices[0].content}</span></div>
                            </>
                        }
                        {question.question_type_id == 2 && <>
                            <div style={{color: question.isCorrect ? 'green' : 'red'}}>Your Answer: {question.providedAnswer ? <span dangerouslySetInnerHTML={{__html: question.providedAnswer}}/> : <span style={{fontWeight: 'bold'}}>Not Answered</span>}</div>
                            <div style={{color: 'green'}}>Correct Answer: {question.choices.map(choice => {
                                if(choice.selected){
                                    return <span dangerouslySetInnerHTML={{__html: choice.content}}/> 
                                }
                            })}</div>
                        </>}
                        <div>Score: {question.assigned_score}</div>
                    </li>
                )
            })}
        </ol>
    </div>
}

export default TestReport;