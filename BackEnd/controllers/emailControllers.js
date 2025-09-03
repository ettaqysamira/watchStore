import nodemailer from "nodemailer";

export const sendOrderEmail = async (req, res) => {
  const {
    firstName = "Client",
    lastName = "",
    email,
    address = "Non précisée",
    city = "Non précisée",
    deliveryOption = "Non précisée",
    products = [],
  } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email du client manquant !" });
  }

  const productList = products.length
    ? products.map(p => `${p.name} x${p.quantity}`).join(", ")
    : "Aucun produit";

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const clientMailOptions = {
      from: `"Bijoux By Dox" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirmation de votre commande",
      html: `
        <h2>Bonjour ${firstName} ${lastName},</h2>
        <p>Merci pour votre commande ! Voici les détails :</p>
        <ul>
          <li><strong>Adresse :</strong> ${address}, ${city}</li>
          <li><strong>Livraison :</strong> ${deliveryOption}</li>
          <li><strong>Produits :</strong> ${productList}</li>
        </ul>
        <p>Nous vous contacterons très bientôt.</p>
      `,
    };

    const chefMailOptions = {
      from: `"Bijoux By Dox" <${process.env.EMAIL_USER}>`,
      to: process.env.CHEF_EMAIL || process.env.EMAIL_USER, 
      subject: "Nouvelle commande reçue",
      html: `
        <h2>Nouvelle commande de ${firstName} ${lastName}</h2>
        <p>Détails de la commande :</p>
        <ul>
          <li><strong>Email client :</strong> ${email}</li>
          <li><strong>Adresse :</strong> ${address}, ${city}</li>
          <li><strong>Livraison :</strong> ${deliveryOption}</li>
          <li><strong>Produits :</strong> ${productList}</li>
        </ul>
      `,
    };

    await transporter.sendMail(clientMailOptions);
    await transporter.sendMail(chefMailOptions);

    res.status(200).json({ success: true, message: "Emails envoyés au client et au chef !" });
  } catch (error) {
    console.error("Erreur envoi email:", error);
    res.status(500).json({ success: false, message: "Erreur envoi email", error: error.message });
  }
};
