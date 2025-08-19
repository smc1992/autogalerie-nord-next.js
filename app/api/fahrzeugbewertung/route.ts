import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { emailConfig } from '../../../lib/email-config';

// HTML Template für Fahrzeugbewertungsformular
function createVehicleEvaluationEmailTemplate(data: any) {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Neue Fahrzeugbewertungsanfrage - Autogalerie Nord</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #dc2626; }
        .value { margin-top: 5px; }
        .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
        .vehicle-section { background: #e5e7eb; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .vehicle-badge { background: #059669; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚗 Fahrzeugbewertungsanfrage</h1>
            <p>Autogalerie Nord GmbH</p>
            <span class="vehicle-badge">BEWERTUNGSANFRAGE</span>
        </div>
        
        <div class="content">
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
            
            <div class="vehicle-section">
                <h3>Fahrzeugdaten</h3>
                
                <div class="field">
                    <div class="label">Marke:</div>
                    <div class="value">${data.marke}</div>
                </div>
                
                <div class="field">
                    <div class="label">Modell:</div>
                    <div class="value">${data.modell}</div>
                </div>
                
                <div class="field">
                    <div class="label">Baujahr:</div>
                    <div class="value">${data.baujahr}</div>
                </div>
                
                <div class="field">
                    <div class="label">Kilometerstand:</div>
                    <div class="value">${data.kilometerstand} km</div>
                </div>
                
                <div class="field">
                    <div class="label">Kraftstoff:</div>
                    <div class="value">${data.kraftstoff}</div>
                </div>
                
                <div class="field">
                    <div class="label">Getriebe:</div>
                    <div class="value">${data.getriebe}</div>
                </div>
                
                <div class="field">
                    <div class="label">Zustand:</div>
                    <div class="value">${data.zustand}</div>
                </div>
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
            <p>Diese E-Mail wurde automatisch über das Fahrzeugbewertungsformular der Website gesendet.</p>
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
      marke: formData.get('marke') as string,
      modell: formData.get('modell') as string,
      baujahr: formData.get('baujahr') as string,
      kilometerstand: formData.get('kilometerstand') as string,
      kraftstoff: formData.get('kraftstoff') as string,
      getriebe: formData.get('getriebe') as string,
      zustand: formData.get('zustand') as string,
      nachricht: formData.get('nachricht') as string
    };

    // Validierung
    if (!data.vorname || !data.nachname || !data.email || !data.telefon || !data.marke || !data.modell) {
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
      subject: `Fahrzeugbewertung: ${data.marke} ${data.modell} (${data.baujahr})`,
      html: createVehicleEvaluationEmailTemplate(data),
      replyTo: data.email
    });

    return NextResponse.json({ success: true, message: 'Fahrzeugbewertungsanfrage erfolgreich gesendet.' });
  } catch (error) {
    console.error('Fehler beim Senden der Fahrzeugbewertungsanfrage:', error);
    return NextResponse.json({ error: 'Fehler beim Senden der Fahrzeugbewertungsanfrage.' }, { status: 500 });
  }
}