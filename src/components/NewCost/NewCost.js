import CostForm from './CostForm';
import './NewCost.css';
import React, { useState } from 'react';
import { database } from '../../firebase';
import { ref, set } from 'firebase/database';

const NewCost = (props) => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const saveCostDataHandler = (inputCostData) => {

        const costData = {
            ...inputCostData,
            //id: Math.random().toString()
        };        

        const full = costData.date;

        const extractDateFromString = (full) => {
            const dateObj = new Date(full); 
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();
          
            return `${day}.${month}.${year}`;
        };

        const formattedDate = extractDateFromString(full);
          
        const costDataCl = {
            ...inputCostData,
            date: formattedDate
        };

        console.log(formattedDate);

        props.onAddCost(costData);
        setIsFormVisible(false);

        const purchaseId = Date.now().toString();
        const costRef = ref(database, `purchases/${purchaseId}`);

        set(costRef, costDataCl)
            .then(() => {
                console.log('Data saved to Realtime Database');
            })
            .catch((error) => {
                console.error('Error saving data to Realtime Database:', error);
            });
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
