export type UUID = string;

export type UserRole =
  | 'super_admin'
  | 'hr_manager'
  | 'hiring_manager'
  | 'observer'
  | 'employee_referral'
  | 'candidate';

export interface Workspace {
  id: UUID;
  name: string;
  plan: 'starter' | 'pro' | 'enterprise';
  createdAt: string;
}

export interface Vacancy {
  id: UUID;
  workspaceId: UUID;
  title: string;
  department?: string;
  city?: string;
  salaryFrom?: number;
  salaryTo?: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
}

export interface Candidate {
  id: UUID;
  workspaceId: UUID;
  fullName: string;
  phone?: string;
  email?: string;
  city?: string;
  source?: string;
  matchingScore?: number;
  fraudRisk?: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface PipelineStage {
  id: UUID;
  workspaceId: UUID;
  name: string;
  order: number;
  slaHours?: number;
}

export interface CandidatePipelineState {
  candidateId: UUID;
  vacancyId: UUID;
  stageId: UUID;
  enteredAt: string;
  daysInStage: number;
}

export interface JourneyBlock {
  id: UUID;
  type:
    | 'info'
    | 'video'
    | 'qualification_test'
    | 'video_interview'
    | 'data_form'
    | 'decision'
    | 'redirect';
  title: string;
  config: Record<string, unknown>;
}

export interface CandidateJourney {
  id: UUID;
  workspaceId: UUID;
  vacancyId: UUID;
  version: number;
  isPublished: boolean;
  blocks: JourneyBlock[];
  createdAt: string;
}
