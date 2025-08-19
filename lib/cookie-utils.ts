
export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export const getCookieConsent = (): CookieConsent | null => {
  if (typeof window === 'undefined') return null;
  
  const consent = localStorage.getItem('cookie-consent');
  return consent ? JSON.parse(consent) : null;
};

export const setCookieConsent = (consent: CookieConsent) => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('cookie-consent', JSON.stringify(consent));
};

export const hasConsent = (type: keyof CookieConsent): boolean => {
  const consent = getCookieConsent();
  return consent ? consent[type] : false;
};

export const loadGoogleAnalytics = (measurementId: string) => {
  if (!hasConsent('analytics')) return;
  
  // Google Analytics laden
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      anonymize_ip: true,
      cookie_flags: 'secure;samesite=lax'
    });
  `;
  document.head.appendChild(script2);
};

export const loadFacebookPixel = (pixelId: string) => {
  if (!hasConsent('marketing')) return;
  
  // Facebook Pixel laden
  const script = document.createElement('script');
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);
};

export const trackEvent = (eventName: string, parameters?: any) => {
  // Google Analytics Event
  if (hasConsent('analytics') && typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
  }
  
  // Facebook Pixel Event
  if (hasConsent('marketing') && typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, parameters);
  }
};
