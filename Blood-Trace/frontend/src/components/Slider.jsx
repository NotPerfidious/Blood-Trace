

/**
 * Search Radius Slider
 * A custom-styled range input component used for adjusting the donor search radius.
 * Features dynamic background sizing and consistent styling across browsers.
 */
const Slider = ({value, setValue}) => {
    const min = 1;
    const max = 50;

    // This calculates the percentage for the black filled part of the track
    const getBackgroundSize = () => {
        return {
            backgroundSize: `${((value - min) * 100) / (max - min)}% 100%`,
        };
    };

    return (
        <div className="flex flex-col w-full max-w-sm gap-2 font-roboto">
            <div className="relative w-full h-6 flex items-center">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    style={getBackgroundSize()}
                    className="
            w-full h-2 rounded-full appearance-none cursor-pointer
            /* Track Background (The Gray Part) */
            bg-gray-200 bg-no-repeat
            /* Filled Background (The Black Part) */
            bg-linear-to-r from-black to-black
            
            /* Thumb Styling (The White Circle) */
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-black
            [&::-webkit-slider-thumb]:shadow-sm
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:active:scale-110

            /* Firefox Support */
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-black
          "
                />
            </div>

            {/* Labels below the slider */}
            <div className="flex justify-between text-xs font-bold text-gray-400">
                <span>{min} km</span>
                <span>{max} km</span>
            </div>
        </div>
    );
};

export default Slider;