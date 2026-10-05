/* =========================================================
   INTERAÇÕES + RASTREAMENTO (Google Tag Manager)
   · Todos os eventos empurram para window.dataLayer
   · Crie os GTM triggers com "Evento" igual ao nome abaixo
   ========================================================= */
(function () {
  'use strict';

  var SECTION_TIME_THRESHOLD = 0.3; // % da seção visível para iniciar o cronômetro

  /* ---------- util de rastreamento ---------- */
  window.dataLayer = window.dataLayer || [];
  function track(event, params) {
    var payload = { event: event };
    if (params) for (var k in params) payload[k] = params[k];
    window.dataLayer.push(payload);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initMobileNav();
    initActiveNav();
    initReveal();
    initFilters();
    initModal();
    initPortfolioTime();
    initForm();
    initTracking();
    initYear();
  });

  /* ---------- 1. Header com estado no scroll ---------- */
  function initHeader() {
    var header = document.querySelector('.header');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 2. Menu mobile ---------- */
  function initMobileNav() {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('menu-principal');
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
  }

  /* ---------- 3. Link ativo conforme a seção visível ---------- */
  function initActiveNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
    var sections = links
      .map(function (l) { return document.querySelector(l.getAttribute('href')); })
      .filter(Boolean);
    if (!('IntersectionObserver' in window) || !sections.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) {
          l.classList.toggle('is-active', l.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------- 4. Animação de entrada (reveal) ---------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 5. Filtros do portfólio ---------- */
  function initFilters() {
    var buttons = document.querySelectorAll('.filtro');
    var cards = document.querySelectorAll('.card');
    var empty = document.getElementById('portfolio-empty');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.dataset.filter;
        var visible = 0;

        buttons.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });

        cards.forEach(function (card) {
          var cats = (card.dataset.categories || '').split(/\s+/);
          var show = filter === 'todos' || cats.indexOf(filter) !== -1;
          card.classList.toggle('is-hidden', !show);
          if (show) visible++;
        });

        if (empty) empty.hidden = visible > 0;
        track('filter_apply', { filter_name: filter, visible_projects: visible });
      });
    });
  }

  /* ---------- 6. Modal de projeto ---------- */
  function initModal() {
    var modal = document.getElementById('modal-projeto');
    var grid = document.getElementById('grid-portfolio');
    if (!modal || !grid) return;

    var closeBtn = document.getElementById('modal-close');
    var lastFocus = null;

    var fields = {
      img: document.getElementById('modal-img'),
      cat: document.getElementById('modal-categoria'),
      titulo: document.getElementById('modal-titulo'),
      desafio: document.getElementById('modal-desafio'),
      solucao: document.getElementById('modal-solucao'),
      resultados: document.getElementById('modal-resultados')
    };

    function open(id) {
      var p = window.PROJECTS && window.PROJECTS[id];
      if (!p) return;

      lastFocus = document.activeElement;
      fields.img.src = p.imagem;
      fields.img.alt = p.alt || p.titulo;
      fields.cat.textContent = p.categoria;
      fields.titulo.textContent = p.titulo;
      fields.desafio.textContent = p.desafio;
      fields.solucao.textContent = p.solucao;

      fields.resultados.innerHTML = '';
      (p.resultados || []).forEach(function (r) {
        var li = document.createElement('li');
        var strong = document.createElement('strong');
        var span = document.createElement('span');
        strong.textContent = r.valor;
        span.textContent = r.label;
        li.appendChild(strong);
        li.appendChild(span);
        fields.resultados.appendChild(li);
      });

      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();

      track('project_open', { project_id: id, project_title: p.titulo });
    }

    function close() {
      modal.hidden = true;
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    grid.addEventListener('click', function (e) {
      var card = e.target.closest('.card');
      if (card) open(card.dataset.id);
    });

    modal.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]') || e.target.closest('.modal__close')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (modal.hidden) return;
      if (e.key === 'Escape') close();

      // foco preso dentro do modal
      if (e.key === 'Tab') {
        var focusables = modal.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------- 7. Tempo de visualização na seção de portfólio ---------- */
  function initPortfolioTime() {
    var section = document.getElementById('portfolio');
    if (!section || !('IntersectionObserver' in window)) return;

    var visible = false;
    var startedAt = 0;
    var accumulated = 0;

    function flush() {
      if (accumulated >= 1000) {
        track('portfolio_view_time', { seconds: Math.round(accumulated / 1000) });
      }
      accumulated = 0;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !visible) {
          visible = true;
          startedAt = Date.now();
        } else if (!entry.isIntersecting && visible) {
          visible = false;
          accumulated += Date.now() - startedAt;
          flush();
        }
      });
    }, { threshold: SECTION_TIME_THRESHOLD });

    io.observe(section);

    // Garante o envio ao sair da página
    window.addEventListener('pagehide', function () {
      if (visible) accumulated += Date.now() - startedAt;
      flush();
    });
  }

  /* ---------- 8. Formulário de contato ---------- */
  function initForm() {
    var form = document.getElementById('form-contato');
    var msg = document.getElementById('form-msg');
    if (!form) return;

    var rules = {
      nome: function (v) { return v.trim().length >= 2 || 'Informe seu nome.'; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Informe um e-mail válido.'; },
      assunto: function (v) { return v.trim().length >= 3 || 'Informe o assunto.'; },
      mensagem: function (v) { return v.trim().length >= 10 || 'Escreva uma mensagem com pelo menos 10 caracteres.'; }
    };

    function validateField(input) {
      var result = rules[input.name](input.value);
      var wrapper = input.closest('.field');
      var errorEl = form.querySelector('[data-error-for="' + input.name + '"]');
      var valid = result === true;
      wrapper.classList.toggle('has-error', !valid);
      if (errorEl) errorEl.textContent = valid ? '' : result;
      return valid;
    }

    Object.keys(rules).forEach(function (name) {
      var input = form.elements[name];
      if (!input) return;
      input.addEventListener('blur', function () { if (input.value) validateField(input); });
      input.addEventListener('input', function () {
        var wrapper = input.closest('.field');
        if (wrapper.classList.contains('has-error')) validateField(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = true;
      Object.keys(rules).forEach(function (name) {
        if (!validateField(form.elements[name])) valid = false;
      });

      if (!valid) {
        track('form_validation_error', { form_name: 'contato' });
        if (msg) {
          msg.classList.remove('is-success');
          msg.textContent = 'Revise os campos destacados e tente novamente.';
        }
        var firstError = form.querySelector('.has-error input, .has-error textarea');
        if (firstError) firstError.focus();
        return;
      }

      /* ▶ MODO DEMONSTRAÇÃO: nenhum dado é enviado a servidor.
         Para conectar um destino (Formspree, Netlify Forms, e-mail via backend),
         veja as instruções no README.md. */
      track('form_submit', {
        form_name: 'contato',
        form_subject: form.elements.assunto.value.trim()
      });

      if (msg) {
        msg.classList.add('is-success');
        msg.textContent = 'Mensagem enviada! Retorno em até 1 dia útil. Ou fale direto pelo WhatsApp.';
      }
      form.reset();
    });
  }

  /* ---------- 9. Eventos genéricos (CTA, WhatsApp, redes) ---------- */
  function initTracking() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest('[data-gtm]');
      if (!el) return;
      track(el.dataset.gtm, { label: el.dataset.gtmLabel || '' });
    });
  }

  /* ---------- 10. Ano do rodapé ---------- */
  function initYear() {
    var el = document.getElementById('ano');
    if (el) el.textContent = String(new Date().getFullYear());
  }
})();
