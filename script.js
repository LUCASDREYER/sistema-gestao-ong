const BASE_ID = 'appJTd12gCSL7za9E';
const TOKEN   = 'patOCwFn74O5vgDf3.a64453f9ac814a5b39388a53222a6b9c33e3247d384e1eabec7e293c9e829a0d';
const API     = `https://api.airtable.com/v0/${BASE_ID}`;

const headers = { Authorization: `Bearer ${TOKEN}` };

async function fetchTable(table, params = '') {
  const res = await fetch(`${API}/${encodeURIComponent(table)}${params}`, { headers });
  if (!res.ok) throw new Error(`Erro ao buscar ${table}: ${res.status}`);
  const data = await res.json();
  return data.records;
}

async function loadCards() {
  const [beneficiarios, eventos, inscricoes] = await Promise.all([
    fetchTable('Beneficiários'),
    fetchTable('Eventos'),
    fetchTable('Inscrições'),
  ]);
  document.getElementById('total-beneficiarios').textContent = beneficiarios.length;
  document.getElementById('total-eventos').textContent       = eventos.length;
  document.getElementById('total-inscricoes').textContent    = inscricoes.length;
}

async function loadEventos() {
  const container = document.getElementById('eventos-list');
  const records = await fetchTable('Eventos', '?sort[0][field]=Data&sort[0][direction]=asc');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = records.filter(r => {
    const date = r.fields['Data'] ? new Date(r.fields['Data']) : null;
    return !date || date >= today;
  });

  if (upcoming.length === 0) {
    container.innerHTML = '<p class="placeholder">Nenhum evento próximo.</p>';
    return;
  }

  container.innerHTML = upcoming.map(r => {
    const f = r.fields;
    const date = f['Data']
      ? new Date(f['Data']).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
      : 'Data não definida';
    const tipo     = f['Tipo de evento'] || '';
    const local    = f['Local'] || '';
    const capacidade = f['Capacidade máxima'] != null ? `${f['Capacidade máxima']} vagas` : '';
    const status   = f['Status do evento'] || '';

    return `
      <div class="event-item">
        <div class="event-name">${f['Nome do evento'] || 'Sem nome'}</div>
        <div class="event-meta">${[date, tipo, local, capacidade, status].filter(Boolean).join(' · ')}</div>
      </div>`;
  }).join('');
}

async function loadInscricoes() {
  const container = document.getElementById('inscricoes-list');

  const [inscricoes, beneficiarios, eventos] = await Promise.all([
    fetchTable('Inscrições', '?maxRecords=8'),
    fetchTable('Beneficiários'),
    fetchTable('Eventos'),
  ]);

  const benMap = Object.fromEntries(beneficiarios.map(r => [r.id, r.fields['Nome completo'] || '—']));
  const evMap  = Object.fromEntries(eventos.map(r => [r.id, r.fields['Nome do evento'] || '—']));

  if (inscricoes.length === 0) {
    container.innerHTML = '<p class="placeholder">Nenhuma inscrição registrada.</p>';
    return;
  }

  container.innerHTML = inscricoes.map(r => {
    const f = r.fields;
    const status = (f['Status da inscrição'] || 'Pendente');
    const statusKey = status.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const badgeClass = {
      'confirmada': 'badge-confirmado',
      'pendente':   'badge-pendente',
      'cancelada':  'badge-cancelado',
    }[statusKey] || 'badge-pendente';

    const beneficiario = Array.isArray(f['Beneficiário']) ? (benMap[f['Beneficiário'][0]] || '—') : '—';
    const evento       = Array.isArray(f['Evento'])       ? (evMap[f['Evento'][0]]       || '—') : '—';

    return `
      <div class="reg-item">
        <div class="reg-info">
          <span class="reg-name">${beneficiario}</span>
          <span class="reg-event">${evento}</span>
        </div>
        <span class="badge ${badgeClass}">${status}</span>
      </div>`;
  }).join('');
}

async function init() {
  await Promise.allSettled([loadCards(), loadEventos(), loadInscricoes()]);
}

init();
