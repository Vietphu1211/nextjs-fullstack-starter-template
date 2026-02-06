import { OFFICIAL_DOMAIN } from "@/lib/constants/paths";
import { resend } from "@/lib/resend";

export const sendVerificationEmail = async (
    email: string,
    token: string,
) => {
    if (!resend) {
        console.error("Resend API key không khả dụng, không thể gửi email xác thực");
        return;
    }

    const confirmLink = `${OFFICIAL_DOMAIN}/auth/verify?token=${token}`;

    await resend.emails.send({
        from: process.env.EMAIL_FROM || "onboarding@resend.dev", // Sử dụng Resend domain cho email xác thực
        to: email,
        subject: "Confirm your email",
        html: `
            <p>Hello ${email},</p>
            <p>Please verify your email address by clicking the link below:</p>
            <a href="${confirmLink}">Verify Email</a>
            <p>The link expires in 24 hours.</p>
            <p>If you didn&apos;t register, please ignore this email.</p>
          `,
    });
};