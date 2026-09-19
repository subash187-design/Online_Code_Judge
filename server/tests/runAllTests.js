/**
 * Algomind Online Code Judge — Comprehensive Backend Test Suite
 * Covers:
 * 1. Complexity Analyzer Tests (O(1), O(log N), O(N), O(N log N), O(N^2), O(N^3), O(N*M), O(2^N), sequential, nested, recursion, sorting, unknown)
 * 2. Big-O Simplification Tests
 * 3. Run Custom Execution Tests (exact user program, multiple values, empty input, compilation error, runtime error, TLE, diagnostic stderr)
 * 4. Submit & Stage Progression Tests
 * 5. Authentication & Admin RBAC Tests
 * 6. Database Integrity & API Tests
 */

const http = require('http');
const path = require('path');
const AnalyzerService = require('../src/services/analyzer/analyzer.service');
const JudgeService = require('../src/services/judge.service');
const db = require('../src/config/database');

const BASE_URL = 'http://localhost:5000';

function httpRequest(method, endpoint, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, BASE_URL);
    const reqHeaders = { 'Content-Type': 'application/json', ...headers };
    let payload = null;
    if (body) {
      payload = typeof body === 'string' ? body : JSON.stringify(body);
      reqHeaders['Content-Length'] = Buffer.byteLength(payload);
    }

    const req = http.request({
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: reqHeaders
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch (e) {
          json = data;
        }
        resolve({ status: res.statusCode, body: json });
      });
    });

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ❌ FAIL: ${testName} — ${details}`);
  }
}

async function runComplexityTests() {
  console.log('\n--- 1. Time Complexity Analyzer Tests ---');

  const cases = [
    {
      name: "O(1) Constant computation",
      code: `int main() { int a = 5, b = 10; cout << a + b; return 0; }`,
      expected: "O(1)"
    },
    {
      name: "O(log N) Logarithmic loop (i *= 2)",
      code: `for (int i = 1; i < n; i *= 2) { cout << i; }`,
      expected: "O(log N)"
    },
    {
      name: "O(log N) Logarithmic loop (i /= 2)",
      code: `for (int i = n; i > 0; i /= 2) { cout << i; }`,
      expected: "O(log N)"
    },
    {
      name: "O(log N) Binary search algorithm",
      code: `bool found = binary_search(arr.begin(), arr.end(), target);`,
      expected: "O(log N)"
    },
    {
      name: "O(N) Linear single loop",
      code: `for (int i = 0; i < n; i++) { cout << arr[i]; }`,
      expected: "O(N)"
    },
    {
      name: "O(N) Sequential loops: O(N + N) = O(N)",
      code: `for (int i = 0; i < n; i++) cout << i;
             for (int j = 0; j < n; j++) cout << j;`,
      expected: "O(N)"
    },
    {
      name: "O(N log N) std::sort",
      code: `sort(arr.begin(), arr.end());`,
      expected: "O(N log N)"
    },
    {
      name: "O(N log N) Sorting + sequential linear loop",
      code: `sort(arr.begin(), arr.end());
             for (int i = 0; i < n; i++) cout << arr[i];`,
      expected: "O(N log N)"
    },
    {
      name: "O(N^2) Two nested loops",
      code: `for (int i = 0; i < n; i++) {
               for (int j = 0; j < n; j++) {
                 cout << i + j;
               }
             }`,
      expected: "O(N^2)"
    },
    {
      name: "O(N^2) Two nested loops with multiple internal statements",
      code: `for (int i = 0; i < n; i++) {
               for (int j = 0; j < n; j++) {
                 int x = i + j;
                 int y = x * 2;
                 int z = y - 1;
                 cout << z;
               }
             }`,
      expected: "O(N^2)"
    },
    {
      name: "O(N^2) Dependent inner loop (j < i)",
      code: `for (int i = 0; i < n; i++) {
               for (int j = 0; j < i; j++) {
                 cout << i + j;
               }
             }`,
      expected: "O(N^2)"
    },
    {
      name: "O(N^2) Two Sum structure (cin loop + nested pair search)",
      code: `int main() {
               int n, target;
               if (cin >> n >> target) {
                 vector<long long> nums(n);
                 for (int i = 0; i < n; i++) cin >> nums[i];
                 for (int i = 0; i < n - 1; i++) {
                   for (int j = i + 1; j < n; j++) {
                     if (nums[i] + nums[j] == target) {
                       cout << i << " " << j;
                       return 0;
                     }
                   }
                 }
               }
               return 0;
             }`,
      expected: "O(N^2)"
    },
    {
      name: "O(N^3) Three nested loops",
      code: `for (int i = 0; i < n; i++)
               for (int j = 0; j < n; j++)
                 for (int k = 0; k < n; k++)
                   cout << i + j + k;`,
      expected: "O(N^3)"
    },
    {
      name: "O(N * M) Nested loops over distinct dimensions",
      code: `for (int i = 0; i < n; i++) {
               for (int j = 0; j < m; j++) {
                 cout << i + j;
               }
             }`,
      expected: "O(N * M)"
    },
    {
      name: "O(log N) Halving recursion",
      code: `void solve(int n) {
               if (n <= 1) return;
               solve(n / 2);
             }`,
      expected: "O(log N)"
    },
    {
      name: "O(2^N) Branching binary recursion without memoization",
      code: `int solve(int n) {
               if (n <= 1) return 1;
               return solve(n - 1) + solve(n - 2);
             }`,
      expected: "O(2^N)"
    },
    {
      name: "O(N) Branching recursion with memoization",
      code: `int memo[1000];
             int solve(int n) {
               if (n <= 1) return 1;
               if (memo[n] != -1) return memo[n];
               return memo[n] = solve(n - 1) + solve(n - 2);
             }`,
      expected: "O(N)"
    }
  ];

  for (const tc of cases) {
    const res = AnalyzerService.analyze(tc.code, {}, null);
    assert(
      res.estimatedComplexity === tc.expected,
      tc.name,
      `Got: ${res.estimatedComplexity}, Expected: ${tc.expected}`
    );
    assert(
      res.confidence > 0 && typeof res.reason === 'string' && res.reason.length > 5,
      `${tc.name} — structured fields present (confidence, reason)`,
      `confidence: ${res.confidence}, reason: ${res.reason}`
    );
  }
}

async function runRunCustomTests() {
  console.log('\n--- 2. Run Custom Execution Tests ---');

  // Case 1: Exact User Program
  const exactCode = `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}`;
  const res1 = JudgeService.runCustomInput(exactCode, "10 20");
  assert(res1.verdict === 'SUCCESS', 'Exact User Program verdict is SUCCESS', `Got: ${res1.verdict}`);
  assert(res1.stdout === '30', 'Exact User Program stdout is "30"', `Got: "${res1.stdout}"`);
  assert(res1.stderr === '', 'Exact User Program stderr is empty (no "n" contamination)', `Got: "${res1.stderr}"`);
  assert(res1.execution_time_ms >= 0 && res1.memory_used_kb > 0, 'Exact User Program has valid metrics');

  // Case 2: Multiple Values
  const multiCode = `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        long long val;
        cin >> val;
        sum += val;
    }
    cout << sum;
    return 0;
}`;
  const res2 = JudgeService.runCustomInput(multiCode, "5\n1 2 3 4 5");
  assert(res2.verdict === 'SUCCESS', 'Multiple Values verdict is SUCCESS');
  assert(res2.stdout === '15', 'Multiple Values sum output is "15"', `Got: "${res2.stdout}"`);
  assert(res2.stderr === '', 'Multiple Values stderr is empty');

  // Case 3: Empty Input
  const emptyCode = `#include <iostream>
