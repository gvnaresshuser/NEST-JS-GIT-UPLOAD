import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });
  //🧪 STEP 1 — Should transform search (lowercase + trim) ✅
  /*
    Data transformation
    String normalization
    Pipes modifying query params
    */
  it('should transform search to lowercase and trim', () => {
    const input = {
      search: '  NaReSh  ',
      page: 1,
    };

    const result = pipe.transform(input, {} as any);

    expect(result).toEqual({
      search: 'naresh',
      page: 1,
    });
  });
  //🧪 STEP 2 — Should return unchanged if no search ✅
  /*
    🔥 Why this is important?
    if (!value.search) return value;
👉 Pipe should not break other queries
    */
  it('should return value unchanged if no search field', () => {
    const input = {
      page: 1,
    };

    const result = pipe.transform(input, {} as any);

    expect(result).toEqual(input);
  });
  //🧪 STEP 3 — Should NOT mutate original object 🔥 (VERY IMPORTANT)
  /*
    return {
    ...value,
    search: value.search.toLowerCase().trim(),
    };

    👉 This creates new object

    ❌ Bad Practice (mutating)
    value.search = ...
    ✅ Good Practice (immutable)
    { ...value }
    */
  it('should not mutate original object', () => {
    const input = {
      search: '  TEST  ',
    };

    const result = pipe.transform(input, {} as any);

    expect(input.search).toBe('  TEST  '); // original unchanged
    expect(result.search).toBe('test'); // new transformed
  });
});
/*


🏆 FINAL RESULT
| Test             | Purpose |
| ---------------- | ------- |
| transform search | ✅       |
| no search        | ✅       |
| immutability     | 🔥      |

*/
//TEST-RESULT
/*
E:\MURALI\NEST-JS\testproj\src\users\pipes\filter.pipe.spec.ts

pnpm exec jest src/users/pipes/filter.pipe.spec.ts


E:\MURALI\NEST-JS\testproj>pnpm exec jest src/users/pipes/filter.pipe.spec.ts
 PASS  src/users/pipes/filter.pipe.spec.ts
  FilterPipe
    √ should transform search to lowercase and trim (4 ms)
    √ should return value unchanged if no search field (1 ms)
    √ should not mutate original object (1 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.243 s
Ran all test suites matching src/users/pipes/filter.pipe.spec.ts.

E:\MURALI\NEST-JS\testproj>
*/
