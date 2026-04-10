// AppContext.jsx
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const buildUrl = (base, path) => `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const [credit, setCredit] = useState(0);
    const backurl = import.meta.env.VITE_BACKEND_URI;

    const loadCreditsData = async () => {
        try {
            const url = buildUrl(backurl, '/api/user/credits');
            const { data } = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) {
                setCredit(data.credit || data.credits || 0);
                setUser(data.user);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const genImg = async (prompt, navigate) => {
        if (credit === 0) {
            navigate('/buy');
            return;
        }
        try {
            const url = buildUrl(backurl, '/api/image/generate-image');
            const { data } = await axios.post(
                url,
                { prompt },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (data.success) {
                loadCreditsData();
                return data.image;
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const initPayment = async (planId) => {
        try {
            const { data } = await axios.post(
                buildUrl(backurl, '/api/user/pay-razor'),
                { planId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!data.success) {
                return toast.error(data.message);
            }

            const { order, plan } = data;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'PromptixAI',
                description: `${plan.credits} Credits — ${plan.id} Plan`,
                order_id: order.id,
                handler: async (response) => {
                    try {
                        const { data: verifyData } = await axios.post(
                            buildUrl(backurl, '/api/user/verify-razor'),
                            { ...response, planId },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        if (verifyData.success) {
                            toast.success(verifyData.message);
                            setCredit(verifyData.creditBalance);
                        } else {
                            toast.error(verifyData.message);
                        }
                    } catch (err) {
                        toast.error(err.message);
                    }
                },
                prefill: { name: user?.name || '' },
                theme: { color: '#6366f1' },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken("");
        setUser(null);
        setCredit(0);
    };

    useEffect(() => {
        if (token) {
            loadCreditsData();
        }
    }, [token]);

    const value = {
        user, setUser,
        showLogin, setShowLogin,
        backurl,
        token, setToken,
        credit, setCredit,
        loadCreditsData,
        logout,
        genImg,
        initPayment,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
