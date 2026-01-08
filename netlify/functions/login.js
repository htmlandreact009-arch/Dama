// netlify/functions/login.js
exports.handler = async function(event, context) {
  // Autoriser les requêtes CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Répondre aux requêtes OPTIONS pour CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight successful' }),
    };
  }

  // Vérifier que la méthode est POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse le corps de la requête
    const { phone, password } = JSON.parse(event.body);

    // Base de données des utilisateurs (simulée)
    const users = {
      '783041902': {
        phone: '783041902',
        password: '123456',
        name: 'Dama Client',
        balance: 50000,
        currency: 'FCFA'
      },
      '771234567': {
        phone: '771234567',
        password: '654321',
        name: 'Test User',
        balance: 15000,
        currency: 'FCFA'
      }
    };

    // Vérifier les identifiants
    if (users[phone] && users[phone].password === password) {
      // Connexion réussie
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          user: {
            phone: users[phone].phone,
            name: users[phone].name,
            balance: users[phone].balance,
            currency: users[phone].currency
          }
        }),
      };
    } else {
      // Échec de connexion
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Numéro ou mot de passe incorrect'
        }),
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Erreur serveur lors de la connexion'
      }),
    };
  }
};
