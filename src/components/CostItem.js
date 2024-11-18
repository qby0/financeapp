// CostItem.js
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
    const [currentCategory, setCurrentCategory] = useState(props.category || 'Food'); // Категорія для витрат
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const toggleEditMode = () => {
        setEditMode(prevMode => !prevMode);
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`; // Формат YYYY-MM-DD
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
        
        if (currentUser) {
            const userId = currentUser.uid;
            const costRef = ref(database, `users/${userId}/purchases/${props.id}`);
        
            // Оновлюємо всі дані в базі даних
            const updatedData = { 
                date: formattedDate,
                cost: parseFloat(currentCost),
                type: props.type,
                category: props.type === 'expense' ? currentCategory : '', // Категорія тільки для витрат
                description: currentDescription, // Опис для всіх типів
            };

            // Логування для налагодження
            console.log('Updated Data:', updatedData);

            update(costRef, updatedData)
            .then(() => {
                console.log('Data updated successfully!');
                setEditMode(false); // Вихід з режиму редагування після збереження
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

            // Видаляємо дані з бази даних
            remove(costRef)
            .then(() => {
                console.log('Data removed successfully!');
                // Опціонально: додайте логіку для видалення елемента з UI, якщо потрібно
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
                    <div className="new-cost__control">
                        <label>Description</label>
                        <input 
                            type="text" 
                            value={currentDescription} 
                            onChange={descriptionChangeHandler} 
                            className="edit-input"
                            required
                        />
                    </div>
                    {props.type === 'expense' && (
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
                    )}
                    <input 
                        type="number" 
                        value={currentCost} 
                        onChange={costChangeHandler} 
                        min="0.01" 
                        step="0.01" 
                        className="edit-input"
                        required
                    />
                    <button onClick={saveChangesHandler} className="save">Save</button>
                    <button onClick={toggleEditMode} className="cancel">Cancel</button>
                </div>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <CostDate date={currentDate} />

                    <div className="cost-item__description">
                        <h2>{props.description}</h2>
                        {/* Видаляємо відображення категорії */}
                        {/* Якщо потрібно додати додаткову інформацію, можна зробити це тут */}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* Умовне відображення знака */}
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
