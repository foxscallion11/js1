(function () {
  // ���� mode Ĭ��ֵ
  if (sessionStorage.getItem('mode') == null) {
    var hours = new Date();
    // ���ʱ�������� 18 �㵽���� 6 �㣬�Զ���ҹ
    if (hours.getHours() >= 18 || hours.getHours() <= 6) {
      sessionStorage.setItem('mode', 'github-dark');
    } else {
      sessionStorage.setItem('mode', 'github-light');
    }
  }

  // body ���� �ӳ�����
  // document.body.style.background = 'url(https://cdn.jsdelivr.net/gh/zsdycs/lipk.org/static/images/geometry.png)';
  // document.body.style.backgroundRepeat = 'repeat';

  var modeLS = sessionStorage.getItem('mode');

  // �жϼ�����Ӧģʽ CSS
  window.addDarkmodeCSS = function addDarkmodeCSS(mode) {
    var githubLightCSS = document.querySelector('#github-light');
    var githubDarkCSS = document.querySelector('#github-dark');
    var githubDarkOrangeCSS = document.querySelector('#github-dark-orange');
    var darkBlueCSS = document.querySelector('#dark-blue');
    var icyDarkCSS = document.querySelector('#icy-dark');
    var photonDarkCSS = document.querySelector('#photon-dark');

    var modeTag = document.querySelector('#modeTag');
    if (!modeTag) return;
    var highlightjsNightCSS = document.querySelector('#highlightjsThemeNight');

    // ��ʼ��
    [ githubDarkCSS.disabled,
      githubLightCSS.disabled,
      githubDarkOrangeCSS.disabled,
      darkBlueCSS.disabled,
      icyDarkCSS.disabled,
      photonDarkCSS.disabled
    ] = [
      true,
      true,
      true,
      true,
      true,
      true
    ];

    if (mode === 'github-light') {
      if (highlightjsNightCSS) highlightjsNightCSS.disabled = true;
      githubLightCSS.disabled = false;
      modeTag.innerHTML = '����';
    } else {
      if (highlightjsNightCSS) highlightjsNightCSS.disabled = false;
      if (mode === 'github-dark') {
        githubDarkCSS.disabled = false;
        modeTag.innerHTML = '��ҹ';
      }
      if (mode === 'github-dark-orange') {
        githubDarkOrangeCSS.disabled = false;
        modeTag.innerHTML = '��ĺ';
      }
      if (mode === 'dark-blue') {
        darkBlueCSS.disabled = false;
        modeTag.innerHTML = '���';
      }
      if (mode === 'icy-dark') {
        icyDarkCSS.disabled = false;
        modeTag.innerHTML = '�곿';
      }
      if (mode === 'photon-dark') {
        photonDarkCSS.disabled = false;
        modeTag.innerHTML = '��ҹ';
      }
    }
  }

  // �������ʱ��������Ӧģʽ CSS
  addDarkmodeCSS(modeLS);
})();

// �л���ҹ����ģʽ
function mode() {
  var nowDarkmode = sessionStorage.getItem('mode');
  var beaudar = document.querySelector('#beaudar iframe');
  var message = {
    type: 'set-theme',
    theme: 'github-light'
  };
  /**
   * ˳��
   *       -> 'github-light'        // ����
   *       -> 'github-dark'         // ��ҹ
   *       -> 'github-dark-orange'  // ��ĺ
   *       -> 'dark-blue'           // ���
   *       -> 'icy-dark'            // �곿
   *       -> 'photon-dark'         // ��ҹ
   */
  if (nowDarkmode === 'github-light') {
    // github-light -> github-dark
    message.theme = 'github-dark';
    sessionStorage.setItem('mode', 'github-dark');
    this.addDarkmodeCSS('github-dark');
  } else if (nowDarkmode === 'github-dark') {
    // github-dark -> github-dark-orange
    message.theme = 'github-dark-orange';
    sessionStorage.setItem('mode', 'github-dark-orange');
    this.addDarkmodeCSS('github-dark-orange');
  } else if (nowDarkmode === 'github-dark-orange') {
    // github-dark-orange -> dark-blue
    message.theme = 'dark-blue';
    sessionStorage.setItem('mode', 'dark-blue');
    this.addDarkmodeCSS('dark-blue');
  } else if (nowDarkmode === 'dark-blue') {
    // dark-blue -> icy-dark
    message.theme = 'icy-dark';
    sessionStorage.setItem('mode', 'icy-dark');
    this.addDarkmodeCSS('icy-dark');
  } else if (nowDarkmode === 'icy-dark') {
    // icy-dark -> photon-dark
    message.theme = 'photon-dark';
    sessionStorage.setItem('mode', 'photon-dark');
    this.addDarkmodeCSS('photon-dark');
  } else if (nowDarkmode === 'photon-dark') {
    // photon-dark -> github-light
    message.theme = 'github-light';
    sessionStorage.setItem('mode', 'github-light');
    this.addDarkmodeCSS('github-light');
  }
  // �� beaudar ͨ��
  if (sessionStorage.getItem('beaudar') === 'true') {
    beaudar.contentWindow.postMessage(message, 'https://beaudar.lipk.org');
  }
}