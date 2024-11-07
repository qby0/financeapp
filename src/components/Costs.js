import React from 'react';
import CostItem from './CostItem';
import Card from './Card';
import CostsFilter from '../components/NewCost/CostsFilter';
import './Costs.css';

function Costs(props) {
    const { costs, selectedYear, selectedMonth, onChangeYear, onChangeMonth } = props;

    const filteredCosts = costs.filter(cost => {
        const costYear = cost.date.getFullYear().toString();
        const costMonth = ("0" + (cost.date.getMonth() + 1)).slice(-2);

        const yearMatch = costYear === selectedYear;
        const monthMatch = selectedMonth ? costMonth === selectedMonth : true;

        return (cost.type === 'expense' || cost.type === 'income') && yearMatch && monthMatch;
    });

    return (
        <div>
            <Card className="costs">
                <CostsFilter
                    year={selectedYear}
                    month={selectedMonth}
                    onChangeYear={onChangeYear}
                    onChangeMonth={onChangeMonth}
                />
                {filteredCosts.length === 0 ? (
                    <p>No spends this year/month</p>
                ) : (
                    filteredCosts.map((cost) => (
                        <CostItem
                            key={cost.id}
                            id={cost.id}
                            date={cost.date}
                            description={cost.description}
                            cost={cost.cost}
                            type={cost.type}
                        />
                    ))
                )}
            </Card>
        </div>
    );
}

export default Costs;
