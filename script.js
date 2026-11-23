const LEAD_ENDPOINT = 'https://lead-relay.leestygpt.workers.dev/lead/Q7MZ3DKX4B';
const TG_LINK = 'https://t.me/vbdf555';
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const safe = fn => { try { fn(); } catch (e) { console.error(e); } };
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = t => t * t * (3 - 2 * t);

  const bar = $('#bar');
  const fb = () => bar.classList.toggle('show', scrollY > 30);
  addEventListener('scroll', fb, { passive: true }); fb();
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const h = a.getAttribute('href'); if (h.length < 2) return;
    const t = $(h); if (!t) return;
    e.preventDefault();
    scrollTo({ top: t.getBoundingClientRect().top + scrollY - 56, behavior: reduce ? 'auto' : 'smooth' });
  }));

  // ===== разводной мост: два створа, поворот вокруг опор =====
  const PL = 340, PR = 660, LEN = 160, DECK = 322;
  const bridgeSVG = (withDot) => {
    const skyline = '<g class="skyline"><path d="M0 330V268h40v-14h50v22h30v-30h60v36h40v-20h50v30H0z"/><path d="M420 330v-40h40v-18h60v28h30v-34h50v64z"/><path d="M700 330v-30h50v-22h40v26h50v-34h60v38h100v22z"/></g>'
      + '<g class="skyline skyline--b"><path d="M120 330v-52h70v-12h60v64zM560 330v-44h60v-14h50v58z"/><path d="M790 330v-48c0-28 28-40 40-40s40 12 40 40v48z"/></g>'
      + '<path class="spire" d="M630 272V150M624 286l6-14 6 14M180 270v-96M175 270h10"/><circle cx="630" cy="146" r="4" fill="#C89A3C"/>';
    const water = '<rect class="water" x="-20" y="330" width="1040" height="140"/>'
      + '<path class="wave" d="M20 372h80M180 400h90M400 380h100M620 410h90M820 376h90M300 440h70M700 448h80"/><path class="wave" d="M90 420h80M330 392h70M520 428h100M780 430h80M900 400h70"/>'
      + '<g class="boat"><path d="M0 352h58l-8 14H10z" fill="#16222E"/><rect x="18" y="338" width="22" height="14" fill="#33475A"/><rect x="24" y="328" width="6" height="10" fill="#E2552F"/></g>';
    const bank = (x0, x1, flip) => '<rect class="stone" x="' + x0 + '" y="338" width="' + (x1 - x0) + '" height="94"/><rect class="stone2" x="' + x0 + '" y="420" width="' + (x1 - x0) + '" height="14"/>'
      + [0, 1, 2].map(i => { const w = (x1 - x0 - 60) / 3; const cx = x0 + 22 + w * i + w / 2 + (flip ? 14 : 0); return '<path class="arch" d="M' + (cx - w / 2 + 10) + ' 420V382a' + (w / 2 - 10) + ' ' + (w / 2 - 10) + ' 0 0 1 ' + (w - 20) + ' 0V420z"/>'; }).join('');
    const piers = '<rect class="stone2" x="' + (PL - 40) + '" y="338" width="60" height="96"/><rect class="stone2" x="' + (PR - 20) + '" y="338" width="60" height="96"/>';
    const approach = '<rect class="deck" x="0" y="' + DECK + '" width="' + PL + '" height="16"/><rect class="deck" x="' + PR + '" y="' + DECK + '" width="' + (1000 - PR) + '" height="16"/>'
      + '<path class="truss" d="M0 ' + (DECK - 14) + 'H' + (PL - 40) + 'M' + (PR + 40) + ' ' + (DECK - 14) + 'H1000"/>';
    const leaf = (pivot, dir) => {
      const x0 = dir > 0 ? pivot : pivot - LEN, tail = dir > 0 ? pivot - 46 : pivot;
      let tr = '';
      for (let i = 0; i <= 6; i++) { const x = x0 + (LEN / 6) * i; tr += 'M' + x + ' ' + (DECK) + 'V' + (DECK - 16 - (dir > 0 ? (6 - i) : i) * 1.2); }
      return '<g class="leaf" data-d="' + dir + '"><rect class="deck" x="' + x0 + '" y="' + DECK + '" width="' + LEN + '" height="16"/><path class="truss" d="' + tr + 'M' + x0 + ' ' + (DECK - 16) + 'H' + (x0 + LEN) + '"/>'
        + '<rect class="cw" x="' + tail + '" y="' + (DECK) + '" width="46" height="44" rx="3"/><circle class="lampd" cx="' + (dir > 0 ? pivot + LEN : pivot - LEN) + '" cy="' + (DECK - 18) + '" r="4"/></g>';
    };
    let dot = '';
    if (withDot) {
      const ticks = [0, 1, 2, 3, 4, 5].map(i => '<circle class="tick-d" data-i="' + i + '" cx="' + (60 + 840 * i / 5) + '" cy="' + (DECK + 28) + '" r="5"/>').join('');
      const house = '<g class="lampd-g" transform="translate(918 266)"><path d="M0 56V26l22-20 22 20v30z" fill="#fff" stroke="#E2552F" stroke-width="3" stroke-linejoin="round"/><circle cx="22" cy="34" r="5" fill="#E2552F"/><path d="M22 38v12" stroke="#E2552F" stroke-width="3" stroke-linecap="round"/></g>';
      dot = ticks + house + '<g class="you" id="you"><circle class="pulse" r="12"/><circle r="9" fill="#E2552F"/><text y="-18" text-anchor="middle">вы</text></g>';
    }
    return '<rect class="sky" width="1000" height="470"/>' + skyline + water + bank(-10, PL - 40, 0) + bank(PR + 40, 1010, 1) + piers + approach
      + '<g id="LL">' + leaf(PL, 1) + '</g><g id="RL">' + leaf(PR, -1) + '</g>' + dot;
  };
  function mountBridge(svg, withDot) {
    svg.innerHTML = bridgeSVG(withDot);
    const [L, R] = [svg.querySelector('#LL'), svg.querySelector('#RL')];
    [L, R].forEach(g => g.removeAttribute('id'));
    const leaves = [L, R];
    const api = {
      svg,
      angle(a) {
        L.setAttribute('transform', 'rotate(' + (-a).toFixed(2) + ' ' + PL + ' ' + (DECK + 8) + ')');
        R.setAttribute('transform', 'rotate(' + a.toFixed(2) + ' ' + PR + ' ' + (DECK + 8) + ')');
      },
      dot(q) {
        const y = svg.querySelector('#you'); if (!y) return;
        const x = 60 + 840 * q;
        y.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + (DECK - 12) + ')');
        $$('.tick-d', svg).forEach((t, i) => t.classList.toggle('on', i / 5 <= q + 0.001));
      }
    };
    api.angle(0);
    return api;
  }

  // hero: створки дышат, под курсором сводятся
  safe(() => {
    const fig = $('#heroFig'), svg = $('#heroBridge'); if (!svg) return;
    const B = mountBridge(svg, false), cap = $('#heroCap');
    if (reduce) { B.angle(0); cap.textContent = 'мост сведён'; return; }
    let cur = 50, target = 50, near = false, vis = true, lastTxt = '';
    new IntersectionObserver(en => { vis = en[0].isIntersecting; }, { rootMargin: '60px' }).observe(fig);
    const set = n => { near = n; };
    if (matchMedia('(pointer:fine)').matches) { fig.addEventListener('pointerenter', () => set(true)); fig.addEventListener('pointerleave', () => set(false)); }
    fig.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') set(!near); });
    let last = performance.now();
    const loop = now => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (vis) {
        target = near ? 0 : 50 + Math.sin(now / 1400) * 6;
        cur += (target - cur) * (1 - Math.exp(-dt * (near ? 4.5 : 2.2)));
        B.angle(cur);
        const t = cur < 4 ? 'мост сведён' : 'мост разведён';
        if (t !== lastTxt) { cap.textContent = t; lastTxt = t; }
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });

  // сцена: скролл опускает мост, точка идёт к ключам
  safe(() => {
    const scene = $('#path'), svg = $('#sceneBridge'); if (!scene || !svg) return;
    const B = mountBridge(svg, true);
    const STEPS = [
      ['Знакомство', 'Рассказываете, что хотите купить: бюджет, город, срок, ипотека или свои средства. Достаточно пары фраз.'],
      ['Подбор ЖК', 'Подбираем новостройки под бюджет, срок сдачи и район. Мост ещё разведён: пока нет плана, перейти нечем.'],
      ['Условия и ипотека', 'Сверяем предложения застройщиков и варианты ипотеки, считаем ежемесячный платёж. Створки сводятся.'],
      ['Бронирование', 'Выбранную квартиру закрепляем за вами, пока готовятся документы.'],
      ['Сделка', 'Проходим сделку и регистрацию шаг за шагом, вы знаете, что происходит на каждом этапе.'],
      ['Ключи', 'Мост пройден: квартира в Петербурге ваша.']
    ];
    const n = $('#stN'), t = $('#stT'), p = $('#stP'), box = $('#stTxt'), segs = $$('#stBar i');
    let last = -1;
    const apply = pr => {
      B.angle(62 * (1 - ease(clamp(pr / 0.27))));
      const q = clamp(pr / 0.94);
      B.dot(q);
      const st = clamp(Math.round(q * 5), 0, 5);
      if (st !== last) {
        last = st;
        segs.forEach((s, i) => s.classList.toggle('on', i <= st));
        const put = () => { n.textContent = st + 1; t.textContent = STEPS[st][0]; p.textContent = STEPS[st][1]; box.classList.remove('sw'); };
        if (reduce) put(); else { box.classList.add('sw'); setTimeout(put, 160); }
      }
    };
    if (reduce) {
      scene.classList.add('static'); B.angle(0); B.dot(1);
      const sr = $('.sr', scene); if (sr) { sr.style.cssText = 'position:static;width:auto;height:auto;clip:auto;white-space:normal;margin:16px auto 0;max-width:960px;padding:0 var(--gut) 0 calc(var(--gut) + 20px)'; }
      $('.scene__cap', scene).style.display = 'none'; $('.scene__hint', scene).style.display = 'none';
      return;
    }
    let tick = false;
    const upd = () => { tick = false; const r = scene.getBoundingClientRect(); apply(clamp(-r.top / Math.max(1, r.height - innerHeight))); };
    const on = () => { if (!tick) { tick = true; requestAnimationFrame(upd); } };
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on); upd();
  });

  // ===== выбор: что важно =====
  safe(() => {
    const D = {
      ipo: ['Ипотека на паузе', 'Некоторые застройщики предлагают ипотеку, где платежи начинаются не сразу, например «более двух лет без платежей». Условия у каждого ЖК свои и меняются, поэтому сверим актуальные на момент подбора и покажем, где такое предложение действует.'],
      term: ['Срок сдачи', 'Нужно въехать скоро или это покупка на перспективу? От этого зависит, смотреть дома, которые уже сданы или близки к сдаче, либо ЖК на раннем этапе строительства. Подберём варианты под ваш срок.'],
      budget: ['Бюджет', 'Назовите сумму и размер первоначального взноса, если он есть. Подберём ЖК в этих рамках и посчитаем ежемесячный платёж по ипотеке.'],
      city: ['Я не в Петербурге', 'Вы в Москве, Мурманске, Казани, Волгограде или другом городе? Обсудим формат: что можно решить дистанционно, а что потребует поездки, и спланируем всё так, чтобы лишних шагов было меньше.']
    };
    const svg = $('#pickSvg');
    const art = {
      ipo: '<circle cx="60" cy="60" r="44" fill="none" stroke="#4A86A8" stroke-width="3"/><path d="M60 30v30l20 12" stroke="#16222E" stroke-width="4" stroke-linecap="round" fill="none"/><rect x="44" y="12" width="9" height="22" rx="3" fill="#E2552F"/><rect x="67" y="12" width="9" height="22" rx="3" fill="#E2552F"/>',
      term: '<path d="M14 100h92" stroke="#16222E" stroke-width="4" stroke-linecap="round"/><path d="M26 100V64h28v36M62 100V36h32v64" fill="none" stroke="#4A86A8" stroke-width="3.5" stroke-linejoin="round"/><path d="M70 50h16M70 64h16M70 78h16" stroke="#E2552F" stroke-width="4" stroke-linecap="round"/>',
      budget: '<path d="M14 90h92" stroke="#16222E" stroke-width="4" stroke-linecap="round"/><rect x="24" y="62" width="18" height="28" fill="#4A86A8"/><rect x="51" y="44" width="18" height="46" fill="#4A86A8"/><rect x="78" y="22" width="18" height="68" fill="#E2552F"/>',
      city: '<path d="M10 90h30M80 90h30" stroke="#16222E" stroke-width="4" stroke-linecap="round"/><path d="M42 90L56 34M78 90L64 34" stroke="#E2552F" stroke-width="4" stroke-linecap="round"/><path d="M10 104c14-8 24 8 38 0s24 8 38 0 14 4 24 0" stroke="#4A86A8" stroke-width="3" fill="none" stroke-linecap="round"/>'
    };
    const T = $('#pkT'), P = $('#pkP'), body = $('.pick__txt');
    const sel = $('#topic');
    const show = k => {
      T.textContent = D[k][0]; P.textContent = D[k][1]; svg.innerHTML = art[k];
      body.classList.remove('sw'); void body.offsetWidth; if (!reduce) body.classList.add('sw');
      $('#pkBtn').dataset.k = k;
    };
    $$('.pick__tabs [data-k]').forEach(b => b.addEventListener('click', () => {
      $$('.pick__tabs [data-k]').forEach(x => x.setAttribute('aria-selected', x === b ? 'true' : 'false'));
      show(b.dataset.k);
    }));
    $('#pkBtn').addEventListener('click', e => { if (sel) sel.value = e.currentTarget.dataset.k; if (e.currentTarget.dataset.k === 'city') { /* город выберет сам клиент */ } });
    show('ipo');
  });

  // ===== форма =====
  const form = $('#leadForm');
  form && form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]'), orig = btn.textContent, msg = $('#msg');
    const payload = {}; new FormData(form).forEach((v, k) => { payload[k] = v; });
    if (payload._gotcha) return;
    msg.textContent = '';
    if (!payload.name.trim() || !payload.contact.trim()) { msg.textContent = 'Укажите имя и телефон или Telegram.'; return; }
    if (!form.consent.checked) { msg.textContent = 'Отметьте согласие на обработку персональных данных.'; return; }
    const topicTxt = $('#topic').selectedOptions[0].textContent;
    payload.phone = payload.contact;
    payload.comment = 'Город: ' + payload.city + '. Что важно: ' + topicTxt + (payload.comment ? '. ' + payload.comment : '');
    delete payload.consent; delete payload.topic; delete payload.city;
    const tgText = 'Заявка с сайта. Имя: ' + payload.name + '. Контакт: ' + payload.contact + '. ' + payload.comment;
    const tgLink = TG_LINK + '?text=' + encodeURIComponent(tgText);
    btn.disabled = true; btn.textContent = 'Отправляем...';
    const ctrl = new AbortController(), timer = setTimeout(() => ctrl.abort(), 8000);
    try {
      const r = await fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: ctrl.signal });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      msg.textContent = 'Заявка отправлена. Скоро свяжемся.'; form.reset();
    } catch (err) {
      console.error(err);
      msg.textContent = 'Заявка не ушла автоматически. Отправьте её одним касанием в Telegram: ';
      const a = document.createElement('a'); a.href = tgLink; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'отправить в Telegram';
      msg.append(a, '. Текст уже готов, останется нажать «Отправить».');
    } finally {
      clearTimeout(timer); btn.disabled = false; btn.textContent = orig;
    }
  });
})();
