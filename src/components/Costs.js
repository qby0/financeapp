import Card from "./Card";
import CostItem from "./CostItem";
import CostsFilter from "./NewCost/CostsFilter";
import './Costs.css'
import React, {useState} from "react";

function Costs(props) {

    const [selectedYear, setSelectedYear] = useState("2024");

    const yearChangeHandler = (year) => {
        setSelectedYear(year);
    };

    const filteredCosts = props.costs.filter(cost => {
        return cost.date.getFullYear().toString() === selectedYear;
    })

    return(
        <div>
            <Card className="costs">
                <CostsFilter year={selectedYear} onChangeYear={yearChangeHandler}/>
                {filteredCosts.length === 0 ? <p></p> :
                    filteredCosts.map((cost) => (
                        <CostItem
                            date={cost.date} 
                            description={cost.description} 
                            cost={cost.cost}
                        />
                    ))
                }
            </Card>
        </div>
    )
}

export default Costs;