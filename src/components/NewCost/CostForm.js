import React, { useState } from 'react';
import './CostForm.css';

const CostForm = (props) => {
    const [inputType, setInputType] = useState('expense'); // Тип витрати
    const [inputAmount, setInputAmount] = useState('');
    const [inputDate, setInputDate] = useState('');
    const [inputCategory, setInputCategory] = useState('Food'); // Категорія
    const [inputDescription, setInputDescription] = useState(''); // Опис

    const typeChangeHandler = (event) => {
        setInputType(event.target.value);
    };

    const amountChangeHandler = (event) => {
        setInputAmount(event.target.value);
    };

    const dateChangeHandler = (event) => {
        setInputDate(event.target.value);
    };

    const categoryChangeHandler = (event) => {
        setInputCategory(event.target.value);
    };

    const descriptionChangeHandler = (event) => {
        setInputDescription(event.target.value);
    };

    const generateSafeId = () => {
        return Date.now().toString();
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const costData = {
            id: generateSafeId(),
            type: inputType,
            category: inputCategory, // Always include Category
            description: inputType === 'expense' ? inputDescription : '', // Description only for expenses
            cost: parseFloat(inputAmount),
            date: inputDate, // Stored as YYYY-MM-DD
        };

        console.log(costData);

        props.onSaveCostData(costData);
        setInputType('expense');
        setInputAmount('');
        setInputDate('');
        setInputCategory('Food');
        setInputDescription(''); // Reset Description
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="new-cost__controls">
                <div className="new-cost__control">
                    <label>Type</label>
                    <select value={inputType} onChange={typeChangeHandler}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>

                <div className="new-cost__control">
                    <label>Category</label>
                    <select value={inputCategory} onChange={categoryChangeHandler}>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Housing">Housing</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                {inputType === 'expense' && (
                    <div className="new-cost__control">
                        <label>Description</label>
                        <input
                            type="text"
                            value={inputDescription}
                            onChange={descriptionChangeHandler}
                            required
                        />
                    </div>
                )}

                <div className="new-cost__control">
                    <label>Price</label>
                    <input
                        type="number"
                        value={inputAmount}
                        onChange={amountChangeHandler}
                        min={0.01}
                        step={0.01}
                        required
                    />
                </div>
                <div className="new-cost__control">
                    <label>Date</label>
                    <input
                        type="date"
                        value={inputDate}
                        onChange={dateChangeHandler}
                        min="2000-01-01"
                        max="2024-12-31"
                        required
                    />
                </div>
            </div>
            <div className="new-cost__actions">
                <button type="submit">Add</button>
                <button type="button" onClick={props.onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default CostForm;
