const bloodDonors = [
    {
        id: 1,
        name: "Ayesha Malik",
        bloodType: "O-",
        geolocation: [31.5250, 74.3480], // Gulberg III
        contactNumber: "+92 303 4567890",
        isAvailable: true,
        lastDonationDate: "2025-09-10"
    },
    {
        id: 2,
        name: "Zain Ahmed",
        bloodType: "A+",
        geolocation: [31.4700, 74.2700], // Johar Town Phase 2
        contactNumber: "+92 321 5551234",
        isAvailable: true,
        lastDonationDate: "2026-01-15"
    },
    {
        id: 3,
        name: "Bilal Khan",
        bloodType: "B+",
        geolocation: [31.5800, 74.4000], // DHA Phase 5
        contactNumber: "+92 345 6789012",
        isAvailable: false,
        lastDonationDate: "2026-03-05"
    },
    {
        id: 4,
        name: "Sara Ali",
        bloodType: "AB-",
        geolocation: [31.4000, 74.2000], // Bahria Town
        contactNumber: "+92 300 1112233",
        isAvailable: true,
        lastDonationDate: null
    },
    {
        id: 5,
        name: "Hamza Sheikh",
        bloodType: "O+",
        geolocation: [31.6500, 74.3000], // Shadman / Walled City area
        contactNumber: "+92 312 9988776",
        isAvailable: true,
        lastDonationDate: "2025-11-20"
    },
    {
        id: 6,
        name: "Fatima Noor",
        bloodType: "B-",
        geolocation: [31.5000, 74.5500], // Near Barki Road
        contactNumber: "+92 333 4445566",
        isAvailable: false,
        lastDonationDate: "2025-12-30"
    },
    {
        id: 7,
        name: "Usman Ghani",
        bloodType: "A-",
        geolocation: [31.5500, 74.3200], // Model Town
        contactNumber: "+92 301 7778899",
        isAvailable: true,
        lastDonationDate: "2026-02-10"
    },
    {
        id: 8,
        name: "Mariam Javed",
        bloodType: "O-",
        geolocation: [31.4500, 74.3000], // Township / Green Town
        contactNumber: "+92 322 4455667",
        isAvailable: true,
        lastDonationDate: "2025-08-25"
    },
    {
        id: 9,
        name: "Omer Farooq",
        bloodType: "AB+",
        geolocation: [31.6000, 74.3800], // Cavalry Ground
        contactNumber: "+92 344 1234567",
        isAvailable: true,
        lastDonationDate: null
    },
    {
        id: 10,
        name: "Zoya Hassan",
        bloodType: "B+",
        geolocation: [31.3500, 74.1500], // Near Valencia / LDA City
        contactNumber: "+92 315 6677889",
        isAvailable: true,
        lastDonationDate: "2026-03-20"
    },
    {
        id: 11,
        name: "Ali Raza",
        bloodType: "O+",
        geolocation: [31.7500, 74.4500], // Near Muridke (North spread)
        contactNumber: "+92 306 2233445",
        isAvailable: false,
        lastDonationDate: "2025-10-05"
    },
    {
        id: 12,
        name: "Sana Pervez",
        bloodType: "A+",
        geolocation: [31.5200, 74.2000], // Thokar Niaz Baig
        contactNumber: "+92 331 9876543",
        isAvailable: true,
        lastDonationDate: "2026-01-01"
    },
    {
        id: 13,
        name: "Haider Sultan",
        bloodType: "B-",
        geolocation: [31.4200, 74.4500], // DHA Phase 8 / Air Avenue
        contactNumber: "+92 320 1122334",
        isAvailable: true,
        lastDonationDate: "2025-09-28"
    },
    {
        id: 14,
        name: "Amna Iftikhar",
        bloodType: "AB-",
        geolocation: [31.6200, 74.2500], // Shahdara / Ravi Road
        contactNumber: "+92 304 5566778",
        isAvailable: true,
        lastDonationDate: null
    },
    {
        id: 15,
        name: "Kamran Akmal",
        bloodType: "O-",
        geolocation: [31.5500, 74.5000], // Near Jallo Park
        contactNumber: "+92 335 8899001",
        isAvailable: false,
        lastDonationDate: "2026-03-12"
    }
];

const bloodCompatibility = {
    'O-'/*can receive from*/: ['O-'],
    'O+': ['O+', 'O-'],
    'A-': ['A-', 'O-'],
    'A+': ['A+', 'A-', 'O+', 'O-'],
    'B-': ['B-', 'O-'],
    'B+': ['B+', 'B-', 'O+', 'O-'],
    'AB-': ['AB-', 'A-', 'B-', 'O-'],
    'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']
}


export { bloodDonors, bloodCompatibility };