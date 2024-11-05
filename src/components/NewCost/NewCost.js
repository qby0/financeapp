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
            return dateObj.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
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
            console.error('User is not authenticated.');
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
