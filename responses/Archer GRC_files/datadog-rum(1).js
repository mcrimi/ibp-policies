if (!window.DD_RUM_INITIALIZED) {
  (function (h, o, u, n, d) {
    h = h[d] = h[d] || {
      q: [],
      onReady: function (c) {
        h.q.push(c);
      }
    };
    d = o.createElement(u);
    d.async = 1;
    d.src = n;
    n = o.getElementsByTagName(u)[0];
    n.parentNode.insertBefore(d, n);
  })(window, document, 'script', 'https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js', 'DD_RUM');
  window.DD_RUM.onReady(function () {
    if (window.DD_RUM.getInitConfiguration() === undefined) {
    window.DD_RUM.init({
      clientToken: 'pube2693bd6a636d0bbd0e020509cb2e5b3',
      applicationId: '247bb9bf-778a-4dd2-b2c4-daab0971a826',
      site: 'datadoghq.com',
      service: 'us-west-2-saas-prod',
      env: 'prod',
      sessionSampleRate: 50,
      sessionReplaySampleRate: 0,
      trackUserInteractions: false,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: 'mask-user-input',
    });
      window.DD_RUM.startSessionReplayRecording();
    }

    window.DD_RUM_INITIALIZED = true;
  });
  const checkNgrxFlag = setInterval(() => {
    if (window.DD_RUM && window.DD_RUM.addAction && window.ArcherApp && window.ArcherApp.globals) {
      clearInterval(checkNgrxFlag);
      window.DD_RUM.addAction('archer-page-init', {
        userId: window.ArcherApp.globals.userId,
        userHostPlusId: window.location.hostname + '_' + window.ArcherApp.globals.userId,
        ngrxFlag: window.ArcherApp.globals.ngrxFlag,
        experienceState: window.localStorage.getItem('experienceState') || window.sessionStorage.getItem('experienceState') || 'unknown'
      });
    }
  }, 100);
}
