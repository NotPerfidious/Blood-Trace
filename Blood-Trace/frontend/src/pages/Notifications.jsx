import { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { dummyNotifications } from '../utils/dummy_data';

function Notifications() {
    const [notifications, setNotifications] = useState(dummyNotifications);
    const [activeTab, setActiveTab] = useState('All');

    // Derived states
    const unreadCount = notifications.filter(n => n.unread).length;

    const filteredNotifications = useMemo(() => {
        if (activeTab === 'All') return notifications;
        if (activeTab === 'Unread') return notifications.filter(n => n.unread);
        return notifications.filter(n => n.type === activeTab);
    }, [notifications, activeTab]);

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    };

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    // Helper for rendering icons based on type
    const getIconInfo = (type) => {
        switch (type) {
            case 'Emergency':
                return { icon: "mdi:alert-circle-outline", color: "text-[#D92D20]" };
            case 'Requests':
                return { icon: "mdi:bell-outline", color: "text-orange-400" };
            case 'Info':
                return { icon: "mdi:alert-circle-outline", color: "text-blue-400" };
            default:
                return { icon: "mdi:bell-outline", color: "text-gray-400" };
        }
    };

    return (
        <div className="w-full flex-col font-sans pb-16 bg-white min-h-screen">
            <div className="w-full max-w-4xl mx-auto px-4 mt-24">

                {/* Header section */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <Icon icon="mdi:bell" className="w-8 h-8 text-[#D92D20]" />
                        <div>
                            <h1 className="text-3xl font-bold">Notifications</h1>
                            <p className="text-gray-500 text-sm">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
                        </div>
                    </div>
                    <button
                        onClick={markAllAsRead}
                        className="border border-gray-300 rounded-full px-6 py-2 text-sm font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Mark All As Read
                    </button>
                </div>

                {/* Tabs */}
                <div className="bg-[#f2f2f2] rounded-full p-1.5 flex justify-between items-center mb-10 overflow-x-auto">
                    {['All', 'Unread', 'Emergency', 'Requests', 'Info'].map((tab) => {
                        const isActive = activeTab === tab;
                        const label = tab === 'Unread' ? `Unread (${unreadCount})` : tab;
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

                {/* Notification List */}
                <div className="flex flex-col gap-6">
                    {filteredNotifications.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">No notifications found in this category.</div>
                    ) : (
                        filteredNotifications.map((notif) => {
                            const { icon, color } = getIconInfo(notif.type);
                            // Visual style for urgent/unread vs normal
                            const isUrgentOrUnread = notif.unread && (notif.type === 'Emergency' || notif.type === 'Requests');
                            const bgClass = isUrgentOrUnread ? 'bg-[#fff0f0] border-[#FFE0E0]' : 'bg-white border-gray-200';

                            return (
                                <div key={notif.id} className={`border rounded-xl p-6 relative ${bgClass}`}>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => deleteNotification(notif.id)}
                                        className="absolute top-4 right-4 text-gray-500 hover:text-[#D92D20] transition-colors"
                                    >
                                        <Icon icon="mdi:delete-outline" className="w-5 h-5" />
                                    </button>

                                    <div className="flex gap-4">
                                        {/* Icon */}
                                        <div className="mt-1">
                                            <Icon icon={icon} className={`w-6 h-6 ${color}`} />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 mb-1.5">{notif.title}</h3>
                                            <p className="text-gray-700 text-sm mb-4">{notif.description}</p>

                                            <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
                                                <Icon icon="mdi:clock-outline" className="w-4 h-4" />
                                                <span>{notif.time}</span>
                                            </div>

                                            {/* Action Buttons */}
                                            {(notif.requiresResponse || notif.unread) && (
                                                <div className="flex items-center gap-4 justify-between w-full md:justify-start md:gap-6 mt-2">
                                                    {notif.requiresResponse && (
                                                        <button className="bg-[#D92D20] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                                                            Respond
                                                        </button>
                                                    )}
                                                    {notif.unread && (
                                                        <button
                                                            onClick={() => markAsRead(notif.id)}
                                                            className="text-[#D92D20] font-semibold text-sm hover:underline ml-auto md:ml-0"
                                                        >
                                                            Mark As Read
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

            </div>
        </div>
    );
}

export default Notifications;
