import React from 'react';
import './CostsFilter.css';

const CostsFilter = (props) => {
  const yearChangeHandler = (event) => {
    props.onChangeYear(event.target.value);
  };

  const monthChangeHandler = (event) => {
    props.onChangeMonth(event.target.value);
  };

  return (
    <div className="costs-filter">
      <div className="costs-filter__control">
        <label>Filter by year</label>
        <select value={props.year} onChange={yearChangeHandler}>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
      </div>
      <div className="costs-filter__control">
        <label>Filter by month</label>
        <select value={props.month} onChange={monthChangeHandler}>
          <option value="">All</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
    </div>
  );
};

export default CostsFilter;
