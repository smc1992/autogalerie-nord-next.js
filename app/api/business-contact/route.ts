import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { emailConfig } from '../../../lib/email-config';

// HTML Template für Business-Kontaktformular
function createBusinessContactEmailTemplate(data: any) {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Neue B2B-Anfrage - Autogalerie Nord</title>
    <style>
        body { font-family: 'Klavika', system-ui, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #dc2626; }
        .value { margin-top: 5px; }
        .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
        .business-badge { background: #059669; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏢 Neue B2B-Anfrage</h1>
            <p>Autogalerie Nord GmbH</p>
            <span class="business-badge">BUSINESS ANFRAGE</span>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">Unternehmen:</div>
                <div class="value">${data.company}</div>
            </div>
            
            <div class="field">
                <div class="label">Ansprechpartner:</div>
                <div class="value">${data.contact}</div>
            </div>
            
            <div class="field">
                <div class="label">E-Mail:</div>
                <div class="value">${data.email}</div>
            </div>
            
            <div class="field">
                <div class="label">Telefon:</div>
                <div class="value">${data.phone || 'Nicht angegeben'}</div>
            </div>
            
            <div class="field">
                <div class="label">Gewünschter Service:</div>
                <div class="value">${data.service || 'Nicht spezifiziert'}</div>
            </div>
            
            ${data.message ? `
            <div class="field">
                <div class="label">Nachricht:</div>
                <div class="value">${data.message}</div>
            </div>
            ` : ''}
            
            <div class="field">
                <div class="label">Datenschutz zugestimmt:</div>
                <div class="value">${data.privacy ? 'Ja' : 'Nein'}</div>
            </div>
            
            <div class="field">
                <div class="label">Eingegangen am:</div>
                <div class="value">${new Date().toLocaleString('de-DE')}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>Diese E-Mail wurde automatisch über das B2B-Kontaktformular der Website gesendet.</p>
            <p>Autogalerie Nord GmbH | Lüneburger Str. 30 | 21435 Stelle</p>
        </div>
    </div>
</body>
</html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const data = {
      company: formData.get('company') as string,
      contact: formData.get('contact') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
      privacy: formData.get('privacy') === 'true'
    };

    // Validierung
    if (!data.company || !data.contact || !data.email || !data.privacy) {
      return NextResponse.json({ error: 'Alle Pflichtfelder müssen ausgefüllt werden.' }, { status: 400 });
    }

    // E-Mail-Transporter erstellen
    const transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass
      }
    });

    // E-Mail senden
    await transporter.sendMail({
      from: emailConfig.from,
      to: emailConfig.to,
      subject: `B2B-Anfrage von ${data.company}`,
      html: createBusinessContactEmailTemplate(data),
      replyTo: data.email
    });

    return NextResponse.json({ success: true, message: 'B2B-Anfrage erfolgreich gesendet.' });
  } catch (error) {
    console.error('Fehler beim Senden der B2B-Anfrage:', error);
    return NextResponse.json({ error: 'Fehler beim Senden der B2B-Anfrage.' }, { status: 500 });
  }
}