using namespace std;

int main() {
    int x;
    if (!(cin >> x)) {
        cout << "NO_INPUT";
    } else {
        cout << "GOT: " << x;
    }
    return 0;
}`;
  const res3 = JudgeService.runCustomInput(emptyCode, "");
  assert(res3.verdict === 'SUCCESS', 'Empty input handles properly');
  assert(res3.stdout === 'NO_INPUT', 'Empty input stdout matches expected');

  // Case 4: Compilation Error
  const badSyntax = `int main() { invalid syntax here }`;
  const res4 = JudgeService.runCustomInput(badSyntax, "");
  assert(res4.verdict === 'COMPILATION_ERROR', 'Compilation error detected accurately');
  assert(res4.stderr.length > 0, 'Compilation error message present in stderr');

  // Case 5: Runtime Error (Divide by Zero)
  const divZero = `#include <iostream>
using namespace std;
int main() {
    volatile int a = 10;
    volatile int b = 0;
    int c = a / b;
    cout << c;
    return 0;
}`;
  const res5 = JudgeService.runCustomInput(divZero, "");
  assert(res5.verdict === 'RUNTIME_ERROR', 'Divide by zero detected as RUNTIME_ERROR');

  // Case 6: Time Limit Exceeded (Infinite Loop)
  const infLoop = `#include <iostream>
