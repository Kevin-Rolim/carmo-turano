// server.js
require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');


const app = express();
app.get("/", (req, res) => {
  res.send("Servidor rodando! 🚀");
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const DB_FILE = process.env.DB_FILE || './data.db';
const SECRET = process.env.JWT_SECRET || 'troquesecreta';
const MASTER_PASSWORD = process.env.MASTER_PASSWORD || 'senha123';


// abrir DB
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) console.error('Erro DB:', err);
  else console.log('SQLite pronto em', DB_FILE);
});

// criar tabela se não existir
db.run(`
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT,
  title TEXT,
  content TEXT,
  params TEXT,
  published INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT (datetime('now','localtime')),
  updated_at DATETIME DEFAULT (datetime('now','localtime'))
)
`);

// middleware auth
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Sem token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

// login simples
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (password === MASTER_PASSWORD) {
    const token = jwt.sign({ role: 'master' }, SECRET, { expiresIn: '12h' });
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Senha incorreta' });
});

// criar item (usuário mestre usa o admin)
app.post('/api/items', authMiddleware, (req, res) => {
  const { type, title, content, params = {}, published = 0 } = req.body;
  const paramsStr = JSON.stringify(params);
  const stmt = db.prepare(`INSERT INTO items (type,title,content,params,published) VALUES (?,?,?,?,?)`);
  stmt.run(type, title, content, paramsStr, published, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM items WHERE id = ?', [this.lastID], (err2, row) => {
      if (err2) return res.status(500).json({ error: err2.message });
      row.params = JSON.parse(row.params || '{}');
      res.json(row);
    });
  });
});

// listar items (público)
app.get('/api/items', (req, res) => {
  const { type, published } = req.query;
  let sql = 'SELECT * FROM items';
  const params = [];
  if (type || published !== undefined) {
    sql += ' WHERE ';
    const clauses = [];
    if (type) { clauses.push('type = ?'); params.push(type); }
    if (published !== undefined) { clauses.push('published = ?'); params.push(Number(published)); }
    sql += clauses.join(' AND ');
  }
  sql += ' ORDER BY created_at DESC';
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    rows.forEach(r => { r.params = JSON.parse(r.params || '{}'); });
    res.json(rows);
  });
});

// pegar 1 item
app.get('/api/items/:id', (req, res) => {
  db.get('SELECT * FROM items WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Não encontrado' });
    row.params = JSON.parse(row.params || '{}');
    res.json(row);
  });
});

// atualizar item
app.put('/api/items/:id', authMiddleware, (req, res) => {
  const { type, title, content, params = {}, published } = req.body;
  const paramsStr = JSON.stringify(params);
  db.run(
    `UPDATE items SET type = ?, title = ?, content = ?, params = ?, published = ?, updated_at = datetime('now','localtime') WHERE id = ?`,
    [type, title, content, paramsStr, published ? 1 : 0, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      db.get('SELECT * FROM items WHERE id = ?', [req.params.id], (err2, row) => {
        if (err2) return res.status(500).json({ error: err2.message });
        row.params = JSON.parse(row.params || '{}');
        res.json(row);
      });
    }
  );
});

// deletar
app.delete('/api/items/:id', authMiddleware, (req, res) => {
  db.run('DELETE FROM items WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('API rodando em http://localhost:' + PORT));
