import express from 'express';

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.use(express.json());

type Entity = { id: string; [k: string]: any };

const db = {
  workspaces: [{ id: 'ws_1', name: 'Default Workspace', plan: 'starter' }],
  vacancies: [] as Entity[],
  candidates: [] as Entity[],
  pipelineStages: [
    { id: 'st_1', name: 'Новый', order: 1 },
    { id: 'st_2', name: 'Скрининг', order: 2 },
    { id: 'st_3', name: 'Интервью', order: 3 },
  ],
};

const uid = (p: string) => `${p}_${Math.random().toString(36).slice(2, 9)}`;

app.get('/health', (_req, res) => res.json({ ok: true }));

app.get('/api/workspaces', (_req, res) => {
  res.json({ ok: true, data: { items: db.workspaces, total: db.workspaces.length } });
});

app.get('/api/vacancies', (_req, res) => {
  res.json({ ok: true, data: { items: db.vacancies, total: db.vacancies.length } });
});

app.post('/api/vacancies', (req, res) => {
  const item = { id: uid('vac'), createdAt: new Date().toISOString(), ...req.body };
  db.vacancies.unshift(item);
  res.status(201).json({ ok: true, data: item });
});

app.get('/api/candidates', (_req, res) => {
  res.json({ ok: true, data: { items: db.candidates, total: db.candidates.length } });
});

app.post('/api/candidates', (req, res) => {
  const item = { id: uid('cand'), createdAt: new Date().toISOString(), ...req.body };
  db.candidates.unshift(item);
  res.status(201).json({ ok: true, data: item });
});

app.get('/api/pipeline/stages', (_req, res) => {
  res.json({ ok: true, data: { items: db.pipelineStages, total: db.pipelineStages.length } });
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`[mock-api] listening on :${port}`);
});
