import CostForm from './CostForm';
import './NewCost.css';
import React, { useState } from 'react';
import { database } from '../../firebase';
import { ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const NewCost = (props) => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const saveCostDataHandler = (inputCostData) => {
        const purchaseId = Date.now().toString();

        const costData = {
            ...inputCostData,
            id: purchaseId,
        };

        const full = costData.date;
    
        const extractDateFromString = (full) => {
            const dateObj = new Date(full);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();
    
            return `${day}-${month}-${year}`;
        };

        const formattedDate = extractDateFromString(full);
    
        const costDataCl = {
            ...inputCostData,
            date: formattedDate,
            id: purchaseId,
        };

        props.onAddCost(costData);
        setIsFormVisible(false);

        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
            const userId = currentUser.uid;
            const costRef = ref(database, `users/${userId}/purchases/${purchaseId}`);

            set(costRef, costDataCl)
                .then(() => {
                    console.log('Data saved to Realtime Database');
                })
                .catch((error) => {
                    console.error('Error saving data to Realtime Database:', error);
                });
        } else {
            console.error('Пользователь не аутентифицирован.');
        }
    };

    const inputCostDataHandler = () => {
        setIsFormVisible(true);
    };

    const cancelCostHandler = () => {
        setIsFormVisible(false);
    };

    return (
        <div className="new-cost">
            {!isFormVisible && <button onClick={inputCostDataHandler}>Add Manually</button>}
            {isFormVisible && <CostForm onSaveCostData={saveCostDataHandler} onCancel={cancelCostHandler} />}
        </div>
    );
};

export default NewCost;