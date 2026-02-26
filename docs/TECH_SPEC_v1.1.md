# Техническое задание — Платформа автоматизации рекрутинга (v1.1)

Дата: 2026-02-26
Статус: Черновик

> Этот файл — рабочая структурированная версия ТЗ для команды разработки и декомпозиции на backlog.

## 1. Продукт
SaaS-платформа полного цикла найма: Candidate Journey, AI-скрининг, AI-телефония, Telegram, job-борды, видеоинтервью, карьерная страница, реферальная программа, AI-инсайты, календарь, антифрод, онбординг.

## 2. MVP scope (как в исходном ТЗ)
- Candidate Journey Builder
- Воронка кандидатов (kanban + bottleneck)
- Telegram интеграция
- AI-телефония
- Job-board интеграции
- Асинхронные видеоинтервью
- AI-скрининг резюме
- Генератор карьерной страницы
- Реферальная программа
- AI-инсайты
- Календарная интеграция
- Антифрод
- Онбординг-чеклист
- Аналитика и отчёты
- Уведомления

## 3. Архитектурные стримы разработки
1. Core Platform (auth, RBAC, multitenant, vacancies, candidates, pipeline)
2. Journey & Candidate Experience
3. Integrations (Telegram, job boards, calendar)
4. AI Stack (matching, insights, telephony NLP)
5. Video stack (recording, storage, transcription)
6. Reporting & BI
7. Security & Compliance (152-ФЗ, audit)

## 4. Технологический baseline
- Frontend: React/Next.js
- Backend: Node (NestJS) + Python AI services
- DB: PostgreSQL
- Queue/Cache: Redis
- Broker: RabbitMQ/Kafka
- Storage: S3-compatible
- Search: Elasticsearch

## 5. Приемочные фокусы
- P95 page load < 2s
- AI telephony latency < 1.5s
- Candidate data -> Telegram delivery < 10s target
- Video available < 60s after recording
- OWASP + RBAC + audit log compliance

## 6. Следующий шаг
Преобразовать это ТЗ в:
- Epics
- User Stories
- Acceptance Criteria
- sprint-by-sprint backlog (20–26 недель)
