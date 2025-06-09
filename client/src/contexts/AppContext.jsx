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

    // Accept navigate as an argument
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
        genImg
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
