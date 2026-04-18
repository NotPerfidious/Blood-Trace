const LoadingPulse = () => {
    return (
        <div className="flex items-center justify-center min-h-[200px]">
            <div className="relative flex h-12 w-12">
                {/* The outer pulsing ring */}
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                {/* The solid inner circle */}
                <span className="relative inline-flex rounded-full h-12 w-12 bg-red-600"></span>
            </div>
            <p className="ml-4 text-gray-600 font-medium animate-pulse">
                Verifying Session...
            </p>
        </div>
    );
};

export default LoadingPulse;