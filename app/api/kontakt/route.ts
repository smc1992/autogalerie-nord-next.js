import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { emailConfig } from '../../../lib/email-config';
import {
  getClientKeyFromHeaders,
  isRateLimited,
  recordAttempt,
  isDuplicateSubmission,
  markSubmission,
} from '../../../lib/submit-guard';

// HTML Template für Kontaktformular
function createContactEmailTemplate(data: any) {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Neue Kontaktanfrage - Autogalerie Nord</title>
    <style>
        body { font-family: 'Klavika', system-ui, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #dc2626; }
        .value { margin-top: 5px; }
        .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Neue Kontaktanfrage</h1>
            <p>Autogalerie Nord GmbH</p>
        </div>
        
        <div class="content">
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
            
            <div class="field">
                <div class="label">Betreff:</div>
                <div class="value">${data.betreff}</div>
            </div>
            
            <div class="field">
                <div class="label">Nachricht:</div>
                <div class="value">${data.nachricht}</div>
            </div>
            
            <div class="field">
                <div class="label">Datenschutz zugestimmt:</div>
                <div class="value">${data.datenschutz ? 'Ja' : 'Nein'}</div>
            </div>
            
            <div class="field">
                <div class="label">Eingegangen am:</div>
                <div class="value">${new Date().toLocaleString('de-DE')}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>Diese E-Mail wurde automatisch über das Kontaktformular der Website gesendet.</p>
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
    const submissionId = (formData.get('submissionId') as string) || '';
    const formStartedAtStr = (formData.get('formStartedAt') as string) || '';
    const clientKey = getClientKeyFromHeaders(request.headers);

    // Rate limit check
    if (isRateLimited(clientKey)) {
      return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
    }

    // Idempotency check
    if (!submissionId) {
      return NextResponse.json({ error: 'missing_submission_id' }, { status: 400 });
    }
    if (isDuplicateSubmission(submissionId)) {
      // Silently accept duplicate to avoid user confusion
      return NextResponse.json({ success: true, duplicate: true, message: 'Duplicate submission ignored.' });
    }

    const data = {
      vorname: formData.get('vorname') as string,
      nachname: formData.get('nachname') as string,
      betreff: formData.get('betreff') as string,
      email: formData.get('email') as string,
      telefon: formData.get('telefon') as string,
      nachricht: formData.get('nachricht') as string,
      datenschutz: formData.get('datenschutz') === 'true'
    };

    // Validierung
    if (!data.vorname || !data.nachname || !data.betreff || !data.email || !data.telefon || !data.nachricht || !data.datenschutz) {
      return NextResponse.json({ error: 'Alle Pflichtfelder müssen ausgefüllt werden.' }, { status: 400 });
    }

    // Minimal sanity check for form time (optional)
    const formStartedAt = Number(formStartedAtStr);
    if (isFinite(formStartedAt) && Date.now() - formStartedAt < 1000) {
      // if filled too quickly (<1s), still proceed but count towards rate window
    }

    // Record attempt before sending to avoid duplicate sends on retries
    recordAttempt(clientKey);
    markSubmission(submissionId);

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
      subject: `Kontaktanfrage: ${data.betreff}`,
      html: createContactEmailTemplate(data),
      replyTo: data.email
    });

    return NextResponse.json({ success: true, message: 'E-Mail erfolgreich gesendet.' });
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    return NextResponse.json({ error: 'Fehler beim Senden der E-Mail.' }, { status: 500 });
  }
}