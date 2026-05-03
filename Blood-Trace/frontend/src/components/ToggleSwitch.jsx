/**
 * Toggle Switch Component
 * A reusable binary switch component used for boolean settings like
 * donor availability and notification preferences.
 */
import { useState } from 'react';

const ToggleSwitch = ({ isOn, setIsOn }) => {

    return (
        <button
            onClick={() => setIsOn(!isOn)}
            type='button'
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${isOn ? 'bg-black' : 'bg-gray-500'
                }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${isOn ? 'translate-x-6' : 'translate-x-1'
                    }`}
            />
        </button>
    );
};

export default ToggleSwitch;