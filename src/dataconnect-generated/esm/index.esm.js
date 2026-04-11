import { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'minifreelancingsite1017',
  location: 'us-east4'
};
export const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
export const listAllSkillsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllSkills');
}
listAllSkillsRef.operationName = 'ListAllSkills';

export function listAllSkills(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAllSkillsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getCurrentUserProfileRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUserProfile');
}
getCurrentUserProfileRef.operationName = 'GetCurrentUserProfile';

export function getCurrentUserProfile(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getCurrentUserProfileRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const createNewJobRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewJob', inputVars);
}
createNewJobRef.operationName = 'CreateNewJob';

export function createNewJob(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createNewJobRef(dcInstance, inputVars));
}

export const applyForJobRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ApplyForJob', inputVars);
}
applyForJobRef.operationName = 'ApplyForJob';

export function applyForJob(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(applyForJobRef(dcInstance, inputVars));
}

