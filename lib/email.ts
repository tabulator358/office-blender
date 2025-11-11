import { Order } from './types';
import { Resend } from 'resend';

// Initialize Resend client
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  
  try {
    return new Resend(apiKey);
  } catch (error) {
    console.error('Error initializing Resend:', error);
    return null;
  }
}

// Email template for order notification
function createOrderEmailHTML(order: Order, recipientEmail: string): string {
  const orderDate = new Date(order.createdAt).toLocaleString('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }
    .content {
      background: #f9f9f9;
      padding: 30px;
      border: 1px solid #ddd;
      border-top: none;
    }
    .order-details {
      background: white;
      padding: 20px;
      border-radius: 5px;
      margin: 20px 0;
      border-left: 4px solid #667eea;
    }
    .detail-row {
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .label {
      font-weight: bold;
      color: #667eea;
      display: inline-block;
      width: 150px;
    }
    .value {
      color: #333;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #666;
      font-size: 12px;
    }
    .status-badge {
      display: inline-block;
      padding: 5px 15px;
      border-radius: 20px;
      background: #ffc107;
      color: #333;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🥤 Nová objednávka - Office Blender</h1>
  </div>
  <div class="content">
    <p>Dobrý den,</p>
    <p>Přijata nová objednávka na drink:</p>
    
    <div class="order-details">
      <div class="detail-row">
        <span class="label">Drink:</span>
        <span class="value">${order.drink}</span>
      </div>
      <div class="detail-row">
        <span class="label">Jméno:</span>
        <span class="value">${order.name}</span>
      </div>
      <div class="detail-row">
        <span class="label">Čas doručení:</span>
        <span class="value">${order.time}</span>
      </div>
      <div class="detail-row">
        <span class="label">Status:</span>
        <span class="status-badge">${order.status === 'pending' ? 'Čeká' : order.status}</span>
      </div>
      <div class="detail-row">
        <span class="label">Čas objednávky:</span>
        <span class="value">${orderDate}</span>
      </div>
      <div class="detail-row">
        <span class="label">ID objednávky:</span>
        <span class="value" style="font-family: monospace; font-size: 12px;">${order.id}</span>
      </div>
    </div>
    
    <p>Prosím připravte drink do ${order.time}.</p>
  </div>
  <div class="footer">
    <p>Office Blender - Systém pro objednávání drinků</p>
    <p>Automatická notifikace, neodpovídejte na tento email</p>
  </div>
</body>
</html>
  `;
}

// Send order notification email
export async function sendOrderEmail(order: Order, recipientEmail: string): Promise<boolean> {
  try {
    const resend = getResendClient();
    
    if (!resend) {
      console.warn('Resend API key not configured, skipping email send');
      console.log('📧 Order email (simulated):', {
        to: recipientEmail,
        subject: `Nová objednávka: ${order.drink} pro ${order.name}`,
        order: order,
      });
      return false;
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const subject = `🥤 Nová objednávka: ${order.drink} pro ${order.name} - ${order.time}`;

    const result = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      subject: subject,
      html: createOrderEmailHTML(order, recipientEmail),
    });

    if (result.error) {
      console.error('Error sending email:', result.error);
      return false;
    }

    console.log('✓ Email sent successfully:', result.data?.id);
    return true;
  } catch (error) {
    console.error('Error sending order email:', error);
    return false;
  }
}

// Send order email to multiple recipients
export async function sendOrderEmailToMultiple(
  order: Order,
  recipientEmails: string[]
): Promise<boolean> {
  const results = await Promise.all(
    recipientEmails.map(email => sendOrderEmail(order, email))
  );
  return results.some(result => result === true);
}


