import React, { useState } from 'react';
    import CostForm from './CostForm';
    import './NewCost.css';
    import { database } from '../../firebase';
    import { ref, set } from 'firebase/database';
    import { getAuth } from 'firebase/auth';

    const NewCost = () => { 
        const [isFormVisible, setIsFormVisible] = useState(false);

        const saveCostDataHandler = async (inputCostData) => {
            const purchaseId = inputCostData.id;

            const costDataCl = {
                ...inputCostData,
                // Дата у форматі YYYY-MM-DD
            };

            console.log("Adding new cost:", costDataCl);

         

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
                {!isFormVisible && <button onClick={inputCostDataHandler}>ADD MANUALLY</button>}
                {isFormVisible && <CostForm onSaveCostData={saveCostDataHandler} onCancel={cancelCostHandler} />}
            </div>
        );
    };

    export default NewCost;
    
