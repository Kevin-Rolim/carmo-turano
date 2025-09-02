// admin.js
const loginBox = document.getElementById('loginBox');
const appBox = document.getElementById('app');
const btnLogin = document.getElementById('btnLogin');
const passwordInput = document.getElementById('password');
const loginMsg = document.getElementById('loginMsg');
const btnLogout = document.getElementById('btnLogout');

function setToken(t) { localStorage.setItem('token', t); }
function getToken() { return localStorage.getItem('token'); }
function authHeaders() { return { 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' }; }

async function checkAuth() {
  if (getToken()) {
    loginBox.classList.add('hidden');
    appBox.classList.remove('hidden');
    loadItems();
  } else {
    loginBox.classList.remove('hidden');
    appBox.classList.add('hidden');
  }
}

btnLogin.onclick = async () => {
  const pw = passwordInput.value;
  loginMsg.textContent = 'Entrando...';
  try {
    const res = await fetch('/api/login', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ password: pw })
    });
    if (!res.ok) throw new Error('Senha inválida');
    const data = await res.json();
    setToken(data.token);
    loginMsg.textContent = 'Logado';
    checkAuth();
  } catch (e) {
    loginMsg.textContent = 'Erro: ' + e.message;
  }
};

btnLogout.onclick = () => { localStorage.removeItem('token'); checkAuth(); };

// KV fields
const kvList = document.getElementById('kvList');
const kvKey = document.getElementById('kvKey');
const kvValue = document.getElementById('kvValue');
document.getElementById('addKv').onclick = () => {
  if (!kvKey.value) return alert('Informe o nome do campo');
  const div = document.createElement('div');
  div.className = 'kv';
  div.innerHTML = `<input readonly value="${kvKey.value}" /><input readonly value="${kvValue.value}" /><button>Remover</button>`;
  div.querySelector('button').onclick = () => div.remove();
  kvList.appendChild(div);
  kvKey.value = ''; kvValue.value = '';
};

// criar item
document.getElementById('create').onclick = async () => {
  const type = document.getElementById('type').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const published = document.getElementById('published').checked ? 1 : 0;

  const params = {};
  kvList.querySelectorAll('.kv').forEach(div => {
    const k = div.children[0].value;
    const v = div.children[1].value;
    params[k] = v;
  });

  try {
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ type, title, content, params, published })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Erro');
    }
    const item = await res.json();
    document.getElementById('result').textContent = 'Criado: ID ' + item.id;
    loadItems();
  } catch (e) {
    document.getElementById('result').textContent = 'Erro: ' + e.message;
  }
};

// listar items
async function loadItems() {
  const res = await fetch('/api/items');
  const rows = await res.json();
  const container = document.getElementById('itemsList');
  container.innerHTML = '';
  rows.forEach(r => {
    const el = document.createElement('div');
    el.style.border = '1px solid #ddd';
    el.style.padding = '8px';
    el.style.margin = '6px 0';
    el.innerHTML = `<b>[${r.type}] ${r.title}</b> <br/> ${r.content} <br/> params: ${JSON.stringify(r.params)} <br/>
      <button data-id="${r.id}" class="del">Remover</button>`;
    container.appendChild(el);
  });
  container.querySelectorAll('.del').forEach(b => {
    b.onclick = async () => {
      if (!confirm('Remover registro?')) return;
      const id = b.dataset.id;
      await fetch('/api/items/' + id, { method: 'DELETE', headers: authHeaders() });
      loadItems();
    };
  });
}

checkAuth();
