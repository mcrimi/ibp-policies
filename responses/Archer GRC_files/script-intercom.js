
if(!window.INTERCOM_INITIALIZED) {
  window.INTERCOM_INITIALIZED = true;
/**
 * Convert the locale to ISO 639-1
 * @param {string | undefined} locale
 */
const convertLocale = locale => {
  // If a locale is not specified, default to english
  const languageCode = locale?.split('-')[0] ?? 'en';

  // Chinese has to be a 4-letter code
  if (languageCode.includes('zh')) return 'zh-CN';
  // Norwegian has to be Norwegian Bokmål
  if (languageCode.includes('no')) return 'nb';

  return languageCode;
};

(async () => {
  const userId = ArcherApp?.globals?.userId;
  // The userId is required
  if (!userId) {
    console.error('Intercom plugin:', 'The userId was not found.');
    return;
  }

  const baseUrl = ArcherApp?.globals?.baseUrl ?? '';
  const userProfileData = await fetch(`${baseUrl}/api/V2/internal/UserProfile(${userId})?id=${userId}`, {
    method: 'GET',
    headers: { Accept: 'application/json' }
  })
    .then(response => response.json())
    .catch(() => console.error('Intercom plugin:', 'The user profile information could not be retrieved.'));

  // The user profile data caught an error
  if (!userProfileData) {
    return;
  }

  // Gather User Profile Data
  const { User: { FirstName = '', LastName = '', Locale } = {}, ContactInfo, IntercomHash, IntercomAppId } = userProfileData;

  // If the intercom hash is not present, the user does not have access to intercom
  if (!IntercomHash) {
    console.warn('Intercom plugin:', 'Your user does not have permission to access Intercom.');
    return;
  }

  // If Intercom is disabled, do not load the script
  if (IntercomAppId === 'off') {
    console.warn('Intercom plugin:', 'Intercom is disabled.');
    return;
  }

  // Get the default email address
  const emailAddress = ContactInfo?.find(item => item.ContactType === 'EMail' && item.IsDefault === true)?.Value;

  // There must be a non-empty email address to load intercom
  if (!emailAddress || emailAddress.trim().length === 0) {
    console.warn('Intercom plugin:', 'Your user profile must have a default email address to access Intercom.');
    return;
  }

  const name = `${FirstName} ${LastName}`.trim();
  const languageCode = convertLocale(Locale);

  // Add the intercom script to the page
  const intercomScript = document.createElement('script');
  intercomScript.innerText = `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/gha4lazl';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`;
  document.body.appendChild(intercomScript);

  // Boot intercom with the user information
  window.Intercom('boot', {
    alignment: 'left', // Align the Intercom widget to the left over the navigation panel
    vertical_padding: 40,
    horizontal_padding: 32,
    api_base: 'https://api-iam.intercom.io',
    app_id: IntercomAppId || 'gha4lazl', // Fallback to the original Intercom App ID
    name,
    language_override: languageCode,
    user_id: emailAddress, // Use the email address here since the user's ID is not unique
    user_hash: IntercomHash,
    email: emailAddress
  });
})();
}
