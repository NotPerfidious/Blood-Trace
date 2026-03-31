import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { bloodCompatibility } from './data';


const createDonorMarker = (donor, receipentBloodType) => {
    // 1. Determine the color hex
    let colorHex = '#2563eb'; // Default Blue
    if (!donor.isAvailable) colorHex = '#D22828'; // Red (Blood Primary)
    else if (donor.bloodType === receipentBloodType) colorHex = '#16a34a'; // Green

    // 2. The boxicons:location-filled SVG path
    const pinPath = "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z";

    // 3. Construct the SVG HTML
    const iconHTML = `
        <div style="filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.3)); display: flex; justify-content: center;">
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- The Pin -->
                <path  d="${pinPath}" fill="${colorHex}" />
                
                <!-- The White Inner Circle -->
                <circle cx="12" cy="9" r="5.5" fill="white" />
                
                <!-- The Blood Type Text -->
                <text 
                    x="12" 
                    y="10.5" 
                    fill="${colorHex}" 
                    font-size="4.5" 
                    font-weight="bold" 
                    text-anchor="middle" 
                    font-family="Arial, sans-serif"
                >
                    ${donor.bloodType}
                </text>
            </svg>
        </div>
    `;

    return L.divIcon({
        html: iconHTML,
        className: '', // Keeps Leaflet from adding default gray backgrounds
        iconSize: [45, 45],
        iconAnchor: [22.5, 45], // Points the bottom tip to the coordinates
    });
};

export default createDonorMarker;