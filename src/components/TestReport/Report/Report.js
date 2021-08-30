import { useSelector } from 'react-redux';
import React from 'react';

const Report = (props) => {
    console.log(props)
    const questions=useSelector(state=> state.questions)
    return(
        <ol>
            {questions.filter(question=>question.difficulty_level_id === +props.id).map(question => {
                return(
                    <li key={question.id}>
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
                        {question.question_type_id === 2 && <>
                            <div style={{color: question.isCorrect ? 'green' : 'red'}}>Your Answer: {
                                question.providedAnswer ? <span dangerouslySetInnerHTML={{__html: question.providedAnswer}}/> : 
                                <span style={{fontWeight: 'bold'}}>Not Answered</span>
                            }</div>
                            <div style={{color: 'green'}}>Correct Answer: {
                                <span dangerouslySetInnerHTML={{__html: question.choices.find(choice => choice.selected).content}}/>
                            }</div>
                        </>}
                        <div>Score: {question.assigned_score}</div>
                    </li>
                )
            })}
        </ol>
    )
}

export default Report;