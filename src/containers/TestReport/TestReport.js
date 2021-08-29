import React from 'react';
import { useSelector } from 'react-redux';

const TestReport =(props)=>{
    const {questions, answers}=useSelector(state=>{
        console.log(state)
        return{
            questions: state.questions,
            answers: state.answerList
        }
    })
    let score=answers.filter(answer => answer.isCorrect && answer.question_type_id === 2)
    .reduce((total, ans)=> {
        console.log(total,ans)
        return total + ans.assigned_score
    }, 0)
    return<div>
        <section style={{textAlign: 'center'}}>
        <h1 >Your Score is {score}</h1>
        <button onClick={props.retakeTest}>Retake</button>
        </section>
        
        <br/>
        <p>Questions that you have answered correctly are:</p>
        <h1>EASY</h1>
        <ol>
            {answers.filter(answer=>answer.question_type_id === 1 && answer.isAnswered && answer.isCorrect).map(answer => {
                return(
                    <li>
                        <div dangerouslySetInnerHTML={{__html: answer.question}}/>
                        {/* <span>Answer: {answer.providedAnswer}</span> */}
                    </li>
                )
            })}
        </ol>
        <h1>MEDIUM</h1>
        <ol>
            {answers.filter(answer=>answer.question_type_id === 2 && answer.isAnswered && answer.isCorrect).map(answer => {
                return(
                    <li>
                        <div dangerouslySetInnerHTML={{__html: answer.question}}/>
                        {/* <span>Answer: {answer.providedAnswer}</span> */}
                    </li>
                )
            })}
        </ol>
        <h1>HARD</h1>
        <ol>
            {answers.filter(answer=>answer.question_type_id === 3 && answer.isAnswered && answer.isCorrect).map(answer => {
                return(
                    <li>
                        <div dangerouslySetInnerHTML={{__html: answer.question}}/>
                        {/* <span>Answer: {answer.providedAnswer}</span> */}
                    </li>
                )
            })}
        </ol>
    </div>
}

export default TestReport;