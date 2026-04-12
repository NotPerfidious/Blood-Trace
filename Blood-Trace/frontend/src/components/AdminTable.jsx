import { useState, useMemo } from 'react';
import { admin_users, admin_graphs } from '../utils/dummy_data';
import { Icon } from '@iconify/react';

function AdminUserTable() {
  const [users, setUsers] = useState(admin_users);
  const [search_query, setSearchQuery] = useState("");
  const [blood_filter, setBloodFilter] = useState("All Blood Types");
  
  const [show_add_form, setShowAddForm] = useState(false);
  const [new_name, setNewName] = useState("");
  const [new_location, setNewLocation] = useState("");
  const [new_blood_type, setNewBloodType] = useState("O+");
  const [new_status, setNewStatus] = useState("Active");

  const filtered_users = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(search_query.toLowerCase()) || 
                            user.location.toLowerCase().includes(search_query.toLowerCase());
      const matchesBlood = blood_filter === "All Blood Types" || user.blood_type === blood_filter;
      
      return matchesSearch && matchesBlood;
    });
  }, [users, search_query, blood_filter]);

  const handle_add_user = (e) => {
    e.preventDefault();
    if (!new_name.trim() || !new_location.trim())
       return;

    const newUser = {
      id: Date.now(),
      name: new_name,
      location: new_location,
      blood_type: new_blood_type,
      status: new_status
    };

    setUsers([newUser, ...users]);
  
    setNewName("");
    setNewLocation("");
    setNewBloodType("O+");
    setNewStatus("Active");
    setShowAddForm(false);
  };

  const delete_dummy_user = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const get_blood_type_color = (type) => {
    const found = admin_graphs.find(b => b.type === type);
    return found ? found.color : "bg-gray-400";
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-900">Manage Users / Donors</h2>
        
        <div className="flex w-full md:w-auto flex-col md:flex-row gap-3">
          <input 
            type="text" 
            placeholder="Search by name or location..." 
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
            {admin_graphs.map(b => (
               <option key={b.type} value={b.type}>{b.type}</option>
            ))}
          </select>

          <button 
            onClick={() => setShowAddForm(!show_add_form)}
            className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-800 transition"
          >
             <Icon icon={show_add_form ? "mdi:minus" : "mdi:plus"} /> 
             {show_add_form ? "Cancel Adding" : "Add New Donor"}
          </button>
        </div>
      </div>

      {show_add_form && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
           <h3 className="font-bold text-sm mb-4">Add New Donor</h3>
           <form onSubmit={handle_add_user} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="flex flex-col">
                 <label className="text-xs font-medium text-gray-600 mb-1">Name</label>
                 <input required value={new_name} onChange={e=>setNewName(e.target.value)} type="text" className="p-2 text-sm border rounded" placeholder="John Doe" />
              </div>
              <div className="flex flex-col">
                 <label className="text-xs font-medium text-gray-600 mb-1">Location</label>
                 <input required value={new_location} onChange={e=>setNewLocation(e.target.value)} type="text" className="p-2 text-sm border rounded" placeholder="e.g. Model Town" />
              </div>
              <div className="flex flex-col">
                 <label className="text-xs font-medium text-gray-600 mb-1">Blood Type</label>
                 <select value={new_blood_type} onChange={e=>setNewBloodType(e.target.value)} className="p-2 text-sm border rounded bg-white">
                    {admin_graphs.map(b => <option key={b.type} value={b.type}>{b.type}</option>)}
                 </select>
              </div>
              <div className="flex flex-col">
                 <label className="text-xs font-medium text-gray-600 mb-1">Status</label>
                 <select value={new_status} onChange={e=>setNewStatus(e.target.value)} className="p-2 text-sm border rounded bg-white">
                    <option value="Active">Active</option>
                    <option value="Responded">Responded</option>
                 </select>
              </div>
              <button type="submit" className="bg-[#D92D20] text-white p-2 rounded text-sm font-bold hover:bg-red-700">Save</button>
           </form>
        </div>
      )}

      <h3 className="text-lg font-bold text-gray-900 mb-4 mt-8">Recent Emergency Requests</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b-2 border-gray-900 font-bold">
              <th className="pb-3 pr-4">Name</th>
              <th className="pb-3 px-4">Location</th>
              <th className="pb-3 px-4 text-center">Blood Type</th>
              <th className="pb-3 px-4">Status</th>
              <th className="pb-3 pl-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered_users.length === 0 ? (
                <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500">No users found.</td>
                </tr>
            ) : (
                filtered_users.map((user, index) => (
                <tr key={user.id}>
                    <td className="py-4 pr-4 font-semibold text-gray-800">{user.name}</td>
                    <td className="py-4 px-4 text-gray-600">{user.location}</td>
                    <td className="py-4 px-4 text-center">
                    <span className={`inline-block px-4 py-1 text-xs font-bold rounded-full text-white`} style={{ backgroundColor: get_blood_type_color(user.blood_type) }}>
                        {user.blood_type}
                    </span>
                    </td>
                    <td className={`py-4 px-4 font-medium ${user.status === 'Active' ? 'text-[#D92D20]' : 'text-blue-400'}`}>
                    {user.status}
                    </td>
                    <td className="py-4 pl-4 text-right">
                    <div className="flex justify-end gap-3">
                        <button onClick={() => delete_dummy_user(user.id)} className="text-gray-500 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition" title="Delete User">
                            <Icon icon="mdi:minus-circle-outline" className="w-5 h-5" />
                        </button>
                    </div>
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
