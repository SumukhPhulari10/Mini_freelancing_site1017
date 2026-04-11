# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAllSkills*](#listallskills)
  - [*GetCurrentUserProfile*](#getcurrentuserprofile)
- [**Mutations**](#mutations)
  - [*CreateNewJob*](#createnewjob)
  - [*ApplyForJob*](#applyforjob)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAllSkills
You can execute the `ListAllSkills` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllSkills(options?: ExecuteQueryOptions): QueryPromise<ListAllSkillsData, undefined>;

interface ListAllSkillsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllSkillsData, undefined>;
}
export const listAllSkillsRef: ListAllSkillsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllSkills(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllSkillsData, undefined>;

interface ListAllSkillsRef {
  ...
  (dc: DataConnect): QueryRef<ListAllSkillsData, undefined>;
}
export const listAllSkillsRef: ListAllSkillsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllSkillsRef:
```typescript
const name = listAllSkillsRef.operationName;
console.log(name);
```

### Variables
The `ListAllSkills` query has no variables.
### Return Type
Recall that executing the `ListAllSkills` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllSkillsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAllSkillsData {
  skills: ({
    id: UUIDString;
    name: string;
  } & Skill_Key)[];
}
```
### Using `ListAllSkills`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllSkills } from '@dataconnect/generated';


// Call the `listAllSkills()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllSkills();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllSkills(dataConnect);

console.log(data.skills);

// Or, you can use the `Promise` API.
listAllSkills().then((response) => {
  const data = response.data;
  console.log(data.skills);
});
```

### Using `ListAllSkills`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllSkillsRef } from '@dataconnect/generated';


// Call the `listAllSkillsRef()` function to get a reference to the query.
const ref = listAllSkillsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllSkillsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.skills);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.skills);
});
```

## GetCurrentUserProfile
You can execute the `GetCurrentUserProfile` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCurrentUserProfile(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserProfileData, undefined>;

interface GetCurrentUserProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserProfileData, undefined>;
}
export const getCurrentUserProfileRef: GetCurrentUserProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUserProfile(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserProfileData, undefined>;

interface GetCurrentUserProfileRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserProfileData, undefined>;
}
export const getCurrentUserProfileRef: GetCurrentUserProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserProfileRef:
```typescript
const name = getCurrentUserProfileRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUserProfile` query has no variables.
### Return Type
Recall that executing the `GetCurrentUserProfile` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCurrentUserProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserProfile } from '@dataconnect/generated';


// Call the `getCurrentUserProfile()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUserProfile();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUserProfile(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getCurrentUserProfile().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetCurrentUserProfile`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserProfileRef } from '@dataconnect/generated';


// Call the `getCurrentUserProfileRef()` function to get a reference to the query.
const ref = getCurrentUserProfileRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserProfileRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateNewJob
You can execute the `CreateNewJob` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNewJob(vars: CreateNewJobVariables): MutationPromise<CreateNewJobData, CreateNewJobVariables>;

interface CreateNewJobRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewJobVariables): MutationRef<CreateNewJobData, CreateNewJobVariables>;
}
export const createNewJobRef: CreateNewJobRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNewJob(dc: DataConnect, vars: CreateNewJobVariables): MutationPromise<CreateNewJobData, CreateNewJobVariables>;

interface CreateNewJobRef {
  ...
  (dc: DataConnect, vars: CreateNewJobVariables): MutationRef<CreateNewJobData, CreateNewJobVariables>;
}
export const createNewJobRef: CreateNewJobRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNewJobRef:
```typescript
const name = createNewJobRef.operationName;
console.log(name);
```

### Variables
The `CreateNewJob` mutation requires an argument of type `CreateNewJobVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNewJobVariables {
  title: string;
  description: string;
  budget: number;
  status: string;
}
```
### Return Type
Recall that executing the `CreateNewJob` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNewJobData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNewJobData {
  job_insert: Job_Key;
}
```
### Using `CreateNewJob`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNewJob, CreateNewJobVariables } from '@dataconnect/generated';

// The `CreateNewJob` mutation requires an argument of type `CreateNewJobVariables`:
const createNewJobVars: CreateNewJobVariables = {
  title: ..., 
  description: ..., 
  budget: ..., 
  status: ..., 
};

// Call the `createNewJob()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNewJob(createNewJobVars);
// Variables can be defined inline as well.
const { data } = await createNewJob({ title: ..., description: ..., budget: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNewJob(dataConnect, createNewJobVars);

console.log(data.job_insert);

// Or, you can use the `Promise` API.
createNewJob(createNewJobVars).then((response) => {
  const data = response.data;
  console.log(data.job_insert);
});
```

### Using `CreateNewJob`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNewJobRef, CreateNewJobVariables } from '@dataconnect/generated';

// The `CreateNewJob` mutation requires an argument of type `CreateNewJobVariables`:
const createNewJobVars: CreateNewJobVariables = {
  title: ..., 
  description: ..., 
  budget: ..., 
  status: ..., 
};

// Call the `createNewJobRef()` function to get a reference to the mutation.
const ref = createNewJobRef(createNewJobVars);
// Variables can be defined inline as well.
const ref = createNewJobRef({ title: ..., description: ..., budget: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNewJobRef(dataConnect, createNewJobVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.job_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.job_insert);
});
```

## ApplyForJob
You can execute the `ApplyForJob` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
applyForJob(vars: ApplyForJobVariables): MutationPromise<ApplyForJobData, ApplyForJobVariables>;

interface ApplyForJobRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ApplyForJobVariables): MutationRef<ApplyForJobData, ApplyForJobVariables>;
}
export const applyForJobRef: ApplyForJobRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
applyForJob(dc: DataConnect, vars: ApplyForJobVariables): MutationPromise<ApplyForJobData, ApplyForJobVariables>;

interface ApplyForJobRef {
  ...
  (dc: DataConnect, vars: ApplyForJobVariables): MutationRef<ApplyForJobData, ApplyForJobVariables>;
}
export const applyForJobRef: ApplyForJobRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the applyForJobRef:
```typescript
const name = applyForJobRef.operationName;
console.log(name);
```

### Variables
The `ApplyForJob` mutation requires an argument of type `ApplyForJobVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ApplyForJobVariables {
  jobId: UUIDString;
}
```
### Return Type
Recall that executing the `ApplyForJob` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ApplyForJobData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ApplyForJobData {
  application_insert: Application_Key;
}
```
### Using `ApplyForJob`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, applyForJob, ApplyForJobVariables } from '@dataconnect/generated';

// The `ApplyForJob` mutation requires an argument of type `ApplyForJobVariables`:
const applyForJobVars: ApplyForJobVariables = {
  jobId: ..., 
};

// Call the `applyForJob()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await applyForJob(applyForJobVars);
// Variables can be defined inline as well.
const { data } = await applyForJob({ jobId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await applyForJob(dataConnect, applyForJobVars);

console.log(data.application_insert);

// Or, you can use the `Promise` API.
applyForJob(applyForJobVars).then((response) => {
  const data = response.data;
  console.log(data.application_insert);
});
```

### Using `ApplyForJob`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, applyForJobRef, ApplyForJobVariables } from '@dataconnect/generated';

// The `ApplyForJob` mutation requires an argument of type `ApplyForJobVariables`:
const applyForJobVars: ApplyForJobVariables = {
  jobId: ..., 
};

// Call the `applyForJobRef()` function to get a reference to the mutation.
const ref = applyForJobRef(applyForJobVars);
// Variables can be defined inline as well.
const ref = applyForJobRef({ jobId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = applyForJobRef(dataConnect, applyForJobVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.application_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.application_insert);
});
```

