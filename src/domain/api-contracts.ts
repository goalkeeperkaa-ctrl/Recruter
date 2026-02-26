import type { Candidate, CandidateJourney, PipelineStage, Vacancy, Workspace } from './types';

export interface ApiEnvelope<T> {
  ok: boolean;
  data: T;
  error?: string;
}

export interface ListResponse<T> {
  items: T[];
  total: number;
}

export type GetWorkspacesResponse = ApiEnvelope<ListResponse<Workspace>>;
export type GetVacanciesResponse = ApiEnvelope<ListResponse<Vacancy>>;
export type GetCandidatesResponse = ApiEnvelope<ListResponse<Candidate>>;
export type GetPipelineStagesResponse = ApiEnvelope<ListResponse<PipelineStage>>;
export type GetJourneyResponse = ApiEnvelope<CandidateJourney>;

export interface UpsertCandidateRequest {
  vacancyId: string;
  fullName: string;
  phone?: string;
  email?: string;
  city?: string;
  source?: string;
}

export interface UpdatePipelineStageRequest {
  candidateId: string;
  stageId: string;
}

export interface TelegramIntegrationConfig {
  botTokenMasked: string;
  enabled: boolean;
  recipients: Array<{ id: string; type: 'user' | 'group'; title: string }>;
}

export interface AiTelephonyConfig {
  provider: 'mango' | 'mcn' | 'zadarma' | 'custom';
  voice: string;
  latencyBudgetMs: number;
  incomingEnabled: boolean;
  outgoingEnabled: boolean;
}
