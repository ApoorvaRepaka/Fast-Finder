import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './SearchBar.css'; // Ensure this file exists in the same directory

const SearchBar = () => {
    const [options, setOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        // Fetch data from the JSON file
        axios.get('/countries.json')
            .then(response => {
                const data = response.data;
                const formattedOptions = data.map(country => ({
                    value: country.country,
                    label: `${country.country} (Capital: ${country.capital})`
                }));
                setOptions(formattedOptions);
                setFilteredOptions(formattedOptions);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        // Filter options based on inputValue
        const lowercasedInput = inputValue.toLowerCase();
        const filtered = options.filter(option =>
            option.label.toLowerCase().includes(lowercasedInput)
        );
        setFilteredOptions(filtered);
    }, [inputValue, options]);

    const handleInputChange = (newValue) => {
        setInputValue(newValue);
    };

    const handleChange = (selectedOption) => {
        if (selectedOption) {
            alert(`You selected ${selectedOption.label}`);
        }
    };

    return (
        <div className="search-bar">
            <Select
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onChange={handleChange}
                options={filteredOptions}
                placeholder="Search for a country or capital..."
                isClearable
                isSearchable
                noOptionsMessage={() => 'No suggestions available'}
            />
        </div>
    );
};

export default SearchBar;
