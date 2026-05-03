

/**
 * Blood-Trace Logo Component
 * A reusable component for displaying the application's logo with customizable dimensions.
 */
function BloodTraceLogo({logo, dimensions='w-14 h-14'}) {

    return (
        <>
            <div className={`${dimensions} flex justify-center items-center`}>
               <img className='w-full' src={logo} alt="" />
            </div>
        </>
    )
}

export default BloodTraceLogo;