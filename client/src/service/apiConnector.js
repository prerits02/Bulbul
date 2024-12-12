import axios from "axios";

export const apiConnector = async (method, url, bodyData, headers) => {
    try {
        console.log("API Request:", {
            method,
            url,
            data: bodyData,
            headers
        });

        const response = await axios({
            method: method,
            url: url,
            data: bodyData,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            withCredentials: true
        });

        return response;
    } catch (error) {
        console.log("API Connector Error: ", error);
        throw error;
    }
};