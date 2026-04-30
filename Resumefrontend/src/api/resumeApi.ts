import axios from 'axios';
import type { AnalysisResponse, ATSScoreResponse, SkillGapResponse } from '../types';

const api = axios.create({ baseURL: '/api/resume' });

export const uploadResume = (file: File) => {
  const form = new FormData();
  form.append('file', file);
  return api.post<{ text: string; filename: string }>('/upload', form);
};

export const analyzeResume = (resumeText: string) =>
  api.post<AnalysisResponse>('/analyze', { resumeText });

export const scoreResume = (resumeText: string) =>
  api.post<ATSScoreResponse>('/score', { resumeText });

export const analyzeSkillGap = (resumeText: string, jobDescription: string) =>
  api.post<SkillGapResponse>('/skill-gap', { resumeText, jobDescription });
