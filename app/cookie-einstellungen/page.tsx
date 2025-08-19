
import CookieSettings from '../../components/CookieSettings';

export const metadata = {
  title: 'Cookie-Einstellungen - Autogalerie Nord',
  description: 'Verwalten Sie Ihre Cookie-Präferenzen und Datenschutz-Einstellungen für die Autogalerie Nord Website.',
};

export default function CookieEinstellungenPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <CookieSettings />
    </div>
  );
}
