import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { emailConfig } from '../../../lib/email-config';

// HTML Template für Autoankauf-Anfrage
function createAutoankaufEmailTemplate(data: any) {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Neue Autoankauf-Anfrage - Autogalerie Nord</title>
    <style>
        body { font-family: 'Klavika', system-ui, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #dc2626; }
        .value { margin-top: 5px; }
        .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
        .vehicle-section { background: #e5e7eb; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .contact-section { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .price-badge { background: #059669; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px; }
        .highlight { font-size: 18px; font-weight: bold; color: #dc2626; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚗 Autoankauf-Anfrage</h1>
            <p>Autogalerie Nord GmbH</p>
            <span class="price-badge">VERKAUFSANFRAGE</span>
        </div>
        
        <div class="content">
            <div class="contact-section">
                <h3>Kontaktdaten</h3>
                <div class="field">
                    <div class="label">Name:</div>
                    <div class="value">${data.vorname} ${data.nachname}</div>
                </div>
                
                <div class="field">
                    <div class="label">E-Mail:</div>
                    <div class="value">${data.email}</div>
                </div>
                
                <div class="field">
                    <div class="label">Telefon:</div>
                    <div class="value">${data.telefon}</div>
                </div>
            </div>
            
            <div class="vehicle-section">
                <h3>Fahrzeugdaten</h3>
                
                <div class="field">
                    <div class="label">Fahrzeug:</div>
                    <div class="value highlight">${data.fahrzeugmarke} ${data.fahrzeugmodell}</div>
                </div>
                
                <div class="field">
                    <div class="label">Baujahr:</div>
                    <div class="value">${data.baujahr}</div>
                </div>
                
                <div class="field">
                    <div class="label">Kilometerstand:</div>
                    <div class="value">${parseInt(data.kilometerstand).toLocaleString('de-DE')} km</div>
                </div>
                
                <div class="field">
                    <div class="label">Kraftstoff:</div>
                    <div class="value">${data.kraftstoff}</div>
                </div>
                
                <div class="field">
                    <div class="label">Zustand:</div>
                    <div class="value">${data.zustand}</div>
                </div>
                
                ${data.wunschpreis ? `
                <div class="field">
                    <div class="label">Preisvorstellung:</div>
                    <div class="value highlight">${parseInt(data.wunschpreis).toLocaleString('de-DE')} €</div>
                </div>
                ` : ''}
            </div>
            
            ${data.nachricht ? `
            <div class="field">
                <div class="label">Zusätzliche Informationen:</div>
                <div class="value">${data.nachricht}</div>
            </div>
            ` : ''}
            
            <div class="field">
                <div class="label">Eingegangen am:</div>
                <div class="value">${new Date().toLocaleString('de-DE')}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>Diese E-Mail wurde automatisch über das Autoankauf-Formular der Website gesendet.</p>
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
      vorname: formData.get('vorname') as string,
      nachname: formData.get('nachname') as string,
      email: formData.get('email') as string,
      telefon: formData.get('telefon') as string,
      fahrzeugmarke: formData.get('fahrzeugmarke') as string,
      fahrzeugmodell: formData.get('fahrzeugmodell') as string,
      baujahr: formData.get('baujahr') as string,
      kilometerstand: formData.get('kilometerstand') as string,
      kraftstoff: formData.get('kraftstoff') as string,
      zustand: formData.get('zustand') as string,
      wunschpreis: formData.get('wunschpreis') as string,
      nachricht: formData.get('nachricht') as string
    };

    // Validierung der Pflichtfelder
    if (!data.vorname || !data.nachname || !data.email || !data.telefon || 
        !data.fahrzeugmarke || !data.fahrzeugmodell || !data.baujahr || 
        !data.kilometerstand || !data.kraftstoff || !data.zustand) {
      return NextResponse.json({ error: 'Alle Pflichtfelder müssen ausgefüllt werden.' }, { status: 400 });
    }

    // Numerische Validierung
    const kilometerstand = parseInt(data.kilometerstand);
    const baujahr = parseInt(data.baujahr);
    const currentYear = new Date().getFullYear();

    if (isNaN(kilometerstand) || kilometerstand < 0) {
      return NextResponse.json({ error: 'Kilometerstand muss eine gültige Zahl sein.' }, { status: 400 });
    }

    if (isNaN(baujahr) || baujahr < 1900 || baujahr > currentYear + 1) {
      return NextResponse.json({ error: 'Baujahr muss zwischen 1900 und ' + (currentYear + 1) + ' liegen.' }, { status: 400 });
    }

    if (data.wunschpreis) {
      const wunschpreis = parseInt(data.wunschpreis);
      if (isNaN(wunschpreis) || wunschpreis < 0) {
        return NextResponse.json({ error: 'Preisvorstellung muss eine gültige Zahl sein.' }, { status: 400 });
      }
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
      subject: `Autoankauf: ${data.fahrzeugmarke} ${data.fahrzeugmodell} (${data.baujahr}) - ${data.vorname} ${data.nachname}`,
      html: createAutoankaufEmailTemplate(data),
      replyTo: data.email
    });

    return NextResponse.json({ success: true, message: 'Autoankauf-Anfrage erfolgreich gesendet.' });
  } catch (error) {
    console.error('Fehler beim Senden der Autoankauf-Anfrage:', error);
    return NextResponse.json({ error: 'Fehler beim Senden der Autoankauf-Anfrage.' }, { status: 500 });
  }
}