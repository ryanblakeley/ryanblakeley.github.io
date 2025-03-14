import nodemailer from 'nodemailer';

export async function POST({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const message = formData.get('message');

  // Server-side validation
  const errors = {};
  if (!email) errors.email = 'Email is required';
  if (!message) errors.message = 'Message is required';
  if (email && !/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Invalid email format';

  if (Object.keys(errors).length > 0) {
    return new Response(JSON.stringify({ errors }), { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: 'catering@ryanblakeley.net',
      subject: 'Catering contact form',
      text: message,
      html: `<p>${message.replace(/\n/g, '<br>')}</p>`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
  }
}
