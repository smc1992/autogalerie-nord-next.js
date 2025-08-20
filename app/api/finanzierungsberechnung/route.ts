import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { emailConfig } from '../../../lib/email-config';

// HTML Template für Finanzierungsberechnung
function createFinancingEmailTemplate(data: any) {
  const finanzierungsbetrag = parseFloat(data.fahrzeugpreis) - parseFloat(data.anzahlung || '0');
  
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Neue Finanzierungsanfrage - Autogalerie Nord</title>
    <style>
        body { font-family: 'Klavika', system-ui, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #dc2626; }
        .value { margin-top: 5px; }
        .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
        .financing-section { background: #e5e7eb; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .financing-badge { background: #059669; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px; }
        .amount { font-size: 18px; font-weight: bold; color: #dc2626; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💰 Finanzierungsanfrage</h1>
            <p>Autogalerie Nord GmbH</p>
            <span class="financing-badge">FINANZIERUNGSBERECHNUNG</span>
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
            
            <div class="financing-section">
                <h3>Finanzierungsdaten</h3>
                
                <div class="field">
                    <div class="label">Fahrzeugpreis:</div>
                    <div class="value amount">${parseFloat(data.fahrzeugpreis).toLocaleString('de-DE')} €</div>
                </div>
                
                <div class="field">
                    <div class="label">Anzahlung:</div>
                    <div class="value">${data.anzahlung ? parseFloat(data.anzahlung).toLocaleString('de-DE') + ' €' : 'Keine Anzahlung'}</div>
                </div>
                
                <div class="field">
                    <div class="label">Finanzierungsbetrag:</div>
                    <div class="value amount">${finanzierungsbetrag.toLocaleString('de-DE')} €</div>
                </div>
                
                <div class="field">
                    <div class="label">Gewünschte Laufzeit:</div>
                    <div class="value">${data.laufzeit} Monate</div>
                </div>
                
                <div class="field">
                    <div class="label">Monatliches Nettoeinkommen:</div>
                    <div class="value">${parseFloat(data.einkommen).toLocaleString('de-DE')} €</div>
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
            <p>Diese E-Mail wurde automatisch über das Finanzierungsformular der Website gesendet.</p>
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
      fahrzeugpreis: formData.get('fahrzeugpreis') as string,
      anzahlung: formData.get('anzahlung') as string,
      laufzeit: formData.get('laufzeit') as string,
      einkommen: formData.get('einkommen') as string,
      nachricht: formData.get('nachricht') as string
    };

    // Validierung
    if (!data.vorname || !data.nachname || !data.email || !data.telefon || !data.fahrzeugpreis || !data.laufzeit || !data.einkommen) {
      return NextResponse.json({ error: 'Alle Pflichtfelder müssen ausgefüllt werden.' }, { status: 400 });
    }

    // Numerische Validierung
    const fahrzeugpreis = parseFloat(data.fahrzeugpreis);
    const einkommen = parseFloat(data.einkommen);
    const anzahlung = data.anzahlung ? parseFloat(data.anzahlung) : 0;

    if (isNaN(fahrzeugpreis) || fahrzeugpreis < 1000) {
      return NextResponse.json({ error: 'Fahrzeugpreis muss mindestens 1.000 € betragen.' }, { status: 400 });
    }

    if (isNaN(einkommen) || einkommen < 500) {
      return NextResponse.json({ error: 'Monatliches Nettoeinkommen muss mindestens 500 € betragen.' }, { status: 400 });
    }

    if (anzahlung >= fahrzeugpreis) {
      return NextResponse.json({ error: 'Anzahlung kann nicht höher als der Fahrzeugpreis sein.' }, { status: 400 });
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
      subject: `Finanzierungsanfrage: ${data.vorname} ${data.nachname} - ${parseFloat(data.fahrzeugpreis).toLocaleString('de-DE')} €`,
      html: createFinancingEmailTemplate(data),
      replyTo: data.email
    });

    return NextResponse.json({ success: true, message: 'Finanzierungsanfrage erfolgreich gesendet.' });
  } catch (error) {
    console.error('Fehler beim Senden der Finanzierungsanfrage:', error);
    return NextResponse.json({ error: 'Fehler beim Senden der Finanzierungsanfrage.' }, { status: 500 });
  }
}