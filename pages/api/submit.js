// pages/api/submit.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('Données SAFAIC reçues:', req.body);

    // Appel vers Google Apps Script
    const response = await fetch('https://script.google.com/macros/s/AKfycbxtitN4tT3x1GbLLVGzpjVqygrQqTpEIPuIIvpLBha12SfmMLZbfqeqyv4nRxAC-gEv-A/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    console.log('Réponse Google Script SAFAIC:', data);

    res.status(200).json({ 
      success: true, 
      message: 'Adhésion envoyée avec succès',
      data: data 
    });

  } catch (error) {
    console.error('Erreur SAFAIC:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de l\'envoi de l\'adhésion',
      error: error.message 
    });
  }
}