import React, { useMemo } from 'react';
// import { useSelector } from 'react-redux';

import Report from './Report/Report';
import { DIFFICULTLEVEL } from '../../localConfig/quesConfig';
import './TestReport.css';
import { useSessionStorage } from '../CustomHooks';

const TestReport =(props)=>{
    /* const {questions}= useSelector(state=>{
        return{
            questions: state.questions,
        }
    }) */

    const [showReport, setShowReport] = useSessionStorage('showReport', false)

    const questions=JSON.parse(sessionStorage.getItem('questions'))

    let score=questions.filter(question => question.question_type_id !== 1 && question.isCorrect)
    .reduce((total, ques)=> {
        return total + ques.assigned_score
    }, 0)

    const detailedReport=useMemo(()=>{
        sessionStorage.setItem('showReport', JSON.stringify(showReport))
        return (Object.keys(DIFFICULTLEVEL).map(key => {
            return<div key={key}>
                <h1>{DIFFICULTLEVEL[key]}</h1>
                <Report id={key}/>
            </div>
        }))
    }, [questions])

    return <div className='TestReport'>
                <section style={{textAlign: 'center'}}>
                    <h1 >Your Score is {score}</h1>
                    <button onClick={props.retakeTest}>Retake</button>
                    <button className='ReportButton' onClick={()=>{setShowReport(!showReport)}}>
                        {!showReport ? "Show Report" : "Hide Report"}
                    </button>
                </section>
                {/* <p>Detail Report</p> */}
                {showReport ? detailedReport : null}
    </div>
}

export default TestReport;