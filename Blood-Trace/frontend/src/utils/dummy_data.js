/**
 * Dummy Application Data
 * Provides mock notifications, statistics, and user data for development,
 * testing, and UI demonstration purposes.
 */
export const d_Notifications = [
  {
    id: 1,
    type: "Emergency",
    title: "Urgent Blood Request",
    description: "O+ blood needed in Gulberg area. 5 km from your location.",
    time: "5 min ago",
    unread: true,
    response: true,
  },
  {
    id: 2,
    type: "Requests",
    title: "Direct Request Received",
    description: "Someone has requested your assistance for blood donation.",
    time: "1 hour ago",
    unread: true,
    response: true,
  },
  {
    id: 3,
    type: "Info",
    title: "Donation Eligibility",
    description: "You are now eligible to donate blood again.",
    time: "2 days ago",
    unread: false,
    response: false,
  },
  {
    id: 4,
    type: "Requests",
    title: "Blood Request Nearby",
    description: "A+ blood needed in Model Town area.",
    time: "1 week ago",
    unread: false,
    response: false,
  }
];

export const a_stats = {
  total_donors: 165,
  active_requests: 27,
  verified_donors: 142,
  success_rate: "80%"
};

export const admin_graphs = [
  { type: "O+", count: 45, color: "#EF4444" },
  { type: "A+", count: 38, color: "#F97316" },
  { type: "B+", count: 32, color: "#10B981" },
  { type: "AB+", count: 15, color: "#3B82F6" },
  { type: "O-", count: 12, color: "#A855F7" },
  { type: "A-", count: 10, color: "#EC4899" },
  { type: "B-", count: 8, color: "#2DD4BF" },
  { type: "AB-", count: 15, color: "#EA580C" }
];

export const admin_users = [
  { id: 1, name: "Sarah Faisal", location: "Gulberg, Lahore", blood_type: "O+", status: "Active" },
  { id: 2, name: "Rehan Ahmad", location: "DHA, Lahore", blood_type: "A+", status: "Responded" },
  { id: 3, name: "Karamat Umer", location: "Model Town, Lahore", blood_type: "A-", status: "Active" }
];
