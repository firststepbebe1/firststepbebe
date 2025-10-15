
// Netlify Function: send-order via Brevo SMTP (Nodemailer)
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }
    const {
      BREVO_SMTP_HOST = 'smtp-relay.brevo.com',
      BREVO_SMTP_PORT = '587',
      BREVO_SMTP_USER,
      BREVO_SMTP_PASS,
      ORDER_EMAIL_TO,
      ORDER_EMAIL_FROM = 'First Step Bebe <firststepbebe1@gmail.com>'
    } = process.env;

    const payload = JSON.parse(event.body || '{}');
    const to = payload.to || ORDER_EMAIL_TO || 'firststepbebe1@gmail.com';
    const from = payload.from || ORDER_EMAIL_FROM;
    const subject = payload.subject || 'Comandă nouă – First Step Bebe';
    const html = payload.html || '<p>(Fără conținut)</p>';

    if (!BREVO_SMTP_USER || !BREVO_SMTP_PASS) {
      return { statusCode: 500, body: 'Missing SMTP credentials. Set BREVO_SMTP_USER and BREVO_SMTP_PASS in Netlify environment.' };
    }

    const port = Number(BREVO_SMTP_PORT);
    const secure = port === 465;
    const transporter = nodemailer.createTransport({
      host: BREVO_SMTP_HOST,
      port,
      secure,
      auth: { user: BREVO_SMTP_USER, pass: BREVO_SMTP_PASS }
    });

    const info = await transporter.sendMail({ from, to, subject, html });
    return { statusCode: 200, body: JSON.stringify({ ok: true, messageId: info.messageId }) };
  } catch (err) {
    return { statusCode: 500, body: String(err) };
  }
};
