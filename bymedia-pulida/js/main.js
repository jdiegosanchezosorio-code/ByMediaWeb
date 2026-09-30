(() => {
  'use strict';
  const menu = document.getElementById('overlay');
  const button = document.getElementById('menuBtn');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const headerLinks = document.querySelectorAll('.chrome > a');
  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    menu.inert = !open;
    main.inert = open;
    footer.inert = open;
    headerLinks.forEach(a => a.inert = open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) menu.querySelector('a').focus();
    else button.focus();
  }
  button.addEventListener('click', () => setMenu(button.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (button.getAttribute('aria-expanded') !== 'true') return;
    if (e.key === 'Escape') { e.preventDefault(); setMenu(false); }
    if (e.key === 'Tab') {
      const items = [button, ...menu.querySelectorAll('a')];
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {e.preventDefault(); last.focus();}
      else if (!e.shiftKey && document.activeElement === last) {e.preventDefault(); first.focus();}
    }
  });
  const updateProgress = () => {
    const d = document.documentElement;
    const range = d.scrollHeight - d.clientHeight;
    document.getElementById('progress').style.width = (range > 0 ? d.scrollTop / range * 100 : 0) + '%';
  };
  window.addEventListener('scroll', updateProgress, {passive:true});
  window.addEventListener('resize', updateProgress);
  updateProgress();
  document.querySelectorAll('[data-count]').forEach(el => el.textContent = el.dataset.count);
  document.getElementById('year').textContent = new Date().getFullYear();
  const videos = [...document.querySelectorAll('video')];
  videos.forEach(video => video.addEventListener('play', () => videos.forEach(other => { if(other !== video) other.pause(); })));
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  const draft = document.getElementById('emailDraft');
  form.addEventListener('input', () => {draft.hidden = true; note.textContent = '';});
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const body = `Nombre: ${data.get('fname')}\nEmpresa: ${data.get('fcompany')}\nCorreo: ${data.get('femail')}\nTeléfono: ${data.get('fphone')}\n\n${data.get('fmessage')}\n\nHe leído y acepto la política de tratamiento de datos de Bymedia.`;
    draft.href = 'mailto:rsanchez@bymedia.com.co?subject=' + encodeURIComponent('Consulta desde la página de Bymedia') + '&body=' + encodeURIComponent(body);
    draft.hidden = false;
    note.textContent = 'Tu consulta está preparada. Abre tu aplicación de correo para revisarla y enviarla. Aún no se ha enviado ningún mensaje.';
    draft.focus();
  });
})();

(() => {
  const tabs = [...document.querySelectorAll('.solution-tabs [role="tab"]')];
  function selectTab(tab, focus = false) {
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', e => {
      let next;
      if (['ArrowRight','ArrowDown'].includes(e.key)) next = (index + 1) % tabs.length;
      if (['ArrowLeft','ArrowUp'].includes(e.key)) next = (index + tabs.length - 1) % tabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {e.preventDefault();selectTab(tabs[next], true);}
    });
  });
  document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', () => {
    const field = document.getElementById('fmessage');
    if (!field.value.trim()) {field.value = 'Me interesa conocer más sobre ' + link.dataset.interest + '. ';field.dispatchEvent(new Event('input', {bubbles:true}));}
  }));
  document.querySelectorAll('.video-stage').forEach(stage => {
    const video = stage.querySelector('video');
    const cover = stage.querySelector('.video-cover');
    let started = false;
    cover.hidden = false;
    video.controls = false;
    function metadata() {
      if (Number.isFinite(video.duration)) {
        const seconds = Math.floor(video.duration);
        cover.querySelector('.video-duration').textContent = Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2,'0');
        // Display a genuine frame from this video; no invented thumbnail.
        if (!started && video.duration > 0) video.currentTime = Math.min(.5, video.duration / 2);
      }
    }
    video.addEventListener('loadedmetadata', metadata);
    if (video.readyState >= 1) metadata();
    cover.addEventListener('click', async () => {
      started = true;
      video.currentTime = 0;
      video.controls = true;
      stage.classList.add('is-playing');
      try {await video.play();video.focus();}
      catch {stage.classList.remove('is-playing');video.controls = true;cover.hidden = true;}
    });
    video.addEventListener('play', () => {started = true;stage.classList.add('is-playing');video.controls = true;});
    video.addEventListener('ended', () => {stage.classList.remove('is-playing');video.controls = false;cover.hidden = false;});
    video.addEventListener('error', () => {cover.hidden = true;video.controls = true;});
  });
})();
