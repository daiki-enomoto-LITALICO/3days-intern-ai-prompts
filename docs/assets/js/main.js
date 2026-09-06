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

      var currentTab = 'basic';

      function setTab(id, persist) {
        currentTab = id;
        tabs.forEach(function(t) {
          var isActive = t.id === 'tab-' + id;
          t.classList.toggle('active', isActive);
          t.setAttribute('aria-selected', isActive);
        });
        panels.forEach(function(p) {
          p.classList.toggle('active', p.id === 'panel-' + id);
        });
        if (persist !== false) {
          try { localStorage.setItem(TAB_KEY, id); } catch (e) {}
        }
      }

      function blockSearchText(b) {
        var title = (b.querySelector('.prompt-title, .stuck-when') || {}).textContent || '';
        var notes = [];
        b.querySelectorAll('.prompt-note').forEach(function(n) { notes.push(n.textContent || ''); });
        var texts = [];
        b.querySelectorAll('.prompt-text').forEach(function(n) { texts.push(n.textContent || ''); });
        var panel = b.closest('.tab-panel');
        var h2 = panel && panel.querySelector('h2') ? panel.querySelector('h2').textContent : '';
        var group = '';
        var prev = b.previousElementSibling;
        while (prev) {
          if (prev.classList && prev.classList.contains('group-title')) {
            group = prev.textContent || '';
            break;
          }
          prev = prev.previousElementSibling;
        }
        return (title + ' ' + notes.join(' ') + ' ' + texts.join(' ') + ' ' + h2 + ' ' + group).toLowerCase();
      }

      function hideEmptyGroups(searching) {
        document.querySelectorAll('h3.group-title').forEach(function(h) {
          if (!searching) {
            h.classList.remove('search-hidden');
            var lede = h.nextElementSibling;
            if (lede && lede.classList.contains('lede')) lede.classList.remove('search-hidden');
            return;
          }
          var any = false;
          var el = h.nextElementSibling;
          while (el && !(el.classList && el.classList.contains('group-title'))) {
            if (el.classList && el.classList.contains('prompt-block') && !el.classList.contains('search-hidden')) {
              any = true;
              break;
            }
            el = el.nextElementSibling;
          }
          h.classList.toggle('search-hidden', !any);
          var next = h.nextElementSibling;
          if (next && next.classList.contains('lede')) next.classList.toggle('search-hidden', !any);
        });
      }

      function filterSearch() {
        var q = (document.getElementById('search-input').value || '').trim().toLowerCase();
        var searching = q.length > 0;
        document.body.classList.toggle('is-searching', searching);

        document.querySelectorAll('.prompt-block, .stuck-list li').forEach(function(b) {
          var match = !searching || blockSearchText(b).indexOf(q) >= 0;
          b.classList.toggle('search-hidden', searching && !match);
        });

        if (searching) {
          panels.forEach(function(p) {
            var hits = p.querySelectorAll('.prompt-block:not(.search-hidden), .stuck-list li:not(.search-hidden)');
            var hasHit = hits.length > 0;
            p.classList.toggle('has-hit', hasHit);
            p.classList.toggle('active', hasHit);
          });
          tabs.forEach(function(t) {
            var panel = document.getElementById('panel-' + t.id.replace('tab-', ''));
            var on = panel && panel.classList.contains('has-hit');
            t.classList.toggle('active', on);
            t.setAttribute('aria-selected', on);
          });
        } else {
          panels.forEach(function(p) { p.classList.remove('has-hit'); });
          setTab(currentTab, false);
        }

        hideEmptyGroups(searching);
      }

      btnThemeDark.addEventListener('click', function() { setTheme('dark'); });
      btnThemeLight.addEventListener('click', function() { setTheme('light'); });
      tabs.forEach(function(t) {
        t.addEventListener('click', function() {
          if (document.body.classList.contains('is-searching')) return;
          setTab(t.id.replace('tab-', ''));
        });
      });
      var searchInput = document.getElementById('search-input');
      searchInput.addEventListener('input', filterSearch);
      searchInput.addEventListener('compositionend', filterSearch);
      searchInput.addEventListener('search', filterSearch);

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
