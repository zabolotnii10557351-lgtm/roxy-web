import { Resend } from "resend";
import { getSiteUrl } from "@/lib/site/url";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  return value;
}

function getResendClient(): Resend {
  return new Resend(requiredEnv("RESEND_API_KEY"));
}

function getFromAddress(): string {
  return requiredEnv("RESEND_FROM_EMAIL");
}

type OrderEmailParams = {
  to: string;
  planId: string;
  interval: string;
};

export async function sendOrderConfirmationEmail(params: OrderEmailParams) {
  const resend = getResendClient();
  const baseUrl = getSiteUrl();
  const termsUrl = `${baseUrl}/terms`;
  const privacyUrl = `${baseUrl}/privacy`;

  const subject = "RoxStreamAI - potwierdzenie umowy / order confirmation";
  const text = `Dzień dobry,

potwierdzamy zawarcie umowy na odległość dla planu ${params.planId} (${params.interval}).
Regulamin i wzór formularza odstąpienia od umowy znajdziesz tutaj: ${termsUrl}
Polityka prywatności: ${privacyUrl}

Z uwagi na wyrażone żądanie wykonania usługi przed upływem 14 dni od zawarcia umowy,
Konsumentowi nie przysługuje prawo odstąpienia od umowy.

Hello,

This email confirms your distance contract for plan ${params.planId} (${params.interval}).
The Terms and the withdrawal form are available here: ${termsUrl}
Privacy policy: ${privacyUrl}

Due to your request to provide the service before 14 days from the contract date,
the Consumer does not have the right to withdraw from the contract.
`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0b0f1a;">
      <p>Dzień dobry,</p>
      <p>Potwierdzamy zawarcie umowy na odległość dla planu <strong>${params.planId}</strong> (${params.interval}).</p>
      <p>
        Regulamin i wzór formularza odstąpienia od umowy: <a href="${termsUrl}">${termsUrl}</a><br/>
        Polityka prywatności: <a href="${privacyUrl}">${privacyUrl}</a>
      </p>
      <p>
        Z uwagi na wyrażone żądanie wykonania usługi przed upływem 14 dni od zawarcia umowy,
        Konsumentowi nie przysługuje prawo odstąpienia od umowy.
      </p>
      <hr />
      <p>Hello,</p>
      <p>This email confirms your distance contract for plan <strong>${params.planId}</strong> (${params.interval}).</p>
      <p>
        Terms and withdrawal form: <a href="${termsUrl}">${termsUrl}</a><br/>
        Privacy policy: <a href="${privacyUrl}">${privacyUrl}</a>
      </p>
      <p>
        Due to your request to provide the service before 14 days from the contract date,
        the Consumer does not have the right to withdraw from the contract.
      </p>
    </div>
  `;

  return resend.emails.send({
    from: getFromAddress(),
    to: params.to,
    subject,
    text,
    html,
  });
}
