/**
 * Admin Dashboard Page
 * Provides a high-level overview of system metrics, including total donors,
 * active requests, and blood type distribution through visual charts and data tables.
 */
import { useState, useEffect } from 'react';
import AdminUserTable from '../components/AdminTable';
import { Icon } from '@iconify/react';
import API from '../utils/API';

function AdminDashboard() {

  const [stats, setStats] = useState({ total_donors: 0, active_requests: 0, verified_donors: 0, success_rate: '0%' });
  const [distribution, setDistribution] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //running both API's in parallel
        const [statsRes, distRes] = await Promise.all([
          API.get('/admin/stats'),
          API.get('/admin/blood-distribution'),
        ]);
        setStats(statsRes.data.stats);
        setDistribution(distRes.data.distribution);
      } catch (error) {
        console.log('[ERROR] Admin data fetch failed:', error);
      }
    };
    fetchData();
  }, []);

  const count_yAxis = distribution.length > 0 ? Math.max(...distribution.map(b => b.count)) : 1;
  const graph_percentage = stats.total_donors > 0
    ? Math.round((stats.verified_donors / stats.total_donors) * 100)
    : 0;

  return (
    <div className="pb-10 px-4 md:px-12 lg:px-20 w-full bg-[#fdfdfd] min-h-screen mt-16 lg:mt-10">

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Monitor blood donor system and emergency requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4 mt-[-20px]">

        <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <Icon icon="mdi:account-outline" className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-sm font-medium text-gray-500 mb-1">Total Donors</div>
          <div className="text-2xl font-black text-gray-900">{stats.total_donors}</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <Icon icon="mdi:email-outline" className="w-6 h-6 text-orange-400" />
          </div>
          <div className="text-sm font-medium text-gray-500 mb-1">Active Requests</div>
          <div className="text-2xl font-black text-gray-900">{stats.active_requests}</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <Icon icon="mdi:check-decagram-outline" className="w-6 h-6 text-purple-500" />
          </div>
          <div className="text-sm font-medium text-gray-500 mb-1">Available Donors</div>
          <div className="text-2xl font-black text-gray-900">{stats.verified_donors}</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <Icon icon="mdi:bullseye-arrow" className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-sm font-medium text-gray-500 mb-1">Availability Rate</div>
          <div className="text-2xl font-black text-gray-900">{stats.success_rate}</div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">

        {/* bar graph */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-xs border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Blood Type Distribution</h2>
          {distribution.length === 0 ? (
            <div className="text-gray-400 text-sm text-center py-16">No donor data available</div>
          ) : (
            <div className="h-48 flex items-end justify-around gap-2 relative">
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] text-gray-400 border-r border-dashed border-gray-200 pr-2">
                <span>{count_yAxis}</span>
                <span>{Math.round(count_yAxis * 0.75)}</span>
                <span>{Math.round(count_yAxis * 0.5)}</span>
                <span>{Math.round(count_yAxis * 0.25)}</span>
              </div>
              <div className="flex-1 flex items-end justify-around h-full ml-6 pb-8 border-b border-dashed border-gray-200 relative">
                {distribution.map((item, index) => (
                  <div key={index} className="h-full flex flex-col justify-end items-center group w-full px-1 relative">
                    <div
                      className="w-full max-w-[40px] rounded-t-md transition-all duration-500"
                      style={{ height: `${(item.count / count_yAxis) * 100}%`, backgroundColor: item.color }}
                    />
                    <div className="text-[10px] sm:text-xs font-medium text-gray-500 absolute -bottom-6">
                      {item.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* pie chart */}
        <div className="bg-white p-6 rounded-xl shadow-xs border border-gray-100 flex flex-col justify-between">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Availability Status</h2>

          <div className="flex justify-center items-center flex-1">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center relative"
              style={{ background: `conic-gradient(#10B981 0% ${graph_percentage}%, #F59E0B ${graph_percentage}% 100%)` }}
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-gray-700">{graph_percentage}%</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                <span className="text-gray-700 font-medium">Available</span>
              </div>
              <span className="font-bold">{stats.verified_donors}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                <span className="text-gray-700 font-medium">Unavailable</span>
              </div>
              <span className="font-bold">{stats.total_donors - stats.verified_donors}</span>
            </div>
          </div>
        </div>

      </div>

      <AdminUserTable />

    </div>
  );
}

export default AdminDashboard;
