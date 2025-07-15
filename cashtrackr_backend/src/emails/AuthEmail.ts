import { transport } from "../config/nodemailer";

type EmailType = {
  name: string;
  email: string;
  token: string;
};

export class AuthEmail {
  static sendConfirmationEmail = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: "CashTrackr <admin@cashtracker.com>",
      to: user.email,
      subject: "CashTrackr - Confirm Your Account",
      html: `
                    <body style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">
                    <h1>¡Hola, ${user.name}!</h1>
                    <p>Gracias por registrarte en <strong>CashTrackr</strong>.</p>
                    <p>A continuación tienes tu token de confirmación:</p>
                    <p style="background:#f4f4f4;padding:10px;border-radius:4px;font-size:1.2em;text-align:center;">
                        <strong>Token:</strong> ${user.token}
                    </p>
                    <p>Visita el siguiente enlace:</p>
                    <p style="text-align:center;">
                        <a href="${process.env.FRONTEND_URL}/auth/confirm-account" style="background-color:#28a745;color:white;padding:10px 20px;text-decoration:none;border-radius:4px;">
                            Confirmar Cuenta
                        </a>
                    </p>
                    <br>
                    <p>Saludos,<br>El equipo de CashTrackr</p>
                    </body>
                `,
    });
  };

  static sendPasswordResetToken = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: "CashTrackr <admin@cashtracker.com>",
      to: user.email,
      subject: "CashTrackr - Restablecer Contraseña",
      html: `
                    <body style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">
                    <h1>¡Hola, ${user.name}!</h1>
                    <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
                    <p>A continuación tienes tu token de restablecimiento:</p>
                    <p style="background:#f4f4f4;padding:10px;border-radius:4px;font-size:1.2em;text-align:center;">
                        <strong>Token:</strong> ${user.token}
                    </p>
                    <p>Visita el siguiente enlace para restablecer tu contraseña:</p>
                    <p style="text-align:center;">
                        <a href="${process.env.FRONTEND_URL}/auth/new-password" style="background-color:#007bff;color:white;padding:10px 20px;text-decoration:none;border-radius:4px;">
                            Restablecer Contraseña
                        </a>
                    </p>
                    <br>
                    <p>Si no solicitaste este cambio, ignora este mensaje.</p>
                    <p>Saludos,<br>El equipo de CashTrackr</p>
                    </body>
                `,
    });
  };
}
