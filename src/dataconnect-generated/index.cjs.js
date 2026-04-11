const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'minifreelancingsite1017',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
exports.dataConnectSettings = dataConnectSettings;

const listAllSkillsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllSkills');
}
listAllSkillsRef.operationName = 'ListAllSkills';
exports.listAllSkillsRef = listAllSkillsRef;

exports.listAllSkills = function listAllSkills(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAllSkillsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getCurrentUserProfileRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUserProfile');
}
getCurrentUserProfileRef.operationName = 'GetCurrentUserProfile';
exports.getCurrentUserProfileRef = getCurrentUserProfileRef;

exports.getCurrentUserProfile = function getCurrentUserProfile(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getCurrentUserProfileRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const createNewJobRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewJob', inputVars);
}
createNewJobRef.operationName = 'CreateNewJob';
exports.createNewJobRef = createNewJobRef;

exports.createNewJob = function createNewJob(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createNewJobRef(dcInstance, inputVars));
}
;

const applyForJobRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ApplyForJob', inputVars);
}
applyForJobRef.operationName = 'ApplyForJob';
exports.applyForJobRef = applyForJobRef;

exports.applyForJob = function applyForJob(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(applyForJobRef(dcInstance, inputVars));
}
;
