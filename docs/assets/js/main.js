(function() {
      var THEME_KEY = '3days-intern-theme';
      var TAB_KEY = '3days-intern-tab';
      var btnThemeDark = document.getElementById('theme-dark');
      var btnThemeLight = document.getElementById('theme-light');
      var tabs = document.querySelectorAll('.tab-nav button');
      var panels = document.querySelectorAll('.tab-panel');
      var tabIds = ['basic', 'think', 'output', 'stuck'];

      function setTheme(mode) {
        var isDark = mode === 'dark';
        document.body.classList.toggle('theme-dark', isDark);
        btnThemeDark.classList.toggle('active', isDark);
        btnThemeLight.classList.toggle('active', !isDark);
        btnThemeDark.setAttribute('aria-pressed', isDark);
        btnThemeLight.setAttribute('aria-pressed', !isDark);
        try { localStorage.setItem(THEME_KEY, mode); } catch (e) {}
      }

      function setTab(id) {
        tabs.forEach(function(t) {
          var isActive = t.id === 'tab-' + id;
          t.classList.toggle('active', isActive);
          t.setAttribute('aria-selected', isActive);
        });
        panels.forEach(function(p) {
          p.classList.toggle('active', p.id === 'panel-' + id);
        });
        try { localStorage.setItem(TAB_KEY, id); } catch (e) {}
      }

      function filterSearch() {
        var q = (document.getElementById('search-input').value || '').trim().toLowerCase();
        var activePanel = document.querySelector('.tab-panel.active');
        if (!activePanel) return;
        var blocks = activePanel.querySelectorAll('.prompt-block, .stuck-list li');
        blocks.forEach(function(b) {
          var title = (b.querySelector('.prompt-title, .stuck-when') || {}).textContent || '';
          var note = (b.querySelector('.prompt-note') || {}).textContent || '';
          var text = (b.querySelector('.prompt-text') || {}).textContent || '';
          var match = !q || (title + note + text).toLowerCase().indexOf(q) >= 0;
          b.classList.toggle('search-hidden', !match);
        });
      }

      btnThemeDark.addEventListener('click', function() { setTheme('dark'); });
      btnThemeLight.addEventListener('click', function() { setTheme('light'); });
      tabs.forEach(function(t) {
        t.addEventListener('click', function() {
          setTab(t.id.replace('tab-', ''));
          setTimeout(filterSearch, 0);
        });
      });
      document.getElementById('search-input').addEventListener('input', filterSearch);

      var savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'dark') setTheme('dark');
      var savedTab = localStorage.getItem(TAB_KEY);
      if (savedTab && tabIds.indexOf(savedTab) >= 0) setTab(savedTab);
    })();

    document.querySelectorAll('.copy-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = this.getAttribute('data-copy');
        var pre = document.querySelector('.prompt-text[data-prompt="' + id + '"]');
        var text = pre ? pre.textContent : '';
        navigator.clipboard.writeText(text).then(function() {
          btn.textContent = 'コピーしました';
          btn.classList.add('copied');
          setTimeout(function() {
            btn.textContent = 'コピー';
            btn.classList.remove('copied');
          }, 2000);
        });
      });
    });
