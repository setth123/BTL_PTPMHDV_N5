import { useState, useEffect } from "react";
import './selectInput.css';

const SelectInput = ({ data, name, onChange, isRanked = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedName, setSelectedName] = useState(null);

    useEffect(() => {
        if (data && typeof data === 'object') {
            setOptions(Object.entries(data));
        }
    }, [data]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (key) => {
        setSelectedValue(key.value.id);
        setSelectedName(key.value.name);
        setIsOpen(false);
        if (onChange) {
            onChange(key.value.id);
        }
    };

    return (
        <div className="combobox-container">
            {/* Input box to toggle dropdown */}
            <input
                type="text"
                className="combobox-input"
                readOnly
                onClick={toggleDropdown}
                value={selectedName || name}
            />
            {/* Dropdown arrow */}
            <div
                className={`combobox-arrow ${isOpen ? "open" : ""}`}
                onClick={toggleDropdown}
            >
                {isOpen ? "▲" : "▼"}
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="combobox-menu">
                    {options.map(([key, value], index) => (
                        isRanked ? (
                            <div
                                key={key}
                                className={`combobox-item ${index < 3 ? "highlight" : ""}`}
                                onClick={() => handleSelect({ key, value })}
                            >
                                <span
                                    style={{
                                        fontWeight: index < 3 ? "bold" : "normal",
                                    }}
                                >
                                    {value.name} {index < 3 && "⭐"}
                                </span>
                            </div>
                        ) : (
                            <div
                                key={key}
                                className="combobox-item"
                                onClick={() => handleSelect({ key, value })}
                            >
                                {value.name}
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectInput;
