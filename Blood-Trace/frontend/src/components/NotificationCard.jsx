import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import API from '../utils/API';

function NotificationCard({ notif, delete_n, markAsRead }) {
    const [responding, isResponding] = useState(false);
    const [success, isSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [hasResponded, setHasResponded] = useState(false);
    const [locationName, setLocationName] = useState('');

    useEffect(() => {
        if (!notif.location || notif.location.length !== 2) return;
        if (notif.type !== 'Emergency' && notif.type !== 'Requests') return;

        const [lng, lat] = notif.location;
        //open api
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
            .then(res => res.json())
            .then(data => {
                const addr = data.address;
                const name = addr.suburb || addr.neighbourhood || addr.city_district || addr.city || addr.town || addr.county || '';
                setLocationName(name);
            })
            .catch(() => { });
    }, [notif.location, notif.type]);

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

    const { icon, color } = getIconInfo(notif.type);
    const imp_n = !notif.isRead && (notif.type === 'Emergency' || notif.type === 'Requests');
    const set_bg = imp_n ? 'bg-[#fff0f0] border-[#FFE0E0]' : 'bg-white border-gray-200';

    const handle_sent = () => {
        API.post('/notification/' + notif._id + '/respond', { message: message });
        isResponding(false);
        isSuccess(true);
        setHasResponded(true);
        if (!notif.isRead) {
            markAsRead(notif._id);
        }
    };

    return (
        <>
            <div className={`border rounded-xl p-6 relative ${set_bg}`}>

                <button
                    onClick={() => delete_n(notif._id)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-[#D92D20] transition-colors"
                    title="Delete Notification"
                >
                    <Icon icon="mdi:delete-outline" className="w-5 h-5" />
                </button>

                <div className="flex gap-4">
                    <div className="mt-1">
                        <Icon icon={icon} className={`w-6 h-6 ${color}`} />
                    </div>

                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{notif.title}</h3>
                        {notif.sender?.email && (
                            <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-1">
                                <Icon icon="mdi:account-outline" className="w-3.5 h-3.5" />
                                <span>From: <span className="font-semibold text-gray-700">{notif.sender.email}</span></span>
                            </div>
                        )}
                        {locationName && (
                            <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-1">
                                <Icon icon="mdi:map-marker-outline" className="w-3.5 h-3.5" />
                                <span>Near: <span className="font-semibold text-gray-700">{locationName}</span></span>
                            </div>
                        )}
                        <p className="text-gray-700 text-sm mb-4">{notif.description}</p>

                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
                            <Icon icon="mdi:clock-outline" className="w-4 h-4" />
                            <span>{notif.createdAt ? new Date(notif.createdAt).toLocaleString('en-PK', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Just now'}</span>
                        </div>

                        {((notif.response && !hasResponded) || !notif.isRead) && (
                            <div className="flex items-center gap-4 justify-between w-full md:justify-start md:gap-6 mt-2">
                                {notif.response && !hasResponded && (
                                    <button
                                        onClick={() => { setMessage(""); isResponding(true); }}
                                        className="bg-[#D92D20] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                                    >
                                        Respond
                                    </button>
                                )}
                                {!notif.isRead && (
                                    <button
                                        onClick={() => markAsRead(notif._id)}
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

            {/* After Clicking Respond Button */}
            {responding && (
                <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                        {/* cross button */}
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                            onClick={() => isResponding(false)}
                        >
                            <Icon icon="mdi:close" className="w-5 h-5" />
                        </button>

                        <h2 className="text-xl font-bold text-gray-900 mb-2">Respond to Request</h2>
                        <p className="text-sm text-gray-600 mb-4">{notif.title}</p>

                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write your message here..."
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#D92D20] mb-4 h-24 resize-none"
                        ></textarea>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => isResponding(false)}
                                className="px-5 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handle_sent}
                                disabled={message.trim().length === 0}
                                className="px-5 py-2 rounded-lg text-sm font-medium bg-[#D92D20] text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Confirm & Send
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* After Clicking Confirm & Send Button */}
            {success && (
                <div
                    className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black/40 px-4"
                    onClick={() => isSuccess(false)} // clicking anywhere on screen vanishes it
                >
                    {/* success message */}
                    <div
                        className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 text-center text-green-700 cursor-pointer"
                    >
                        <Icon icon="mdi:check-circle" className="w-16 h-16 text-green-500 mx-auto mb-3" />
                        <h2 className="text-xl font-bold mb-1">Message Sent!</h2>
                        <p className="text-sm text-gray-600">Your response has been delivered.</p>
                        <p className="text-xs text-gray-400 mt-4">(click anywhere to close)</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default NotificationCard;
