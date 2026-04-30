export interface AnalysisResponse {
  skills: string[];
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  rawText: string;
}

export interface ATSScoreResponse {
  overallScore: number;
  skillScore: number;
  keywordScore: number;
  experienceScore: number;
  formattingScore: number;
  scoreLabel: 'GOOD' | 'AVERAGE' | 'POOR';
  foundKeywords: string[];
  missingKeywords: string[];
  skillsBreakdown: Record<string, number>;
}

export interface SkillGapResponse {
  matchingSkills: string[];
  missingSkills: string[];
  matchPercentage: number;
  suggestions: string[];
  summary: string;
}
