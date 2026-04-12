import { a_stats, admin_graphs } from '../utils/dummy_data';
import AdminUserTable from '../components/AdminTable';
import { Icon } from '@iconify/react';

function AdminDashboard() {
  const count_yAxis = Math.max(...admin_graphs.map(b => b.count));

  const graph_percentage = Math.round((a_stats.verified_donors/a_stats.total_donors)*100);

  return (
    <div className="pt-5 pb-10 px-8 max-w-7xl mx-auto bg-[#fdfdfd] min-h-screen">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Monitor blood donor system and emergency requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4 mt-[-20px]">
        
        <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <Icon icon="mdi:account-outline" className="w-6 h-6 text-blue-500" />
            <div className="flex items-center text-green-500 text-xs font-bold gap-1 bg-green-50 px-2 py-0.5 rounded">
              <Icon icon="mdi:trending-up" /> 12%
            </div>
          </div>
          <div className="text-sm font-medium text-gray-500 mb-1">Total Donors</div>
          <div className="text-2xl font-black text-gray-900">{a_stats.total_donors}</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <Icon icon="mdi:email-outline" className="w-6 h-6 text-orange-400" />
            <div className="flex items-center text-green-500 text-xs font-bold gap-1 bg-green-50 px-2 py-0.5 rounded">
              <Icon icon="mdi:trending-up" /> 8%
            </div>
          </div>
          <div className="text-sm font-medium text-gray-500 mb-1">Active Requests</div>
          <div className="text-2xl font-black text-gray-900">{a_stats.active_requests}</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <Icon icon="mdi:check-decagram-outline" className="w-6 h-6 text-purple-500" />
            <div className="flex items-center text-green-500 text-xs font-bold gap-1 bg-green-50 px-2 py-0.5 rounded">
              <Icon icon="mdi:trending-up" /> 26%
            </div>
          </div>
          <div className="text-sm font-medium text-gray-500 mb-1">Verified Donors</div>
          <div className="text-2xl font-black text-gray-900">{a_stats.verified_donors}</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <Icon icon="mdi:bullseye-arrow" className="w-6 h-6 text-blue-400" />
            <div className="flex items-center text-green-500 text-xs font-bold gap-1 bg-green-50 px-2 py-0.5 rounded">
              <Icon icon="mdi:trending-up" /> 16%
            </div>
          </div>
          <div className="text-sm font-medium text-gray-500 mb-1">Success Rate</div>
          <div className="text-2xl font-black text-gray-900">{a_stats.success_rate}</div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-xs border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Blood Type Distribution</h2>
          <div className="h-48 flex items-end justify-around gap-2 relative">
            
            {/* Y-axis */}
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] text-gray-400 border-r border-dashed border-gray-200 pr-2">
              <span>60</span>
              <span>45</span>
              <span>30</span>
              <span>15</span>
            </div>

            {/* Bars */}
            <div className="flex-1 flex items-end justify-around h-full ml-6 pb-8 border-b border-dashed border-gray-200 relative">
              {admin_graphs.map((item, index) => (
                <div key={index} className="h-full flex flex-col justify-end items-center group w-full px-1 relative">
                  <div 
                     className={`w-full max-w-[40px] rounded-t-md transition-all duration-500`}
                     style={{ height: `${(item.count / count_yAxis) * 100}%`, backgroundColor: item.color }}
                  ></div>
                  <div className="text-[10px] sm:text-xs font-medium text-gray-500 absolute -bottom-6">
                    {item.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-xs border border-gray-100 flex flex-col justify-between">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Verification Status</h2>
          
          <div className="flex justify-center items-center flex-1">
             <div 
               className="w-32 h-32 rounded-full flex items-center justify-center relative"
               style={{ background: `conic-gradient(#10B981 0% ${graph_percentage}%, #F59E0B ${graph_percentage}% 100%)` }}
             >
                <div className="w-24 h-24 bg-white rounded-full"></div>
             </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                    <span className="text-gray-700 font-medium">Verified</span>
                </div>
                <span className="font-bold">{a_stats.verified_donors}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                    <span className="text-gray-700 font-medium">Pending</span>
                </div>
                <span className="font-bold">{a_stats.total_donors - a_stats.verified_donors}</span>
            </div>
          </div>
        </div>

      </div>

      <AdminUserTable />

    </div>
  );
}

export default AdminDashboard;
