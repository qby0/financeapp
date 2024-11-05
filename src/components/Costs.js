import React, { useState, useEffect } from 'react';
import CostItem from './CostItem';
import Card from './Card';
import CostsFilter from './NewCost/CostsFilter';
import { database } from '../firebase';
import { ref, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import './Costs.css';

function Costs(props) {
    const [selectedYear, setSelectedYear] = useState("2024");
    const [loadedCosts, setLoadedCosts] = useState([]);


    useEffect(() => {
        const fetchCosts = async () => {
            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (currentUser) {
                const userId = currentUser.uid;
                const costsRef = ref(database, `users/${userId}/purchases`);

                try {
                    const snapshot = await get(costsRef);
                    if (snapshot.exists()) {
                        const fetchedCosts = snapshot.val();

                        const costsArray = Object.keys(fetchedCosts).map(key => {
                            return {
                                ...fetchedCosts[key],
                                date: new Date(fetchedCosts[key].date.split('.').reverse().join('-'))
                            };
                        });

                        setLoadedCosts(costsArray);
                    } else {
                        console.log('No data available');
                    }
                } catch (error) {
                    console.error('Error fetching costs from Realtime Database:', error);
                }
            }
        };

        fetchCosts();
    }, []);

    const yearChangeHandler = (year) => {
        setSelectedYear(year);
    };

    const filteredCosts = loadedCosts.filter(cost => {
        return cost.date.getFullYear().toString() === selectedYear;
    });

    return (
        <div>
            <Card className="costs">
                <CostsFilter year={selectedYear} onChangeYear={yearChangeHandler} />
                {filteredCosts.length === 0 ? <p>No spends this year</p> :
                    filteredCosts.map((cost) => (
                        <CostItem
                            id={cost.id}
                            date={cost.date}
                            description={cost.description}
                            cost={cost.cost}
                        />
                    ))
                }
            </Card>
        </div>
    );
}

export default Costs;
