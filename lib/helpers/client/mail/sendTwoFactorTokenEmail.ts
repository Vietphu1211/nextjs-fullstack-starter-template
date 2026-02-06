import { resend } from "@/lib/resend";
import { apiLogger } from "@/lib/utils/api-logger";

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
) => {
    if (!resend) {
        apiLogger.info("Resend API key không khả dụng, không thể gửi email 2FA");
        return;
    }

    // const twoFactorLink = `${OFFICIAL_DOMAIN}/auth/twofactor?code=${token}`
    await resend.emails.send({
        from: process.env.EMAIL_FROM || "onboarding@resend.dev",
        to: email,
        subject: "2FA Token",
        html: `<p>Mã xác thực ${token}</p>`
    })
}