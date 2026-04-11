import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Application_Key {
  jobId: UUIDString;
  freelancerId: UUIDString;
  __typename?: 'Application_Key';
}

export interface ApplyForJobData {
  application_insert: Application_Key;
}

export interface ApplyForJobVariables {
  jobId: UUIDString;
}

export interface CreateNewJobData {
  job_insert: Job_Key;
}

export interface CreateNewJobVariables {
  title: string;
  description: string;
  budget: number;
  status: string;
}

export interface FreelancerSkill_Key {
  userId: UUIDString;
  skillId: UUIDString;
  __typename?: 'FreelancerSkill_Key';
}

export interface GetCurrentUserProfileData {
  user?: {
    id: UUIDString;
    email: string;
    name: string;
    phone: string;
    userType: string;
    createdAt: TimestampString;
  } & User_Key;
}

export interface JobSkill_Key {
  jobId: UUIDString;
  skillId: UUIDString;
  __typename?: 'JobSkill_Key';
}

export interface Job_Key {
  id: UUIDString;
  __typename?: 'Job_Key';
}

export interface ListAllSkillsData {
  skills: ({
    id: UUIDString;
    name: string;
  } & Skill_Key)[];
}

export interface Skill_Key {
  id: UUIDString;
  __typename?: 'Skill_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface ListAllSkillsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllSkillsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllSkillsData, undefined>;
  operationName: string;
}
export const listAllSkillsRef: ListAllSkillsRef;

export function listAllSkills(options?: ExecuteQueryOptions): QueryPromise<ListAllSkillsData, undefined>;
export function listAllSkills(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllSkillsData, undefined>;

interface GetCurrentUserProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserProfileData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserProfileData, undefined>;
  operationName: string;
}
export const getCurrentUserProfileRef: GetCurrentUserProfileRef;

export function getCurrentUserProfile(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserProfileData, undefined>;
export function getCurrentUserProfile(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserProfileData, undefined>;

interface CreateNewJobRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewJobVariables): MutationRef<CreateNewJobData, CreateNewJobVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewJobVariables): MutationRef<CreateNewJobData, CreateNewJobVariables>;
  operationName: string;
}
export const createNewJobRef: CreateNewJobRef;

export function createNewJob(vars: CreateNewJobVariables): MutationPromise<CreateNewJobData, CreateNewJobVariables>;
export function createNewJob(dc: DataConnect, vars: CreateNewJobVariables): MutationPromise<CreateNewJobData, CreateNewJobVariables>;

interface ApplyForJobRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ApplyForJobVariables): MutationRef<ApplyForJobData, ApplyForJobVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ApplyForJobVariables): MutationRef<ApplyForJobData, ApplyForJobVariables>;
  operationName: string;
}
export const applyForJobRef: ApplyForJobRef;

export function applyForJob(vars: ApplyForJobVariables): MutationPromise<ApplyForJobData, ApplyForJobVariables>;
export function applyForJob(dc: DataConnect, vars: ApplyForJobVariables): MutationPromise<ApplyForJobData, ApplyForJobVariables>;

