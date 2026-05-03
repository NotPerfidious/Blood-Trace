/**
 * Admin Donor Management Table
 * Displays a searchable and filterable table of all registered donors.
 * Provides administrative actions like deleting donor records and viewing status details.
 */
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '@iconify/react';
import API from '../utils/API';

const Colour_Map = {
  'A+': '#ef4444', 
  'A-': '#f87171',
  'B+': '#f97316', 
  'B-': '#fb923c',
  'AB+': '#8b5cf6', 
  'AB-': '#a78bfa',
  'O+': '#3b82f6', 
  'O-': '#60a5fa',
};

function AdminUserTable() {
  const [donors, setDonors] = useState([]);
  const [search_query, setSearchQuery] = useState("");
  const [blood_filter, setBloodFilter] = useState("All Blood Types");

  const bloodTypes = Object.keys(Colour_Map);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await API.get('/admin/donors');
        setDonors(res.data.donors);
      } catch (error) {
        console.log('[ERROR] Failed to fetch donors:', error);
      }
    };
    fetchDonors();
  }, []);

  const filtered_donors = useMemo(() => {
    return donors.filter(donor => {
      const matchesSearch = donor.name.toLowerCase().includes(search_query.toLowerCase()) ||
        donor.contactNumber?.toLowerCase().includes(search_query.toLowerCase());
      const matchesBlood = blood_filter === "All Blood Types" || donor.bloodType === blood_filter;
      return matchesSearch && matchesBlood;
    });
  }, [donors, search_query, blood_filter]);

  const handle_delete = async (id) => {
    try {
      await API.delete('/admin/donor/' + id);
      setDonors(prev => prev.filter(d => d._id !== id));
    } catch (error) {
      console.log('[ERROR] Failed to delete donor:', error);
    }
  };

  const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-900">Manage Donors</h2>

        <div className="flex w-full md:w-auto flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search_query}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-100 border-none rounded-md px-4 py-2 text-sm w-full md:w-64 focus:ring-1 focus:ring-red-500 outline-none"
          />

          <select
            value={blood_filter}
            onChange={(e) => setBloodFilter(e.target.value)}
            className="bg-gray-100 border-none rounded-md px-4 py-2 text-sm focus:ring-1 focus:ring-red-500 outline-none cursor-pointer"
          >
            <option>All Blood Types</option>
            {bloodTypes.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-4 mt-8">Registered Donors</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b-2 border-gray-900 font-bold">
              <th className="pb-3 pr-4">Name</th>
              <th className="pb-3 px-4">Contact</th>
              <th className="pb-3 px-4 text-center">Blood Type</th>
              <th className="pb-3 px-4">Status</th>
              <th className="pb-3 px-4">Registration Date</th>
              <th className="pb-3 pl-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered_donors.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">No donors found.</td>
              </tr>
            ) : (
              filtered_donors.map((donor) => (
                <tr key={donor._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-4 font-semibold text-gray-800">{donor.name}</td>
                  <td className="py-4 px-4 text-gray-600">{donor.contactNumber || '—'}</td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className="inline-block px-4 py-1 text-xs font-bold rounded-full text-white"
                      style={{ backgroundColor: Colour_Map[donor.bloodType] || '#94a3b8' }}
                    >
                      {donor.bloodType}
                    </span>
                  </td>
                  <td className={`py-4 px-4 font-medium ${donor.isAvailable ? 'text-green-600' : 'text-[#D92D20]'}`}>
                    {donor.isAvailable ? 'Available' : 'Unavailable'}
                  </td>
                  <td className="py-4 px-4 text-gray-600">{formatDate(donor.createdAt)}</td>
                  <td className="py-4 pl-4 text-right">
                    <button
                      onClick={() => handle_delete(donor._id)}
                      className="text-gray-500 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition"
                      title="Delete Donor"
                    >
                      <Icon icon="mdi:minus-circle-outline" className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AdminUserTable;
