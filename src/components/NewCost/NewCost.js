import React, { useState } from 'react';
    import CostForm from './CostForm';
    import './NewCost.css';
    import { database } from '../../firebase';
    import { ref, set } from 'firebase/database';
    import { getAuth } from 'firebase/auth';

    const NewCost = () => { // Видалили props
        const [isFormVisible, setIsFormVisible] = useState(false);

        const saveCostDataHandler = async (inputCostData) => {
            const purchaseId = inputCostData.id;

            const costDataCl = {
                ...inputCostData,
                // Дата вже у форматі YYYY-MM-DD, додаткове форматування не потрібне
            };

            console.log("Adding new cost:", costDataCl);

            // Видалили виклик props.onAddCost
            // props.onAddCost(inputCostData);

            setIsFormVisible(false);

            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (currentUser) {
                const userId = currentUser.uid;
                const costRef = ref(database, `users/${userId}/purchases/${purchaseId}`);

                try {
                    await set(costRef, costDataCl);
                    console.log('Data saved to Realtime Database');
                } catch (error) {
                    console.error('Error saving data to Realtime Database:', error);
                }
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
    
