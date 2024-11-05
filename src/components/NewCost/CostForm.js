import React, { useState } from 'react';
import './CostForm.css';

const CostForm = (props) => {
    const [inputName, setInputName] = useState('');
    const [inputAmount, setInputAmount] = useState('');
    const [inputDate, setInputDate] = useState('');

    const nameChangeHandler = (event) => {
        setInputName(event.target.value);
    };

    const amountChangeHandler = (event) => {
        setInputAmount(event.target.value);
    };

    const dateChangeHandler = (event) => {
        setInputDate(event.target.value);
    };

    const generateSafeId = () => {
        return Date.now().toString() + '-' + Math.random().toString(36).substring(2, 9);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const costData = {
            id: generateSafeId(),
            description: inputName,
            cost: inputAmount,
            date: new Date(inputDate).toLocaleDateString('en-GB', { // Fixed English date format
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }),
        };

        console.log(costData);

        props.onSaveCostData(costData);
        setInputName('');
        setInputAmount('');
        setInputDate('');
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="new-cost__controls">
                <div className="new-cost__control">
                    <label>Description</label>
                    <input type="text" value={inputName} onChange={nameChangeHandler} />
                </div>
                <div className="new-cost__control">
                    <label>Price</label>
                    <input type="number" value={inputAmount} onChange={amountChangeHandler} min={0.01} step={0.01} />
                </div>
                <div className="new-cost__control">
                    <label>Date</label>
                    <input type="date" value={inputDate} onChange={dateChangeHandler} min="2000-01-01" max="2024-12-12" />
                </div>
                <div className="new-cost__actions">
                    <button type="submit">Add</button>
                    <button type="button" onClick={props.onCancel}>Cancel</button>
                </div>
            </div>
        </form>
    );
};

export default CostForm;
