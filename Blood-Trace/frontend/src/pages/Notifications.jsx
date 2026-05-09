/**
 * Notifications Page
 * Displays a list of user notifications, allowing filtering by type (Emergency, Requests, Info)
 * and read status. Integrates with the backend for marking as read and deletion.
 */
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '@iconify/react';
import NotificationCard from '../components/NotificationCard';
import API from '../utils/API';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [activeTab, setActiveTab] = useState('All');
    
    const unread_n = notifications.filter(n => !n.isRead).length;

    const filtered_n = useMemo(() => {
        if (activeTab === 'All') 
            return notifications;
        if (activeTab === 'Unread') 
            return notifications.filter(n => !n.isRead);

        return notifications.filter(n => n.type === activeTab);
        
    }, [notifications, activeTab]);

    const markAllAsRead = () => {
        API.patch('/notification/read-all');
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const markAsRead = (id) => {
        API.patch('/notification/' + id + '/read');
        setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    };

    const delete_n = (id) => {
        API.delete('/notification/' + id);
        setNotifications(prev => prev.filter(n => n._id !== id));
    };

    useEffect(() => {
        const getNotifications = async () => {
            try {
                const response = await API.get('/notification/');
                setNotifications(response.data.notifications);
            } catch (error) {
                console.log(error);
            }
        }

        getNotifications();
    }, [])

    return (
        <div className="w-full flex-col font-sans pb-16 bg-white mt-[-70px] lg:mt-[-95px] pt-10 min-h-screen">
            <div className="w-full max-w-4xl mx-auto px-4 mt-24 relative">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <Icon icon="mdi:bell" className="w-8 h-8 text-[#D92D20]" />
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold">Notifications</h1>
                            <p className="text-gray-500 text-sm">{unread_n} unread notification{unread_n !== 1 ? 's' : ''}</p>
                        </div>
                    </div>
                    <button
                        onClick={markAllAsRead}
                        className="w-full md:w-auto border border-gray-300 rounded-full px-6 py-2 text-sm font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Mark All As Read
                    </button>
                </div>

                <div className="bg-[#f2f2f2] rounded-full p-1.5 flex justify-between items-center mb-10 overflow-x-auto">
                    {['All', 'Unread', 'Emergency', 'Requests', 'Info'].map((tab) => {
                        const isActive = activeTab === tab;
                        const counts = {
                            All: notifications.length,
                            Unread: notifications.filter(n => !n.isRead).length,
                            Emergency: notifications.filter(n => n.type === 'Emergency').length,
                            Requests: notifications.filter(n => n.type === 'Requests').length,
                            Info: notifications.filter(n => n.type === 'Info').length,
                        };
                        const count = counts[tab];
                        const label = count > 0 ? `${tab} (${count})` : tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors flex-1 whitespace-nowrap
                                    ${isActive ? 'bg-white shadow-sm text-black' : 'text-gray-600 hover:text-black'}
                                `}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>

                <div className="flex flex-col gap-6">
                    {filtered_n.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">No notifications found in this category.</div>
                    ) : (
                        filtered_n.map((notif) => (
                            <NotificationCard 
                                key={notif._id}
                                notif={notif}
                                delete_n={delete_n}
                                markAsRead={markAsRead}
                            />
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}

export default Notifications;
