import React, { useState } from 'react';
import './App.css'; // For styling

const SegmentManager = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [segmentName, setSegmentName] = useState('');
    const [selectedSchemas, setSelectedSchemas] = useState([]);
    const [availableSchemas, setAvailableSchemas] = useState([
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
    ]);

    const handleAddSchema = () => {
        if (availableSchemas.length === 0) return;

        const selectedValue = document.getElementById('schemaDropdown').value;
        const selectedOption = availableSchemas.find(schema => schema.value === selectedValue);

        setSelectedSchemas([...selectedSchemas, selectedOption]);
        setAvailableSchemas(availableSchemas.filter(schema => schema.value !== selectedValue));
    };

    const handleSubmitSegment = () => {
        const data = {
            segment_name: segmentName,
            schema: selectedSchemas.map(schema => ({ [schema.value]: schema.label })),
        };
        
        console.log('Data to send:', JSON.stringify(data));
        
        fetch('https://webhook.site/bcd2b3a6-c17e-42da-ac23-4566a1b21282', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
        
        setSegmentName('');
        setSelectedSchemas([]);
        setAvailableSchemas([
            { label: 'First Name', value: 'first_name' },
            { label: 'Last Name', value: 'last_name' },
            { label: 'Gender', value: 'gender' },
            { label: 'Age', value: 'age' },
            { label: 'Account Name', value: 'account_name' },
            { label: 'City', value: 'city' },
            { label: 'State', value: 'state' },
        ]);
        setShowPopup(false);
    };

    return (
        <div>
            <button onClick={() => setShowPopup(true)}>Save segment</button>

            {showPopup && (
                <div id="popup">
                    <label htmlFor="segmentName">Segment Name:</label>
                    <input
                        type="text"
                        id="segmentName"
                        value={segmentName}
                        onChange={(e) => setSegmentName(e.target.value)}
                        placeholder="Enter segment name"
                    /><br /><br />

                    <label htmlFor="schemaDropdown">Add schema to segment:</label>
                    <select id="schemaDropdown">
                        {availableSchemas.map(schema => (
                            <option key={schema.value} value={schema.value}>
                                {schema.label}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleAddSchema}>+Add new schema</button>

                    <div id="schema-container">
                        {selectedSchemas.map((schema, index) => (
                            <div key={index}>
                                <select
                                    value={schema.value}
                                    onChange={(e) => {
                                        const newSchemas = [...selectedSchemas];
                                        const newValue = e.target.value;
                                        const newLabel = availableSchemas.find(s => s.value === newValue).label;
                                        newSchemas[index] = { label: newLabel, value: newValue };
                                        setSelectedSchemas(newSchemas);
                                    }}
                                >
                                    {[schema, ...availableSchemas].map(s => (
                                        <option key={s.value} value={s.value}>
                                            {s.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>

                    <button onClick={handleSubmitSegment}>Save the segment</button>
                </div>
            )}
        </div>
    );
};

export default SegmentManager;
