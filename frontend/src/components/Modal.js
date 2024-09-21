import React, { useState } from "react";
import Form from "./form";
import './form.css';

const Modal = () => {

    const [open, setOpen] = useState(false);
    const [confidence, setConfidence] = useState("");
    const [belonging, setBelonging] = useState("");
    const [challenging, setChallenging] = useState("");
    const [improvements, setImprovements] = useState("");
    const [survey, setSurvey] = useState(false);

    const handleClose = () => {

        setOpen(false);

    };

    const handleOpen = () => {

        setOpen(true);
        resetForm();

    };

    const resetForm = () => {

        setConfidence("");
        setBelonging("");
        setChallenging("");
        setImprovements("");

    }

    const handleSubmit = (e) => {

        e.preventDefault()

        if (confidence && belonging && challenging && improvements) {

            alert("Survey sucessfully submitted!");
            setSurvey(true);
            //handleClose();
            setTimeout(handleClose, 1000);

        } else {

            alert("Please fill out the the fields.")

        }

    }

    return (
        <div style={{ textAlign: "center", display: "block", padding: 10, margin: "auto" }}>

            <button type="button" onClick={handleOpen} style={{ backgroundColor: survey ? '#4CAF50' : '#5FA9E6' }}>
                Survey
            </button>

            {open && (

                <div className="modal">

                    <Form>

                        <>

                            <survey-title>Lesson Feedback Survey</survey-title>
                            <form onSubmit={handleSubmit}> 
                                <label htmlFor="confidence">How confident are you in the topic (0-10)?</label>
                                <select id="confidence" value={confidence} onChange={(e) => setConfidence(e.target.value)}>
                                <option value="">Select...</option>
                                    {[...Array(11).keys()].map(num => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>

                                <label htmlFor="belonging">What is your sense of belonging in this program (0-10)?</label>
                                <select id="belonging" value={belonging} onChange={(e) => setBelonging(e.target.value)}>
                                <option value="">Select...</option>
                                    {[...Array(11).keys()].map(num => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>

                                <label htmlFor="challenging">What was the most challenging part of this lesson?</label>
                                <textarea id="challenging" value={challenging} onChange={(e) => setChallenging(e.target.value)} rows="4"/>

                                <label htmlFor="improvements">What can we do to make the experience better?</label>
                                <textarea id="improvements" value={improvements} onChange={(e) => setImprovements(e.target.value)} rows="4" />

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                    <button type="button" style={{ backgroundColor: '#b8021a', marginRight: '0px' }} onClick={handleClose}>Close</button>
                                    <button type="submit" style={{ backgroundColor: '#5FA9E6' }}>Submit</button>
                                </div>

                            </form>

                        </>

                    </Form>

                </div>

            )}

        </div>

    );

};

export default Modal;
