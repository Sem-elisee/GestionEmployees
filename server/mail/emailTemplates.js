const Verification_Email_Template = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 600px;
        margin: 30px auto;
        background: #ffffff;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        border: 1px solid #ddd;
      }
      .header {
        background-color: #2ba47a;
        color: white;
        padding: 20px;
        text-align: center;
        font-size: 26px;
        font-weight: bold;
      }
      .content {
        padding: 25px;
        color: #333;
        line-height: 1.8;
      }
      .verification-code {
        display: block;
        margin: 20px 0;
        font-size: 22px;
        color: #4caf50;
        background: #e8f5e9;
        border: 1px dashed #4caf50;
        padding: 10px;
        text-align: center;
        border-radius: 5px;
        font-weight: bold;
        letter-spacing: 2px;
      }
      .footer {
        background-color: #f4f4f4;
        padding: 15px;
        text-align: center;
        color: #777;
        font-size: 12px;
        border-top: 1px solid #ddd;
      }
      p {
        margin: 0 0 15px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Vérification de votre e-mail</div>
      <div class="content">
        <p>Coucou, 👋</p>
        <p>
          Merci de votre inscription ! Veuillez confirmer votre adresse e-mail
          en entrant le code ci-dessous :
        </p>
        <span class="verification-code">{verificationCode}</span>
        <p>
          Si vous n'avez pas créé de compte, aucune autre action n'est requise.
          Si vous avez des questions, n'hésitez pas à contacter notre équipe
          d'assistance.
        </p>
      </div>
      <div class="footer">
        <p>
          &copy; ${new Date().getFullYear()} Guibe Test. All rights reserved.
        </p>
      </div>
    </div>
  </body>
</html>
`;

const Welcome_Email_Template = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Our Community</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 30px auto;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        border: 1px solid #ddd;
      }
      .header {
        background-color: #007bff;
        color: white;
        padding: 20px;
        text-align: center;
        font-size: 26px;
        font-weight: bold;
      }
      .content {
        padding: 25px;
        line-height: 1.8;
      }
      .welcome-message {
        font-size: 18px;
        margin: 20px 0;
      }
      .button {
        display: inline-block;
        padding: 12px 25px;
        margin: 20px 0;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        transition: background-color 0.3s;
      }
      .button:hover {
        background-color: #0056b3;
      }
      .footer {
        background-color: #f4f4f4;
        padding: 15px;
        text-align: center;
        color: #777;
        font-size: 12px;
        border-top: 1px solid #ddd;
      }
      p {
        margin: 0 0 15px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Bienvenue dans notre communauté !</div>
      <div class="content">
        <p class="welcome-message">Coucou, 👋 {email},</p>
        <p>
          Nous sommes ravis de vous compter parmi nous ! Votre inscription a
          réussi, et nous nous engageons à vous offrir la meilleure expérience
          possible.
        </p>
        <p>Voici comment commencer :</p>
        <ul>
          <li>
            Explorez nos fonctionnalités et personnalisez votre expérience.
          </li>
          <li>
            Restez informé en consultant notre blog pour les dernières mises à
            jour et conseils.
          </li>
          <li>
            Contactez notre équipe d'assistance si vous avez des questions ou
            des besoins assistance.
          </li>
        </ul>
        <a href="#" class="button">Commencer</a>
        <p>
          Si vous avez besoin d’aide, n’hésitez pas à nous contacter. Nous
          sommes ici pour vous accompagne à chaque étape.
        </p>
      </div>
      <div class="footer">
        <p>
          &copy; ${new Date().getFullYear()} Guibe Test. All rights reserved.
        </p>
      </div>
    </div>
  </body>
</html>

`;

module.exports = {
  Verification_Email_Template,
  Welcome_Email_Template,
};
