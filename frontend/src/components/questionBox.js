import React, { useState } from 'react';

const QuestionBox = ({question_num, question_name}) => {

    const [answer, setAnswer] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log('Submitted Answer:', answer);
        alert(`Your answer to Question ${question_num} has been submitted: \n${answer}`);
        setSubmitted(true); // set to true, triggering green box and submission button
        setAnswer(answer);

    };

    const handleChange = (e) => {

        setAnswer(e.target.value);
        if (submitted) setSubmitted(false); // reset submitted state once edited after submissions

    };


    return (

        <form onSubmit={handleSubmit}>

            <label htmlFor='Answer ${question_num}'>{question_name}</label>
            <br />
            <textarea
                id='Answer ${question_num}'
                value={answer}
                onChange={handleChange}
                placeholder="Write your answer here..."
                rows="10"
                style={{
                    width: '50%',
                    maxWidth: '50%',
                    minWidth: '50%',
                    minHeight: '100px',
                    fontSize: '16px',
                    padding: '10px',
                    backgroundColor: submitted ? '#048701' : 'white',
                    borderColor: submitted ? '#048701' : '#ccc',
                }}
            />
            <br />
            <button
                type="submit"
                className="submit-button"
                style={{
                    backgroundColor: submitted ? '#048701' : '#5FA9E6',
                }}
            >
                Submit Answer

            </button>

        </form>

    )

}

export default QuestionBox;