import { Resend as ResendClient } from 'resend';
import "dotenv/config"
let resendClientInstance: ResendClient | null = null;

export const resend = () => {
    if (!resendClientInstance) {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            throw new Error('RESEND_API_KEY is not defined in environment variables');
        }
        resendClientInstance = new ResendClient(apiKey);
    }
    return resendClientInstance;
}