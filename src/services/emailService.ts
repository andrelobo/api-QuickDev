import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.SENDGRID_API_KEY ?? '';

sgMail.setApiKey(apiKey);

/**
 * Sends an email notification to the specified user regarding a new comment on their post.
 *
 * @param userEmail The email address of the user who posted the post.
 * @param postTitle The title of the post.
 * @param comment The comment that was added to the post.
 * @throws {Error} If userEmail, postTitle, or comment are not provided.
 */
const sendEmailNotification = async (userEmail: string, postTitle: string, comment: string): Promise<void> => {
  if (!userEmail || !postTitle || !comment) {
    throw new Error('userEmail, postTitle, and comment are required parameters');
  }

  try {
    const msg: sgMail.MailDataRequired = {
      to: userEmail,
      from: 'xonga73@gmail.com', // Meu email de teste :)
      subject: 'Novo Comentário no Seu Post',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                background-color: #f8f8f8;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
                background-color: #fff;
              }
              h1 {
                color: #333;
              }
              p {
                color: #666;
              }
              .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Novo Comentário no Seu Post</h1>
              <p>Olá,</p>
              <p>Um novo comentário foi adicionado ao seu post: "${postTitle}".</p>
              <p>Comentário: "${comment}"</p>
              <p>Atenciosamente,<br>Equipe do Blog</p>
            </div>
          </body>
        </html>
      `
    };

    await sgMail.send(msg);
    console.log('Email de notificação enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar o e-mail de notificação:', error);
    throw error;
  }
};

export { sendEmailNotification };

