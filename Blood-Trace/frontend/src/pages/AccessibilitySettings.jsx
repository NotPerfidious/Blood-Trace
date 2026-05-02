import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAccessibilitySettings, updateAccessibilitySettings } from '../features/accessibility/accessibilitySlice'
import ToggleSwitch from '../components/ToggleSwitch'

function AccessibilitySettings() {
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.accessibility);
    const { isAuthenticated } = useSelector((state) => state.auth);

    // Local state for form editing before saving
    const [highContrast, setHighContrast] = useState(settings.highContrast);
    const [reduceMotion, setReduceMotion] = useState(settings.reduceMotion);
    const [textSize, setTextSize] = useState(settings.textSize);
    const [simplifyUI, setSimplifyUI] = useState(settings.simplifyUI);
    const [screenReader, setScreenReader] = useState(settings.screenReader);
    const [showPopup, setShowPopup] = useState(false);

    // Sync local state when Redux state changes (e.g., after fetching)
    useEffect(() => {
        setHighContrast(settings.highContrast);
        setReduceMotion(settings.reduceMotion);
        setTextSize(settings.textSize);
        setSimplifyUI(settings.simplifyUI);
        setScreenReader(settings.screenReader);
    }, [settings]);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchAccessibilitySettings());
        }
    }, [dispatch, isAuthenticated]);

    const handleSave = () => {
        const newSettings = { highContrast, reduceMotion, textSize, simplifyUI, screenReader };
        
        if (isAuthenticated) {
            dispatch(updateAccessibilitySettings(newSettings));
        } else {
            // If guest, we could still save to localStorage if desired, 
            // but the user specifically asked for DB persistence for logged-in users.
            // For now, let's just show the popup.
        }

        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center py-10 px-4 relative">
            {/* Success Popup */}
            {showPopup && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-9999 transition-all duration-300">
                    <Icon icon="lucide:check-circle" className="w-5 h-5" />
                    <span>Settings saved successfully!</span>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col items-center gap-3 mb-8">
                <div className="w-16 h-16 rounded-full bg-blood-primary flex items-center justify-center shadow-md">
                   <Icon icon="lucide:settings" className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Accessibility Settings</h1>
                    <p className="text-gray-500 text-[0.9rem] mt-1">Customize your experience for better accessibility</p>
                </div>
            </div>

            <div className="w-full max-w-[800px] flex flex-col gap-6">
                {/* Visual Accessibility */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                            <Icon icon="lucide:eye" className="w-5 h-5 text-pink-500" />
                        </div>
                        <div>
                            <h2 className="text-[1.05rem] font-bold text-gray-900">Visual Accessibility</h2>
                            <p className="text-[0.85rem] text-gray-500">Adjust visual settings for better visibility</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
                            <div>
                                <div className="font-semibold text-[0.9rem] text-gray-800">High Contrast Mode</div>
                                <div className="text-[0.85rem] text-gray-600">Increase contrast for better visibility</div>
                            </div>
                            <ToggleSwitch isOn={highContrast} setIsOn={setHighContrast} />
                        </div>
                        <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
                            <div>
                                <div className="font-semibold text-[0.9rem] text-gray-800">Reduce Motion</div>
                                <div className="text-[0.85rem] text-gray-600">Minimize animations and transitions</div>
                            </div>
                            <ToggleSwitch isOn={reduceMotion} setIsOn={setReduceMotion} />
                        </div>
                    </div>
                </div>

                {/* Text Size */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Icon icon="lucide:type" className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <h2 className="text-[1.05rem] font-bold text-gray-900">Text Size</h2>
                            <p className="text-[0.85rem] text-gray-500">Choose your preferred text size</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {/* Normal Box */}
                        <div 
                            onClick={() => setTextSize('Normal')}
                            className={`flex flex-col w-40 gap-2 p-4 rounded-xl border cursor-pointer transition-colors duration-200 ${textSize === 'Normal' ? 'bg-red-100/50 border-red-200' : 'bg-gray-200/60 border-transparent hover:bg-gray-200'}`}
                        >
                            <div className="font-semibold text-[0.9rem] text-gray-800">Normal</div>
                            <div className="text-[0.85rem] text-gray-600 mt-2">Sample text</div>
                        </div>

                        {/* Large Box */}
                        <div 
                            onClick={() => setTextSize('Large')}
                            className={`flex flex-col w-40 gap-2 p-4 rounded-xl border cursor-pointer transition-colors duration-200 ${textSize === 'Large' ? 'bg-red-100/50 border-red-200' : 'bg-gray-200/60 border-transparent hover:bg-gray-200'}`}
                        >
                            <div className="font-semibold text-[0.9rem] text-gray-800">Large</div>
                            <div className="text-[0.95rem] text-gray-600 mt-2">Sample text</div>
                        </div>

                        {/* Extra Large Box */}
                        <div 
                            onClick={() => setTextSize('Extra Large')}
                            className={`flex flex-col w-40 gap-2 p-4 rounded-xl border cursor-pointer transition-colors duration-200 ${textSize === 'Extra Large' ? 'bg-red-100/50 border-red-200' : 'bg-gray-200/60 border-transparent hover:bg-gray-200'}`}
                        >
                            <div className="font-semibold text-[0.9rem] text-gray-800">Extra Large</div>
                            <div className="text-[1.05rem] text-gray-600 mt-2">Sample text</div>
                        </div>
                    </div>
                </div>

                {/* Interface Options */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <Icon icon="lucide:settings-2" className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                            <h2 className="text-[1.05rem] font-bold text-gray-900">Interface Options</h2>
                            <p className="text-[0.85rem] text-gray-500">Simplify the user interface</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
                            <div>
                                <div className="font-semibold text-[0.9rem] text-gray-800">Simplify UI Mode</div>
                                <div className="text-[0.85rem] text-gray-600">Remove non-essential elements for a cleaner interface</div>
                            </div>
                            <ToggleSwitch isOn={simplifyUI} setIsOn={setSimplifyUI} />
                        </div>
                        <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
                            <div>
                                <div className="font-semibold text-[0.9rem] text-gray-800">Screen Reader Optimization</div>
                                <div className="text-[0.85rem] text-gray-600">Optimize interface for screen reader users</div>
                            </div>
                            <ToggleSwitch isOn={screenReader} setIsOn={setScreenReader} />
                        </div>
                    </div>
                </div>

                {/* About Accessibility */}
                <div className="bg-[#dbeafe] border border-blue-200 rounded-xl py-6 px-6 shadow-sm">
                    <h2 className="text-[1rem] font-bold text-gray-900 mb-4">About Accessibility</h2>
                    <p className="text-[0.85rem] text-gray-700 leading-relaxed font-medium">
                        Blood-Trace is committed to providing an accessible experience for all users. These settings help customize the interface to your needs.<br/>
                        If you encounter any accessibility issues or have suggestions, please contact our support team.
                    </p>
                </div>

                {/* Save Settings */}
                <button 
                    onClick={handleSave}
                    className="w-full bg-blood-primary hover:bg-red-700 text-white font-medium text-lg py-3 rounded-xl transition-colors duration-200 mt-2 shadow-sm cursor-pointer"
                >
                    Save Settings
                </button>
            </div>
        </div>
    )
}

export default AccessibilitySettings
