import CostForm from './CostForm';
import './NewCost.css';
import React, { useState } from 'react';
import { database } from '../../firebase';
import { ref, set, get } from 'firebase/database';

const NewCost = (props) => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const saveCostDataHandler = (inputCostData) => {
        const costData = {
            ...inputCostData,
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
    
        const purchaseId = Date.now().toString();
        const costRef = ref(database, `purchases/${purchaseId}`);
    
        const costDataCl = {
            ...inputCostData,
            date: formattedDate,
            id: purchaseId,
        };
    
        set(costRef, costDataCl)
            .then(() => {
                console.log('Data saved to Realtime Database');
                fetchCostData(purchaseId);
            })
            .catch((error) => {
                console.error('Error saving data to Realtime Database:', error);
            });
    
        setIsFormVisible(false);
    };    

    const fetchCostData = (purchaseId) => {
        const costRef = ref(database, `purchases/${purchaseId}`);
    
        get(costRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const fetchedCostData = snapshot.val();
    
                    const formattedCostData = {
                        ...fetchedCostData,
                        date: new Date(fetchedCostData.date.split('.').reverse().join('-'))
                    };
    
                    console.log('Data fetched and formatted:', formattedCostData);
    
                    props.onAddCost(formattedCostData);
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error('Error fetching data from Realtime Database:', error);
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
            {!isFormVisible && <button onClick={inputCostDataHandler}>Add NEW Spending</button>}
            {isFormVisible && <CostForm onSaveCostData={saveCostDataHandler} onCancel={cancelCostHandler} />}
        </div>
    );
};

export default NewCost;
