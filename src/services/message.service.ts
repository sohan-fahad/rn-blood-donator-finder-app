import { apiUrl } from "../data/baseUrl";
import { checkToken } from "../utils/fetchInterceptor";
import { PostHttp } from "../utils/fetchInterceptor";

export const MessageApiService = {
    sendAppreciations: async (payload) => {
        const url = `${apiUrl}/appreciations`;
        const validToken = await checkToken();
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                Authorization: `Bearer ${validToken}`,
                "content-type": "application/json",
            },
        });
        let data = await response.json();
        return data;
    },
    getAppreciations: async () => {
        const url = `${apiUrl}/appreciations`;
        const validToken = await checkToken();
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${validToken}`,
                "content-type": "application/json",
            },
        });
        let data = await response.json();
        return data;
    }
}