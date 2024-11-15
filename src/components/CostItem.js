import './CostItem.css';
import CostDate from './CostDate';
import Card from './Card';
import React, { useState } from 'react';
import { database } from '../firebase';
import { ref, update, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';

function CostItem(props) {
    const [editMode, setEditMode] = useState(false);
    const [currentDate, setCurrentDate] = useState(props.date);
    const [currentDescription, setCurrentDescription] = useState(props.description);
    const [currentCost, setCurrentCost] = useState(props.cost);
    const [currentCategory, setCurrentCategory] = useState(props.category); // Add Category state
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const toggleEditMode = () => {
        setEditMode(prevMode => !prevMode);
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`; // Format YYYY-MM-DD
    };

    const dateChangeHandler = (event) => {
        const newDate = new Date(event.target.value);
        setCurrentDate(newDate);
    };

    const descriptionChangeHandler = (event) => {
        setCurrentDescription(event.target.value);
    };

    const categoryChangeHandler = (event) => {
        setCurrentCategory(event.target.value);
    };

    const costChangeHandler = (event) => {
        setCurrentCost(event.target.value);
    };

    const saveChangesHandler = () => {
        const formattedDate = formatDate(currentDate);
        
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
            const userId = currentUser.uid;
            const costRef = ref(database, `users/${userId}/purchases/${props.id}`);
        
            // Update all data in the database
            const updatedData = { 
                date: formattedDate,
                cost: parseFloat(currentCost),
                type: props.type,
                category: currentCategory,
                description: props.type === 'expense' ? currentDescription : '',
            };

            update(costRef, updatedData)
            .then(() => {
                console.log('Data updated successfully!');
                setEditMode(false); // Exit edit mode after saving
            })
            .catch((error) => {
                console.error('Error updating data:', error);
            });
        }
    };

    const deleteCostHandler = () => {
        if (currentUser) {
            const userId = currentUser.uid;
            const costRef = ref(database, `users/${userId}/purchases/${props.id}`);

            // Remove data from the database
            remove(costRef)
            .then(() => {
                console.log('Data removed successfully!');
                // Optionally: Add logic to remove the item from UI
            })
            .catch((error) => {
                console.error('Error removing data:', error);
            });
        }
    };

    return (
        <Card className="cost-item">
            {editMode ? (
                <div className="edit-mode">
                    <input 
                        type="date" 
                        value={currentDate.toISOString().split('T')[0]} 
                        onChange={dateChangeHandler} 
                        className="edit-input"
                    />
                    {props.type === 'expense' && (
                        <>
                            <input 
                                type="text" 
                                value={currentDescription} 
                                onChange={descriptionChangeHandler} 
                                className="edit-input"
                            />
                            <div className="new-cost__control">
                                <label>Category</label>
                                <select value={currentCategory} onChange={categoryChangeHandler} className="edit-input">
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Housing">Housing</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </>
                    )}
                    <input 
                        type="number" 
                        value={currentCost} 
                        onChange={costChangeHandler} 
                        min="0.01" 
                        step="0.01" 
                        className="edit-input"
                    />
                    <button onClick={saveChangesHandler} className="save">Save</button>
                    <button onClick={toggleEditMode} className="cancel">Cancel</button>
                </div>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <CostDate date={currentDate} />

                    <div className="cost-item__description">
                        <h2>{props.type === 'expense' ? props.description : props.category}</h2>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* Conditional display of sign */}
                        <div className={`cost-item__price ${props.type}`}>
                            {props.type === 'expense' ? `- ${Math.abs(currentCost)}€` : `+ ${currentCost}€`}
                        </div>
                        <div className="button-container">
                            <button onClick={toggleEditMode} className="edit-button">
                                <img src="/EditIcon.png" alt="Edit" className="button-icon" />
                            </button>
                            <button onClick={deleteCostHandler} className="delete">
                                <img src="/DelIcon.png" alt="Delete" className="button-icon" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
}

export default CostItem;
