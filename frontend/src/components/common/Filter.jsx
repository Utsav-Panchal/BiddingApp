import React from 'react';
import '../../styles/filter.css';

const Filter = ({ onFilterChange }) => {
    return (
        <div className="filter">
            <input
                type="text"
                placeholder="Search by name..."
                onChange={(e) => onFilterChange('name', e.target.value)}
            />
            <select onChange={(e) => onFilterChange('sort', e.target.value)}>
                <option value="">Sort By</option>
                <option value="highest">Highest Bid</option>
                <option value="lowest">Lowest Bid</option>
            </select>
        </div>
    );
};

export default Filter;
