# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { listAllSkills, getCurrentUserProfile, createNewJob, applyForJob } from '@dataconnect/generated';


// Operation ListAllSkills: 
const { data } = await ListAllSkills(dataConnect);

// Operation GetCurrentUserProfile: 
const { data } = await GetCurrentUserProfile(dataConnect);

// Operation CreateNewJob:  For variables, look at type CreateNewJobVars in ../index.d.ts
const { data } = await CreateNewJob(dataConnect, createNewJobVars);

// Operation ApplyForJob:  For variables, look at type ApplyForJobVars in ../index.d.ts
const { data } = await ApplyForJob(dataConnect, applyForJobVars);


```