using namespace std;
int main() {
    while (true) {}
    return 0;
}`;
  const res6 = JudgeService.runCustomInput(infLoop, "", 500);
  assert(res6.verdict === 'TIME_LIMIT_EXCEEDED', 'Infinite loop detected as TIME_LIMIT_EXCEEDED');

  // Case 7: Intentional Diagnostic Stderr (should NOT fail if exit 0)
  const diagCode = `#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cerr << "[DEBUG LOG] Processing input" << endl;
    cout << a * b;
    return 0;
}`;
  const res7 = JudgeService.runCustomInput(diagCode, "6 7");
  assert(res7.verdict === 'SUCCESS', 'Intentional stderr with exit 0 preserves SUCCESS verdict');
  assert(res7.stdout === '42', 'Diagnostic stderr program prints correct stdout "42"');
  assert(res7.stderr.includes('[DEBUG LOG] Processing input'), 'Diagnostic message properly captured in stderr');
}

async function runHttpApiTests() {
  console.log('\n--- 3. Backend HTTP API & Endpoint Tests ---');

  // Health Check
  const healthRes = await httpRequest('GET', '/health');
  assert(healthRes.status === 200 && healthRes.body.status === 'ok', 'GET /health returns 200 OK');

  // Run Custom via API
  const apiRunRes = await httpRequest('POST', '/api/v1/judge/run', {
    language: 'cpp',
    code: `#include <iostream>\nusing namespace std;\nint main() { int a, b; cin >> a >> b; cout << a + b; return 0; }`,
    custom_input: '10 20'
  });
  assert(apiRunRes.status === 200, 'POST /api/v1/judge/run returns HTTP 200');
  assert(apiRunRes.body.verdict === 'SUCCESS', 'API Custom Run verdict is SUCCESS');
  assert(apiRunRes.body.stdout === '30', 'API Custom Run stdout is "30"');
  assert(apiRunRes.body.stderr === '', 'API Custom Run stderr is clean empty string (no "n")');

  // Problems API
  const problemsRes = await httpRequest('GET', '/api/v1/problems');
  assert(problemsRes.status === 200, 'GET /api/v1/problems returns HTTP 200');
  assert(Array.isArray(problemsRes.body) && problemsRes.body.length >= 100, `Problems list has ${problemsRes.body?.length} problems`);

  // Problem Detail API
  const prob3Res = await httpRequest('GET', '/api/v1/problems/3');
  assert(prob3Res.status === 200, 'GET /api/v1/problems/3 returns HTTP 200');
  assert(prob3Res.body.title.includes('Two Sum'), 'Problem 3 is Two Sum');

  // Stages API
  const stagesRes = await httpRequest('GET', '/api/v1/problems/3/stages');
  assert(stagesRes.status === 200, 'GET /api/v1/problems/3/stages returns HTTP 200');
  assert(Array.isArray(stagesRes.body.stages) && stagesRes.body.stages.length >= 2, 'Problem 3 has multi-stage progression');

  // Stage Submission API (Problem 3 Stage 1)
  const stage1 = stagesRes.body.stages[0];
  const stageSubRes = await httpRequest('POST', `/api/v1/stages/${stage1.id}/submissions`, {
    problem_id: 3,
    language: 'cpp',
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n;
    long long target;
    if (cin >> n >> target) {
        vector<long long> nums(n);
        for (int i = 0; i < n; i++) cin >> nums[i];
        for (int i = 0; i < n - 1; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] + nums[j] == target) {
                    cout << i << " " << j << "\\n";
                    return 0;
                }
            }
        }
    }
    return 0;
}`
  });
  assert(stageSubRes.status === 201, 'POST /api/v1/stages/:id/submissions returns HTTP 201');
  assert(stageSubRes.body.verdict === 'ACCEPTED', 'Stage 1 submission verdict is ACCEPTED');
  assert(stageSubRes.body.analysis !== undefined, 'Stage submission returns analysis object');
  assert(stageSubRes.body.analysis.time_complexity === 'O(N^2)', 'Analysis correctly detects O(N^2) for Two Sum brute force');
  assert(stageSubRes.body.analysis.estimatedComplexity === 'O(N^2)', 'Structured estimatedComplexity is O(N^2)');
}

async function runAuthAndAdminTests() {
  console.log('\n--- 4. Authentication & Admin Authorization Tests ---');

  // 1. Unauthorized admin access
  const unauthRes = await httpRequest('POST', '/api/v1/problems', {
    title: 'Test Unauthorized Problem',
    description: 'Should fail'
  });
  assert(unauthRes.status === 401, 'POST /api/v1/problems without token is rejected with 401');

  // 2. Register new user
  const rand = Math.floor(Math.random() * 1000000);
  const testUser = {
    username: `testuser_${rand}`,
    email: `testuser_${rand}@judge.local`,
    password: 'Password123!',
    name: 'Test Runner'
  };
  const regRes = await httpRequest('POST', '/api/v1/auth/register', testUser);
  assert(regRes.status === 201, 'POST /api/v1/auth/register creates user (201)');

  // 3. Login with invalid password
  const badLoginRes = await httpRequest('POST', '/api/v1/auth/login', {
    email: testUser.email,
    password: 'WrongPassword!'
  });
  assert(badLoginRes.status === 401, 'POST /api/v1/auth/login with wrong password returns 401');

  // 4. Login with valid credentials
  // Ensure email_verified = true in DB for testUser
  await db.query('UPDATE users SET email_verified = TRUE WHERE email = $1', [testUser.email]);

  const loginRes = await httpRequest('POST', '/api/v1/auth/login', {
    email: testUser.email,
    password: testUser.password
  });
  assert(loginRes.status === 200, 'POST /api/v1/auth/login returns 200 with JWT token');
  const userToken = loginRes.body.token;

  // 5. Standard user attempting admin route
  const nonAdminPost = await httpRequest('POST', '/api/v1/problems', {
    title: 'Non Admin Problem',
    description: 'Should fail'
  }, { 'Authorization': `Bearer ${userToken}` });
  assert(nonAdminPost.status === 403, 'Standard user attempting admin action returns 403 Forbidden');

  // 6. Promote testUser to ADMIN and test admin problem creation
  await db.query(`UPDATE users SET role = 'ADMIN' WHERE email = $1`, [testUser.email]);
  const adminLoginRes = await httpRequest('POST', '/api/v1/auth/login', {
    email: testUser.email,
    password: testUser.password
  });
  const adminToken = adminLoginRes.body.token;

  const adminCreateRes = await httpRequest('POST', '/api/v1/problems', {
    title: `Admin Created Problem ${rand}`,
    description: 'Testing admin problem creation',
    difficulty: 'EASY',
    topic: 'Arrays & Hashing',
    expected_time_complexity: 'O(N)',
    expected_space_complexity: 'O(1)'
  }, { 'Authorization': `Bearer ${adminToken}` });

  assert(adminCreateRes.status === 201, 'Admin user can create problem (201 Created)');
  const createdProbId = adminCreateRes.body.id;

  // 7. Admin update problem
  const adminUpdateRes = await httpRequest('PUT', `/api/v1/problems/${createdProbId}`, {
    difficulty: 'HARD'
  }, { 'Authorization': `Bearer ${adminToken}` });
  assert(adminUpdateRes.status === 200 && adminUpdateRes.body.difficulty === 'HARD', 'Admin user can update problem');

  // 8. Admin delete problem
  const adminDeleteRes = await httpRequest('DELETE', `/api/v1/problems/${createdProbId}`, null, {
    'Authorization': `Bearer ${adminToken}`
  });
  assert(adminDeleteRes.status === 200, 'Admin user can delete problem');

  // Cleanup test user
  await db.query('DELETE FROM users WHERE email = $1', [testUser.email]);
}

async function runDatabaseIntegrityTests() {
  console.log('\n--- 5. Database Integrity & Model Relationship Tests ---');

  // Check problems count
  const pCount = await db.query('SELECT COUNT(*) FROM problems');
  const totalProbs = parseInt(pCount.rows[0].count, 10);
  assert(totalProbs >= 102, `Database has ${totalProbs} total problems (>= 102)`);

  // Check test cases exist for all problems
  const tcCheck = await db.query(`
    SELECT p.id, p.title, COUNT(tc.id) as tc_count
    FROM problems p
    LEFT JOIN test_cases tc ON p.id = tc.problem_id
    GROUP BY p.id, p.title
    HAVING COUNT(tc.id) = 0
  `);
  assert(tcCheck.rows.length === 0, 'All problems have valid configured test cases');

  // Check problem stages exist for all problems
  const stageCheck = await db.query(`
    SELECT p.id, p.title, COUNT(ps.id) as stage_count
    FROM problems p
    LEFT JOIN problem_stages ps ON p.id = ps.problem_id
    GROUP BY p.id, p.title
    HAVING COUNT(ps.id) = 0
  `);
  assert(stageCheck.rows.length === 0, 'All problems have configured progression stages');
}

async function main() {
  console.log('================================================================');
  console.log('    ALGOMIND ONLINE CODE JUDGE — FULL BACKEND TEST SUITE        ');
  console.log('================================================================');

  try {
    await runComplexityTests();
    await runRunCustomTests();
    await runHttpApiTests();
    await runAuthAndAdminTests();
    await runDatabaseIntegrityTests();

    console.log('\n================================================================');
    console.log(`TEST RESULTS: ${passedTests} passed, ${failedTests} failed, ${totalTests} total`);
    console.log('================================================================');

    if (failedTests > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.error('Fatal error during test suite execution:', err);
    process.exit(1);
  } finally {
    try { await db.pool.end(); } catch (e) {}
  }
}

main();
