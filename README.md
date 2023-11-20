# Benchmark of validator

### Intro
Validating user input is one of the most common actions that all systems do behind scenes. Verifying if user's provided input matches the business requirements is crucial to ensure correct operations of given software. 
During my career I've been working with multiple libraries - all serve similar purpose - validate if input date matches requiered critiera. 
Few years ago I participated in a project which was using library called myzod. By that time I already knew zod, but I have never heard of myzod. I've quickly looked it up on npmjs and github. This was one of the niche libraries with only one active maintener, with a littlve over 100 stars and couple thousands of download monthly. The choice of this library surprised me, as alternatives seemed to be more popular and stable. I've asked team members what were the reasons for choosing this particular library - performance they said. In the readme file myzod authors states that their solution is about 25 times faster than zod and 6 times faster than Joi (benchamarks were performed on Node 13). 
As of today (November 2023) Node 20, is the LTS version, zod and joi are being actively developed when myzod seems to be not, I've decided to perform my own benchmarks to check if myzod is really that much faster. 

### Benchmark implementation
I've decided to check two variants:
1. Validating only the object structure without validation of the actual content (similar to benchrmarks implemented by myzod team). 
2. A bit more realistic example in which all actual content is checked agains provided criteria.

For the benchmarks, I've decided to use a tool created by Paolo Insogna - cronometro. https://github.com/ShogunPanda/cronometro

### Tested libraries
* ajv
* joi
* valibot
* yup
* zod
* myzod

One note on myzod 

### Results
