# Validators benchmark

### Intro
It is crucial to verify that the user's input matches the business requirements. Validating input data is one of the most common tasks that all software performs in the background.
During my career, I've worked with multiple libraries, all of which serve a similar purpose:  validate if input matches the required criteria.  
A few years ago, I worked on a project that used a library called myzod. I knew zod by that time, but I had never heard of myzod. I looked it up on npmjs and GitHub. It was a small library, with only one person maintaining it. It had over 100 stars and thousands of downloads every month. I was surprised that this library was chosen because other options seemed more popular and stable. I've asked the team members why they picked this particular library — it's for performance, they said. Author of myzod states that their solution is about 25 times faster than zod and 6 times faster than Joi. Those results were benchmarked on Node 13. As of today (November 2023), Node 20 is the latest LTS version of Node.js. Zod and Joi are being actively developed while myzod seems to be less maintained. I've decided to perform my own benchmarks to check if myzod is still a faster option. 

### Tested libraries
* [ajv](https://www.npmjs.com/package/ajv/v/8.12.0) (with [ajv-formats](https://www.npmjs.com/package/ajv-formats/v/2.1.1))
* [joi](https://www.npmjs.com/package/joi/v/17.11.0)
* [yup](https://www.npmjs.com/package/yup/v/1.3.2)
* [zod](https://www.npmjs.com/package/zod/v/3.22.4)
* [myzod](https://www.npmjs.com/package/myzod/v/1.10.2) (with [validator](https://www.npmjs.com/package/validator/v/13.11.0))

One note about the myzod library - it does not have refined string validation built-in: "Myzod is not interested in reimplementing all possible string validations, i.e. isUUID, isEmail, isAlphaNumeric, etc. The myzod string validation can be easily extended via the "withPredicate API". Implemented benchmarks use [validator](https://www.npmjs.com/package/validator) library because it is used in myzod examples.

### Benchmark implementation
Two variants were checked:
1. Validating only the object structure without verifying the actual content (similar to the benchmarks implemented by the myzod team).
2. All actual content is checked against the provided criteria in a more realistic example.

All of the benchmarks were done on a 2020 MacBook Pro with the Apple M1 Chip using Node 20.10.0 and a tool made by Paolo Insogna, [Cronometro](https://www.npmjs.com/package/cronometro/v/1.2.0).
The implementation can be found in the [GitHub repository](https://github.com/mikolajkalwa/nodejs-validator-benchmark).

#### Tested object
```js
export const user = {
  name: {
    first: 'John',
    last: 'Doe'
  },
  login: {
    email: 'john.doe@example.com',
    password: 'dcJERRB28hApdfX3puKHkNaEp2KxMa'
  },
  organization_id: 'e923adb7-67e4-428e-98b5-0799c6e93c6f',
  requested_at: '2023-11-18T19:05:46.760Z'
}
```
In a `types only` scenario, only the object structure is checked and all the end fields need to be of type `string`.
In `comprehensive validation` scenario, it is additionally checked if: 
* `first` name length is between 1 and 999 characters,
* `last` name length is between 1 and 999 characters,
* `email` contains valid email address,
* `password` length is between 12 and 50 characters,
* `organization_id` included valid UUID,
* `requested_at` contains date time satisfying ISO 8601 norm. 

### Results
Cronometro outputs summarized test results in a table. More details can be obtained from the results object using the API. Since the benchmark included 10 000 000 samples and the results were quite stable (worst-case tolerance was ± 0.14 %), I'll focus on the average time needed to validate an object.

#### Types only validation

| **Slower tests** | **Samples** | **Result**        | **Tolerance** |
|------------------|-------------|-------------------|---------------|
| yup              | 10000000    | 120386.86 op/sec  | ± 0.02 %      |
| joi              | 10000000    | 416051.57 op/sec  | ± 0.05 %      |
| zod              | 10000000    | 1177593.99 op/sec | ± 0.07 %      |
| myzod            | 10000000    | 3419450.10 op/sec | ± 0.02 %      |
| **Fastest test** | **Samples** | **Result**        | **Tolerance** |
| ajv              | 10000000    | 1712090.05 op/sec | ± 0.14 %      |

![Time to validate an object](results/types-only.svg)

#### Comprehensive validation

| **Slower tests** | **Samples** | **Result**        | **Tolerance** |
|------------------|-------------|-------------------|---------------|
| yup              | 10000000    | 92300.85 op/sec   | ± 0.02 %      |
| joi              | 10000000    | 115841.40 op/sec  | ± 0.01 %      |
| myzod            | 10000000    | 497036.08 op/sec  | ± 0.02 %      |
| zod              | 10000000    | 834602.92 op/sec  | ± 0.06 %      |
| **Fastest test** | **Samples** | **Result**        | **Tolerance** |
| ajv              | 10000000    | 1712090.05 op/sec | ± 0.06 %      |

![Time to validate an object](results/comprehensive-validation.svg)

In case of only validating the object structure, myzod is about 8 times faster than Joi and almost 3 times faster than zod. However, in case of comprehensive validation, myzod is 4 times faster than Joi and about 2 times slower than zod. I understand that the performance of the validator library greatly influenced the results of this test, but as I mentioned earlier, myzod does not include sophisticated validation methods out of the box.  
Ajv turned to be the fastest to validate object structure, it's almost 5 times faster than myzod, and over 14 times faster than zod. In the case of comprehensive content validation, Ajv is about 2 times faster than zod.

### Conclusions
Results mentioned in the myzod documentation don't meet reality. As of today (November 2023), myzod is only 3 times faster than zod when validating object structure only. When it comes to the actual validation, myzod (with validator) was slower than zod itself. These results suggest that zod got a lot faster over the last 3 years (results mentioned in myzod repo were added there in April 2020). 
Should you use the fastest library? It depends on your needs. If your application requires the processing of thousands of requests per second, I would recommend using Ajv. In other cases, Zod is my favorite solution because it works well with the Typescript ecosystem. Having types generated based on a validation schema helps to avoid code duplication within a project. You only need to change the object schema, and types are automatically changed.
