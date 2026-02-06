import { OFFICIAL_DOMAIN } from "@/lib/constants/paths";
import { resend } from "@/lib/resend";
import { apiLogger } from "@/lib/utils/api-logger";

export const sendPasswordResetTokenByEmail = async (email: string, token: string) => {
    if (!resend) {
        apiLogger.info("Resend API key không khả dụng, không thể gửi email reset password");
        return;
    }

    const resetLink = `${OFFICIAL_DOMAIN}/auth/reset-password?email=${email}&token=${token}`
    await resend.emails.send({
        from: process.env.EMAIL_FROM || "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
    })
}