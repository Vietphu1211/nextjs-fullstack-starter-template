import axios from "axios";

// Lấy base URL từ environment variables hoặc fallback
const getBaseURL = () => {
    if (process.env.NODE_ENV === "production") {
        // Trong production, sử dụng NEXTAUTH_URL hoặc NEXT_PUBLIC_APP_URL
        const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL;
        if (baseUrl) {
            return `${baseUrl}/api`;
        }
        // Fallback với domain chính thức  
        return "http://localhost:3000/api";
    }
    return "http://localhost:3000/api";
};

// API instance cho Next.js internal API routes
const api = axios.create({
    baseURL: getBaseURL(),
    headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Optionally log or toast error here
        return Promise.reject(error);
    }
);

// WordPress API instance cho backend calls từ API routes
const wordpressApi = axios.create({
    baseURL: "https://safecardanang.lembooking.com/wp-json/wp/v2/",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    timeout: 30000, // 30 seconds timeout
});

wordpressApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('WordPress API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
export { wordpressApi };

