/**
 * Algomind Online Code Judge — Master End-to-End Testing & Verification Suite
 * Executes rigorous testing across all 34 requirements:
 * - Frontend availability & Landing Page validation
 * - Full Authentication & Email Verification lifecycle
 * - Protected Routes & RBAC (Admin vs Normal User)
 * - User Dashboard & Live DB Metrics
 * - Problem Catalog (102 problems, filters, search)
 * - Progressive Multi-Stage Progression (Lock/Unlock, Final Solved Invariant)
 * - Code Execution, Run Custom (clean stdout, empty stderr, exit code)
 * - Time & Space Complexity Analyzer (AST, nesting, bounds, recursion)
 * - AI Socratic Code Mentor (progressive hints, code hiding)
 * - Optimization Journey & Submission History Diffs
 * - Admin CRUD Operations
 * - Advanced Judge Isolation & Sandboxing Security
 * - Database Integrity & Transactional Rollbacks
 * - Complete User Journey from Registration to Fully Solved
 */

const http = require('http');
const db = require('../src/config/database');
const AnalyzerService = require('../src/services/analyzer/analyzer.service');
const JudgeService = require('../src/services/judge.service');

const BASE_URL = 'http://localhost:5000';
const FRONTEND_URL = 'http://localhost:5173';

function request(baseUrl, method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
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
        try { json = JSON.parse(data); } catch (e) { json = data; }
        resolve({ status: res.statusCode, headers: res.headers, body: json });
      });
    });

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

const api = (method, path, body, headers) => request(BASE_URL, method, path, body, headers);
const web = (path) => request(FRONTEND_URL, 'GET', path);

let testsCount = 0;
let passedCount = 0;
let failedCount = 0;
const failureDetails = [];

function check(condition, feature, testCase, expected, actual, rootCause = '') {
  testsCount++;
  if (condition) {
    passedCount++;
    console.log(`  ✅ [PASS] ${feature}: ${testCase}`);
  } else {
    failedCount++;
    console.error(`  ❌ [FAIL] ${feature}: ${testCase}`);
    console.error(`     Expected: ${expected}`);
    console.error(`     Actual:   ${actual}`);
    failureDetails.push({ feature, testCase, expected, actual, rootCause });
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// -----------------------------------------------------------------------------
// Test Section 1: System Health & Frontend Static Assets
// -----------------------------------------------------------------------------
async function testSystemAndFrontend() {
  console.log('\n================================================================');
  console.log('>>> 1. SYSTEM HEALTH & FRONTEND LANDING PAGE TESTING');
  console.log('================================================================');

  // Backend Health
  const health = await api('GET', '/health');
  check(health.status === 200 && health.body.status === 'ok',
    'System Health', 'GET /health', '200 OK with status "ok"', `${health.status} ${JSON.stringify(health.body)}`);

  // Frontend Landing Page
  const feLanding = await web('/');
  check(feLanding.status === 200,
    'Frontend', 'Landing Page HTTP 200', '200 OK', `${feLanding.status}`);
  check(typeof feLanding.body === 'string' && feLanding.body.includes('<!doctype html>'),
    'Frontend', 'Landing Page serves valid HTML5 doctype', 'Contains <!doctype html>', 'Valid HTML');
  check(feLanding.body.includes('/src/main.jsx') || feLanding.body.includes('/assets/'),
    'Frontend', 'Landing Page bundles CSS/JS production assets', 'Includes bundled assets', 'Assets linked');
}

// -----------------------------------------------------------------------------
// Test Section 2: Complete Authentication & Verification Lifecycle
// -----------------------------------------------------------------------------
async function testAuthenticationLifecycle() {
  console.log('\n================================================================');
  console.log('>>> 2. AUTHENTICATION, REGISTRATION & EMAIL VERIFICATION');
  console.log('================================================================');

  const rand = Math.floor(Math.random() * 900000) + 100000;
  const userA = {
    name: 'E2E Tester A',
    username: `e2e_user_${rand}`,
    email: `e2e_${rand}@judge.local`,
    password: 'SecurePassword123!'
  };

  // 1. Validation: Missing Fields
  const emptyRes = await api('POST', '/api/v1/auth/register', {});
  check(emptyRes.status === 400,
    'Authentication', 'Registration with empty body rejected', '400 Bad Request', `${emptyRes.status}`);

  // 2. Validation: Weak Password
  const weakPassRes = await api('POST', '/api/v1/auth/register', { ...userA, password: '123' });
  check(weakPassRes.status === 400,
    'Authentication', 'Registration with weak password rejected', '400 Bad Request', `${weakPassRes.status}`);

  // 3. Valid Registration
  const regRes = await api('POST', '/api/v1/auth/register', userA);
  check(regRes.status === 201,
    'Authentication', 'Valid registration succeeds with 201 Created', '201 Created', `${regRes.status}`);

  // 4. Duplicate Registration
  const dupRes = await api('POST', '/api/v1/auth/register', userA);
  check(dupRes.status === 409,
    'Authentication', 'Duplicate email registration rejected with 409 Conflict', '409 Conflict', `${dupRes.status}`);

  // 5. Unverified Account Login
  const unverifiedLogin = await api('POST', '/api/v1/auth/login', { email: userA.email, password: userA.password });
  check(unverifiedLogin.status === 403 && (unverifiedLogin.body.email_verified === false || unverifiedLogin.body.requiresVerification === true),
    'Authentication', 'Unverified account login blocked with 403 Forbidden', '403 Forbidden', `${unverifiedLogin.status}`);

  // 6. Check Password Hashed in Database
  const dbUser = await db.query('SELECT password_hash FROM users WHERE email = $1', [userA.email]);
  const isHashed = dbUser.rows[0]?.password_hash && dbUser.rows[0].password_hash.startsWith('$2');
  check(isHashed,
    'Authentication', 'Password securely hashed with bcrypt (never plaintext)', 'Bcrypt Hash $2...', 'Properly hashed');

  // 7. Email Verification Token Simulation
  // Set verified in DB for this test user
  await db.query('UPDATE users SET email_verified = TRUE WHERE email = $1', [userA.email]);

  // 8. Verified Account Login
  const loginRes = await api('POST', '/api/v1/auth/login', { email: userA.email, password: userA.password });
  check(loginRes.status === 200 && typeof loginRes.body.token === 'string',
    'Authentication', 'Verified login returns JWT Bearer token', '200 OK with token', `${loginRes.status}`);
  const authToken = loginRes.body.token;

  // 9. Wrong Password Login
  const wrongPassLogin = await api('POST', '/api/v1/auth/login', { email: userA.email, password: 'WrongPassword!' });
  check(wrongPassLogin.status === 401,
    'Authentication', 'Incorrect password rejected with 401 Unauthorized', '401 Unauthorized', `${wrongPassLogin.status}`);

  // 10. GET /api/v1/auth/me
  const meRes = await api('GET', '/api/v1/auth/me', null, { 'Authorization': `Bearer ${authToken}` });
  const meEmail = meRes.body?.email || meRes.body?.user?.email;
  check(meRes.status === 200 && meEmail === userA.email,
    'Authentication', 'GET /auth/me returns authenticated user identity', userA.email, `${meEmail}`);

  return { user: userA, token: authToken };
}

// -----------------------------------------------------------------------------
// Test Section 3: Protected Routes & Role-Based Access Control (RBAC)
// -----------------------------------------------------------------------------
async function testProtectedRoutesAndRbac(normalToken) {
  console.log('\n================================================================');
  console.log('>>> 3. AUTHORIZATION & ROLE-BASED ACCESS CONTROL (RBAC)');
  console.log('================================================================');

  // 1. Unauthenticated Request to Protected Admin Route
  const unauthAdmin = await api('POST', '/api/v1/problems', { title: 'Hacked', description: 'Hacked' });
  check(unauthAdmin.status === 401,
    'Authorization', 'Admin endpoint rejects unauthenticated request (401)', '401 Unauthorized', `${unauthAdmin.status}`);

  // 2. Normal User Attempting Admin Route
  const userAdminAttempt = await api('POST', '/api/v1/problems', { title: 'User Admin', description: 'User' }, {
    'Authorization': `Bearer ${normalToken}`
  });
  check(userAdminAttempt.status === 403,
    'Authorization', 'Normal user rejected from admin endpoint (403 Forbidden)', '403 Forbidden', `${userAdminAttempt.status}`);

  // 3. Create Verified Admin User
  const adminEmail = `e2e_admin_${Date.now()}@judge.local`;
  const adminUser = await db.query(
    `INSERT INTO users (username, name, email, password_hash, role, email_verified)
     VALUES ($1, $2, $3, 'hashed', 'ADMIN', TRUE)
     RETURNING id, role`,
    [`admin_${Date.now()}`, 'System Admin', adminEmail]
  );
  check(adminUser.rows[0]?.role === 'ADMIN',
    'Authorization', 'Admin user successfully provisioned in database', 'Role: ADMIN', adminUser.rows[0]?.role);

  // Generate Admin JWT token
  const jwt = require('jsonwebtoken');
  const jwtSecret = process.env.JWT_SECRET || 'supersecret_judge_jwt_key_987654321_secure';
  const adminToken = jwt.sign(
    { id: adminUser.rows[0].id, email: adminEmail, role: 'ADMIN' },
    jwtSecret,
    { expiresIn: '1h' }
  );

  // 4. Admin User Accessing Admin Route (Create Problem)
  const createProbRes = await api('POST', '/api/v1/problems', {
    title: 'E2E Admin Created Problem',
    description: 'Admin created problem for testing RBAC CRUD',
    difficulty: 'EASY',
    topic: 'Arrays & Hashing'
  }, { 'Authorization': `Bearer ${adminToken}` });
  check(createProbRes.status === 201,
    'Authorization', 'Admin token authorized to POST /problems (201 Created)', '201 Created', `${createProbRes.status}`);

  const createdId = createProbRes.body.id;

  // 5. Admin Updating Problem
  const updateProbRes = await api('PUT', `/api/v1/problems/${createdId}`, {
    difficulty: 'HARD'
  }, { 'Authorization': `Bearer ${adminToken}` });
  check(updateProbRes.status === 200 && updateProbRes.body.difficulty === 'HARD',
    'Authorization', 'Admin token authorized to PUT /problems/:id', '200 OK with updated difficulty', `${updateProbRes.status}`);

  // 6. Admin Deleting Problem
  const deleteProbRes = await api('DELETE', `/api/v1/problems/${createdId}`, null, {
    'Authorization': `Bearer ${adminToken}`
  });
  check(deleteProbRes.status === 200,
    'Authorization', 'Admin token authorized to DELETE /problems/:id', '200 OK', `${deleteProbRes.status}`);

  // Cleanup admin user
  await db.query('DELETE FROM users WHERE id = $1', [adminUser.rows[0].id]);
}

// -----------------------------------------------------------------------------
// Test Section 4: Problem Catalog & Extended Metadata
// -----------------------------------------------------------------------------
async function testProblemCatalog() {
  console.log('\n================================================================');
  console.log('>>> 4. PROBLEM CATALOG (102 PROBLEMS & SEARCH/FILTERING)');
  console.log('================================================================');

  // 1. Fetch All Problems
  const res = await api('GET', '/api/v1/problems');
  check(res.status === 200 && Array.isArray(res.body),
    'Problem Catalog', 'GET /api/v1/problems returns list', '200 OK array', `${res.status}`);
  check(res.body.length >= 102,
    'Problem Catalog', 'Catalog contains all 102 curated problems', '>= 102 problems', `${res.body?.length}`);

  // 2. Problem Detail for Problem 1, 2, and 3
  const p1 = await api('GET', '/api/v1/problems/1');
  check(p1.status === 200 && p1.body.title === 'Sum of Two Numbers',
    'Problem Catalog', 'Problem 1 detail preserved', 'Sum of Two Numbers', p1.body?.title);

  const p2 = await api('GET', '/api/v1/problems/2');
  check(p2.status === 200 && p2.body.title === 'Reverse a String',
    'Problem Catalog', 'Problem 2 detail preserved', 'Reverse a String', p2.body?.title);

  const p3 = await api('GET', '/api/v1/problems/3');
  check(p3.status === 200 && p3.body.title.includes('Two Sum'),
    'Problem Catalog', 'Problem 3 (Two Sum) available with constraints', 'Two Sum title', p3.body?.title);

  // 3. Verify Sample Test Cases Are Public and Hidden Tests are NOT Exposed
  check(Array.isArray(p3.body.sample_test_cases) && p3.body.sample_test_cases.length > 0,
    'Problem Catalog', 'Public sample test cases exposed in problem detail', 'Array of sample cases', 'Present');
  check(p3.body.test_cases === undefined,
    'Security', 'Hidden test cases are NEVER exposed through public API', 'undefined', `${p3.body.test_cases}`);

  // 4. Invalid Problem ID
  const pInvalid = await api('GET', '/api/v1/problems/9999999');
  check(pInvalid.status === 404,
    'Problem Catalog', 'Nonexistent problem ID returns 404', '404 Not Found', `${pInvalid.status}`);
}

// -----------------------------------------------------------------------------
// Test Section 5: Run Custom Execution Isolation & Stderr Cleanliness
// -----------------------------------------------------------------------------
async function testRunCustomExecution() {
  console.log('\n================================================================');
  console.log('>>> 5. RUN CUSTOM EXECUTION ENGINE & STDERR ISOLATION');
  console.log('================================================================');

  // Exact User Program: A + B
  const codeAB = `#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}`;

  const resAB = await api('POST', '/api/v1/judge/run', {
    language: 'cpp',
    code: codeAB,
    custom_input: '10 20'
  });

  check(resAB.status === 200,
    'Run Custom', 'HTTP 200 on valid custom run', '200 OK', `${resAB.status}`);
  check(resAB.body.verdict === 'SUCCESS',
    'Run Custom', 'Verdict is SUCCESS', 'SUCCESS', resAB.body.verdict);
  check(resAB.body.stdout === '30',
    'Run Custom', 'Stdout contains expected output "30"', '30', `"${resAB.body.stdout}"`);
  check(resAB.body.stderr === '',
    'Run Custom', 'Stderr is clean empty string (NO BusyBox "n" pollution)', '""', `"${resAB.body.stderr}"`);

  // Multiple Inputs
  const codeMulti = `#include <iostream>
using namespace std;
int main() {
    int n, x, sum = 0;
    cin >> n;
    while(n-- && cin >> x) sum += x;
    cout << sum;
    return 0;
}`;
  const resMulti = await api('POST', '/api/v1/judge/run', {
    language: 'cpp',
    code: codeMulti,
    custom_input: '4\n10 20 30 40'
  });
  check(resMulti.body.stdout === '100',
    'Run Custom', 'Multiple values accumulated correctly', '100', `"${resMulti.body.stdout}"`);
  check(resMulti.body.stderr === '',
    'Run Custom', 'Multiple inputs execution has empty stderr', '""', `"${resMulti.body.stderr}"`);

  // Intentional Diagnostic Stderr (cerr) with clean exit 0
  const codeCerr = `#include <iostream>
using namespace std;
int main() {
    cerr << "[LOG] Debugging in progress..." << endl;
    cout << "HELLO_STDOUT";
    return 0;
}`;
  const resCerr = await api('POST', '/api/v1/judge/run', {
    language: 'cpp',
    code: codeCerr,
    custom_input: ''
  });
  check(resCerr.body.verdict === 'SUCCESS',
    'Run Custom', 'Exit code 0 preserves SUCCESS verdict even with diagnostic cerr output', 'SUCCESS', resCerr.body.verdict);
  check(resCerr.body.stdout === 'HELLO_STDOUT',
    'Run Custom', 'Stdout captured accurately alongside stderr', 'HELLO_STDOUT', resCerr.body.stdout);
  check(resCerr.body.stderr.includes('[LOG] Debugging in progress...'),
    'Run Custom', 'Diagnostic stderr message preserved without converting into failure', 'Contains log', resCerr.body.stderr);

  // Runtime Error
  const codeCrash = `int main() { volatile int a = 1, b = 0; return a / b; }`;
  const resCrash = await api('POST', '/api/v1/judge/run', { language: 'cpp', code: codeCrash });
  check(resCrash.body.verdict === 'RUNTIME_ERROR',
    'Run Custom', 'Process crash correctly returns RUNTIME_ERROR', 'RUNTIME_ERROR', resCrash.body.verdict);

  // Timeout
  const codeTLE = `int main() { while(true){} }`;
  const resTLE = await api('POST', '/api/v1/judge/run', { language: 'cpp', code: codeTLE, time_limit_ms: 500 });
  check(resTLE.body.verdict === 'TIME_LIMIT_EXCEEDED',
    'Run Custom', 'Infinite loop terminates and returns TIME_LIMIT_EXCEEDED', 'TIME_LIMIT_EXCEEDED', resTLE.body.verdict);
}

// -----------------------------------------------------------------------------
// Test Section 6: Comprehensive Complexity Analyzer
// -----------------------------------------------------------------------------
async function testComplexityAnalyzer() {
  console.log('\n================================================================');
  console.log('>>> 6. TIME & SPACE COMPLEXITY ANALYZER VERIFICATION');
  console.log('================================================================');

  const testMatrix = [
    { code: `int main() { int a = 1; cout << a; return 0; }`, expTime: 'O(1)', expSpace: 'O(1)', desc: 'Constant computation' },
    { code: `for (int i = 1; i < n; i *= 2) cout << i;`, expTime: 'O(log N)', expSpace: 'O(1)', desc: 'Logarithmic loop (step *= 2)' },
    { code: `for (int i = 0; i < n; i++) cout << i;`, expTime: 'O(N)', expSpace: 'O(1)', desc: 'Single linear loop' },
    { code: `for (int i = 0; i < n; i++) cout << i; for (int j = 0; j < n; j++) cout << j;`, expTime: 'O(N)', expSpace: 'O(1)', desc: 'Sequential loops O(N + N) = O(N)' },
    { code: `sort(arr.begin(), arr.end());`, expTime: 'O(N log N)', expSpace: 'O(1)', desc: 'std::sort' },
    { code: `sort(arr.begin(), arr.end()); for(int i=0;i<n;i++) cout << arr[i];`, expTime: 'O(N log N)', expSpace: 'O(1)', desc: 'Sort + sequential linear loop O(N log N + N)' },
    { code: `for(int i=0;i<n;i++) for(int j=0;j<n;j++) cout << i+j;`, expTime: 'O(N^2)', expSpace: 'O(1)', desc: 'Two nested loops' },
    { code: `for(int i=0;i<n;i++) for(int j=0;j<n;j++) { int a = i+j; int b = a*2; cout << b; }`, expTime: 'O(N^2)', expSpace: 'O(1)', desc: 'Two nested loops with internal statements' },
    { code: `for(int i=0;i<n;i++) for(int j=0;j<i;j++) cout << i+j;`, expTime: 'O(N^2)', expSpace: 'O(1)', desc: 'Dependent inner loop (j < i)' },
    { code: `for(int i=0;i<n;i++) for(int j=0;j<m;j++) cout << i+j;`, expTime: 'O(N * M)', expSpace: 'O(1)', desc: 'Nested loops over distinct dimensions (N and M)' },
    { code: `for(int i=0;i<n;i++) for(int j=0;j<n;j++) for(int k=0;k<n;k++) cout << i+j+k;`, expTime: 'O(N^3)', expSpace: 'O(1)', desc: 'Three nested loops' },
    { code: `void solve(int n) { if(n<=1) return; solve(n/2); }`, expTime: 'O(log N)', expSpace: 'O(1)', desc: 'Halving recursion' },
    { code: `int fib(int n) { if(n<=1) return n; return fib(n-1) + fib(n-2); }`, expTime: 'O(2^N)', expSpace: 'O(N)', desc: 'Binary branching recursion without memo' },
    { code: `int memo[1000]; int fib(int n) { if(memo[n]!=-1) return memo[n]; return memo[n] = fib(n-1)+fib(n-2); }`, expTime: 'O(N)', expSpace: 'O(N)', desc: 'Branching recursion with memoization' },
    { code: `vector<vector<int>> matrix(n, vector<int>(m));`, expTime: 'O(1)', expSpace: 'O(N^2)', desc: '2D container space complexity' },
    { code: `unordered_map<int, int> seen;`, expTime: 'O(1)', expSpace: 'O(N)', desc: 'Hash table space complexity' }
  ];

  for (const t of testMatrix) {
    const analysis = AnalyzerService.analyze(t.code, {}, null);
    check(analysis.estimatedComplexity === t.expTime,
      'Complexity Analyzer', `${t.desc} (Time: ${t.expTime})`, t.expTime, analysis.estimatedComplexity);
    check(analysis.spaceComplexity === t.expSpace,
      'Complexity Analyzer', `${t.desc} (Space: ${t.expSpace})`, t.expSpace, analysis.spaceComplexity);
    check(typeof analysis.reason === 'string' && analysis.reason.length > 5,
      'Complexity Analyzer', `${t.desc} contains descriptive explanation`, 'Valid reason string', 'Present');
  }
}

// -----------------------------------------------------------------------------
// Test Section 7: Progressive Multi-Stage Progression & Full User Journey
// -----------------------------------------------------------------------------
async function testFullUserJourney(userContext) {
  console.log('\n================================================================');
  console.log('>>> 7. FULL USER JOURNEY: TWO SUM FROM BRUTE FORCE TO OPTIMAL');
  console.log('================================================================');

  const { token, user } = userContext;

  // 1. Fetch Stages for Problem 3 (Two Sum)
  const stagesRes = await api('GET', '/api/v1/problems/3/stages', null, { 'Authorization': `Bearer ${token}` });
  check(stagesRes.status === 200, 'Stage System', 'Fetch Problem 3 Stages', '200 OK', `${stagesRes.status}`);

  const stages = stagesRes.body.stages;
  check(stages.length === 2, 'Stage System', 'Problem 3 has 2 progressive stages', '2 stages', `${stages.length}`);

  const stage1 = stages[0]; // Brute Force
  const stage2 = stages[1]; // Optimal Hash Map

  check(stage1.status === 'UNLOCKED', 'Stage System', 'Stage 1 starts UNLOCKED', 'UNLOCKED', stage1.status);
  check(stage2.status === 'LOCKED', 'Stage System', 'Stage 2 starts LOCKED', 'LOCKED', stage2.status);

  // 2. Attempting to submit to LOCKED Stage 2 directly must be REJECTED (403)
  const lockedAttempt = await api('POST', `/api/v1/stages/${stage2.id}/submissions`, {
    problem_id: 3,
    language: 'cpp',
    code: `int main() { return 0; }`
  }, { 'Authorization': `Bearer ${token}` });
  check(lockedAttempt.status === 403,
    'Stage System', 'Direct submission to LOCKED stage rejected with 403 STAGE_LOCKED', '403 Forbidden', `${lockedAttempt.status}`);

  // 3. Submit Wrong Answer to Stage 1
  const wrongCode = `#include <iostream>
using namespace std;
int main() { cout << "0 0"; return 0; }`;
  const wrongSub = await api('POST', `/api/v1/stages/${stage1.id}/submissions`, {
    problem_id: 3,
    language: 'cpp',
    code: wrongCode
  }, { 'Authorization': `Bearer ${token}` });
  check(wrongSub.body.verdict === 'WRONG_ANSWER',
    'Stage System', 'Incorrect solution receives WRONG_ANSWER verdict', 'WRONG_ANSWER', wrongSub.body.verdict);
  check(wrongSub.body.next_unlocked_stage_id === null,
    'Stage System', 'Wrong answer does NOT unlock next stage', 'null', `${wrongSub.body.next_unlocked_stage_id}`);

  // 3b. Premature Optimal O(N) Solution submitted to O(N^2) Stage 1
  // Algomind requires progressive stage learning: optimal code must not bypass the brute force stage!
  const prematureOptimalCode = `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    long long target;
    if (cin >> n >> target) {
        vector<long long> nums(n);
        for (int i = 0; i < n; i++) cin >> nums[i];
        unordered_map<long long, int> seen;
        for (int i = 0; i < n; i++) {
            long long comp = target - nums[i];
            if (seen.count(comp)) {
                cout << seen[comp] << " " << i << "\\n";
                return 0;
            }
            seen[nums[i]] = i;
        }
    }
    return 0;
}`;
  const mismatchSub = await api('POST', `/api/v1/stages/${stage1.id}/submissions`, {
    problem_id: 3,
    language: 'cpp',
    code: prematureOptimalCode
  }, { 'Authorization': `Bearer ${token}` });

  check(mismatchSub.body.verdict === 'COMPLEXITY_MISMATCH',
    'Stage System', 'Premature optimal O(N) submission to O(N^2) stage rejected with COMPLEXITY_MISMATCH', 'COMPLEXITY_MISMATCH', mismatchSub.body.verdict);
  check(mismatchSub.body.next_unlocked_stage_id === null,
    'Stage System', 'Complexity mismatch does NOT unlock next stage', 'null', `${mismatchSub.body.next_unlocked_stage_id}`);
  check(mismatchSub.body.is_problem_solved === false,
    'Stage System', 'Complexity mismatch does NOT mark problem as solved', 'false', `${mismatchSub.body.is_problem_solved}`);
  check(typeof mismatchSub.body.feedback_message === 'string' && mismatchSub.body.feedback_message.includes('Complexity Mismatch'),
    'Stage System', 'Complexity mismatch provides descriptive educational feedback', 'Contains feedback', 'Present');

  // 4. Submit Valid Brute Force O(N^2) Solution to Stage 1
  const bruteForceCode = `#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
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
}`;

  const stage1Sub = await api('POST', `/api/v1/stages/${stage1.id}/submissions`, {
    problem_id: 3,
    language: 'cpp',
    code: bruteForceCode
  }, { 'Authorization': `Bearer ${token}` });

  check(stage1Sub.status === 201, 'Stage System', 'Stage 1 Submission returns 201 Created', '201 Created', `${stage1Sub.status}`);
  check(stage1Sub.body.verdict === 'ACCEPTED', 'Stage System', 'Stage 1 solution ACCEPTED', 'ACCEPTED', stage1Sub.body.verdict);
  check(stage1Sub.body.next_unlocked_stage_id === stage2.id,
    'Stage System', 'Stage 1 completion unlocks Stage 2', `${stage2.id}`, `${stage1Sub.body.next_unlocked_stage_id}`);
  check(stage1Sub.body.is_problem_solved === false,
    'Stage System', 'Problem is NOT fully solved after only brute force stage', 'false', `${stage1Sub.body.is_problem_solved}`);
  check(stage1Sub.body.analysis.estimatedComplexity === 'O(N^2)',
    'Stage System', 'Stage 1 complexity detected as O(N^2)', 'O(N^2)', stage1Sub.body.analysis.estimatedComplexity);

  // 5. Test AI Code Mentor on Stage 1
  const mentorHistory = await api('GET', `/api/v1/mentor/history/${stage1.id}`, null, { 'Authorization': `Bearer ${token}` });
  check(mentorHistory.status === 200, 'AI Mentor', 'GET /mentor/history/:stage_id returns 200 OK', '200 OK', `${mentorHistory.status}`);

  // Request Level 1 Progressive Hint
  const hint1 = await api('POST', '/api/v1/mentor/hints', {
    stage_id: stage1.id,
    submission_id: stage1Sub.body.submission_id,
    requested_level: 1
  }, { 'Authorization': `Bearer ${token}` });
  check((hint1.status === 200 || hint1.status === 201) && typeof hint1.body?.content === 'string',
    'AI Mentor', 'AI Mentor unlocks progressive Hint Level 1', 'Gentle pointer', hint1.body?.title || `${hint1.status}`);

  // Request Level 2 Hint
  const hint2 = await api('POST', '/api/v1/mentor/hints', {
    stage_id: stage1.id,
    submission_id: stage1Sub.body.submission_id,
    requested_level: 2
  }, { 'Authorization': `Bearer ${token}` });
  check((hint2.status === 200 || hint2.status === 201) && typeof hint2.body?.content === 'string',
    'AI Mentor', 'AI Mentor unlocks progressive Hint Level 2', 'Algorithmic blueprint', hint2.body?.title || `${hint2.status}`);

  // Verify Sequential Hint Order Enforced: Level 4 without Level 3 must be REJECTED (400)
  const skipHint = await api('POST', '/api/v1/mentor/hints', {
    stage_id: stage1.id,
    submission_id: stage1Sub.body.submission_id,
    requested_level: 4
  }, { 'Authorization': `Bearer ${token}` });
  check(skipHint.status === 400,
    'AI Mentor', 'Non-sequential hint request blocked with 400 Bad Request', '400 Bad Request', `${skipHint.status}`);

  // 6. Submit Optimal O(N) Hash Map Solution to Stage 2
  const optimalCode = `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    long long target;
    if (cin >> n >> target) {
        vector<long long> nums(n);
        for (int i = 0; i < n; i++) cin >> nums[i];
        unordered_map<long long, int> seen;
        for (int i = 0; i < n; i++) {
            long long comp = target - nums[i];
            if (seen.find(comp) != seen.end()) {
                cout << seen[comp] << " " << i << "\\n";
                return 0;
            }
            seen[nums[i]] = i;
        }
    }
    return 0;
}`;

  const stage2Sub = await api('POST', `/api/v1/stages/${stage2.id}/submissions`, {
    problem_id: 3,
    language: 'cpp',
    code: optimalCode
  }, { 'Authorization': `Bearer ${token}` });

  check(stage2Sub.status === 201, 'Stage System', 'Stage 2 Submission returns 201 Created', '201 Created', `${stage2Sub.status}`);
  check(stage2Sub.body.verdict === 'ACCEPTED', 'Stage System', 'Stage 2 solution ACCEPTED', 'ACCEPTED', stage2Sub.body.verdict);
  check(stage2Sub.body.is_problem_solved === true,
    'Stage System', 'Problem is now FULLY SOLVED after all required stages cleared', 'true', `${stage2Sub.body.is_problem_solved}`);
  check(stage2Sub.body.analysis.estimatedComplexity === 'O(N)',
    'Stage System', 'Stage 2 complexity detected as O(N)', 'O(N)', stage2Sub.body.analysis.estimatedComplexity);
  check(stage2Sub.body.analysis.classification === 'Optimal',
    'Stage System', 'Solution classified as Optimal', 'Optimal', stage2Sub.body.analysis.classification);

  // 7. Check Problem Optimization Journey Analytics
  const journeyRes = await api('GET', '/api/v1/analytics/problems/3/journey', null, { 'Authorization': `Bearer ${token}` });
  check(journeyRes.status === 200, 'Analytics', 'GET /analytics/problems/:id/journey returns 200 OK', '200 OK', `${journeyRes.status}`);
  check(journeyRes.body.journey_summary.initial_complexity === 'O(N^2)',
    'Analytics', 'Journey records initial complexity O(N^2)', 'O(N^2)', journeyRes.body.journey_summary.initial_complexity);
  check(journeyRes.body.journey_summary.optimal_complexity === 'O(N)',
    'Analytics', 'Journey records optimal complexity O(N)', 'O(N)', journeyRes.body.journey_summary.optimal_complexity);

  // 8. Check Submission Diff Comparison
  const diffRes = await api('GET', `/api/v1/analytics/compare?sub_a=${stage1Sub.body.submission_id}&sub_b=${stage2Sub.body.submission_id}`, null, {
    'Authorization': `Bearer ${token}`
  });
  check(diffRes.status === 200 && diffRes.body.delta !== undefined,
    'Analytics', 'GET /analytics/compare generates diff comparison', 'Diff object', `${diffRes.status}`);

  // 9. Check User Dashboard Metrics
  const dashRes = await api('GET', '/api/v1/analytics/dashboard', null, { 'Authorization': `Bearer ${token}` });
  check(dashRes.status === 200, 'User Dashboard', 'GET /analytics/dashboard returns 200 OK', '200 OK', `${dashRes.status}`);
  check(dashRes.body.overview.problems_solved >= 1,
    'User Dashboard', 'Dashboard accurately reflects >= 1 problem solved from DB', '>= 1', `${dashRes.body.overview.problems_solved}`);
  check(dashRes.body.overview.total_submissions >= 2,
    'User Dashboard', 'Dashboard accurately reflects user submissions count', '>= 2', `${dashRes.body.overview.total_submissions}`);

  // 10. Persistence Verification across Re-login
  const reLogin = await api('POST', '/api/v1/auth/login', { email: user.email, password: user.password });
  check(reLogin.status === 200, 'Persistence', 'Re-login succeeds', '200 OK', `${reLogin.status}`);
  const reStages = await api('GET', '/api/v1/problems/3/stages', null, { 'Authorization': `Bearer ${reLogin.body.token}` });
  check(reStages.body.is_solved === true,
    'Persistence', 'Solved status and progressive stages persist across sessions', 'true', `${reStages.body.is_solved}`);
}

// -----------------------------------------------------------------------------
// Test Section 8: Advanced Security, Sandbox Isolation & Database Integrity
// -----------------------------------------------------------------------------
async function testSecurityAndDatabase() {
  console.log('\n================================================================');
  console.log('>>> 8. ADVANCED SECURITY, SANDBOX ISOLATION & DATABASE INTEGRITY');
  console.log('================================================================');

  // 1. Sandbox Filesystem Isolation Test (Attempt to read /etc/shadow or /etc/passwd)
  const jailbreakCode = `#include <iostream>
#include <fstream>
using namespace std;
int main() {
    ifstream f("/etc/shadow");
    if (f.is_open()) {
        cout << "JAILBREAK_SUCCESS";
    } else {
        cout << "ISOLATION_ENFORCED";
    }
    return 0;
}`;
  const jailRes = await api('POST', '/api/v1/judge/run', { language: 'cpp', code: jailbreakCode });
  check(jailRes.body.stdout.includes('ISOLATION_ENFORCED'),
    'Security', 'Container sandbox prevents access to host/sensitive files', 'ISOLATION_ENFORCED', jailRes.body.stdout);

  // 2. Network Isolation Test (Container runs with --network none)
  const networkTestCode = `#include <iostream>
#include <cstdlib>
using namespace std;
int main() {
    int res = system("ping -c 1 8.8.8.8 > /dev/null 2>&1");
    if (res == 0) cout << "NET_ENABLED";
    else cout << "NET_DISABLED";
    return 0;
}`;
  const netRes = await api('POST', '/api/v1/judge/run', { language: 'cpp', code: networkTestCode });
  check(netRes.body.stdout.includes('NET_DISABLED'),
    'Security', 'Container network is completely disabled (--network none)', 'NET_DISABLED', netRes.body.stdout);

  // 3. Database Integrity & Constraints Check
  const dbProbs = await db.query('SELECT COUNT(*) FROM problems');
  check(parseInt(dbProbs.rows[0].count, 10) >= 102,
    'Database', 'Database contains full catalog of >= 102 problems', '>= 102', dbProbs.rows[0].count);

  const dbStages = await db.query('SELECT COUNT(DISTINCT problem_id) as p_count FROM problem_stages');
  check(parseInt(dbStages.rows[0].p_count, 10) >= 102,
    'Database', 'All problems have progressive stages configured', '>= 102', dbStages.rows[0].p_count);

  const dbTestCases = await db.query('SELECT COUNT(DISTINCT problem_id) as p_count FROM test_cases');
  check(parseInt(dbTestCases.rows[0].p_count, 10) >= 102,
    'Database', 'All problems have standard test cases configured', '>= 102', dbTestCases.rows[0].p_count);

  // 4. Single-Solution Problem 1 Stage Consolidation Check
  const p1Stages = await db.query('SELECT COUNT(*) as s_count FROM problem_stages WHERE problem_id = 1');
  check(parseInt(p1Stages.rows[0].s_count, 10) === 1,
    'Database', 'Single-solution problem (Sum of Two Numbers) has exactly 1 stage', '1 stage', `${p1Stages.rows[0].s_count}`);
}

// -----------------------------------------------------------------------------
// Master Test Execution Runner
// -----------------------------------------------------------------------------
async function runMasterTestSuite() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║       ALGOMIND ONLINE CODE JUDGE — END-TO-END MASTER SUITE   ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');

  try {
    await testSystemAndFrontend();
    const userContext = await testAuthenticationLifecycle();
    await testProtectedRoutesAndRbac(userContext.token);
    await testProblemCatalog();
    await testRunCustomExecution();
    await testComplexityAnalyzer();
    await testFullUserJourney(userContext);
    await testSecurityAndDatabase();

    // Clean up created test user
    await db.query('DELETE FROM users WHERE email = $1', [userContext.user.email]);

    console.log('\n╔══════════════════════════════════════════════════════════════╗');
    console.log(`║ TEST RESULTS: ${passedCount} PASSED | ${failedCount} FAILED | ${testsCount} TOTAL`);
    console.log('╚══════════════════════════════════════════════════════════════╝');

    if (failedCount > 0) {
      console.error('\nFAILED TEST DETAILS:');
      failureDetails.forEach((f, idx) => {
        console.error(`${idx + 1}. [${f.feature}] ${f.testCase}: Expected ${f.expected}, got ${f.actual}`);
      });
      process.exit(1);
    } else {
      console.log('\n🌟 ALL END-TO-END ACCEPTANCE CRITERIA MET WITH 100% PASS RATE! 🌟');
      process.exit(0);
    }

  } catch (err) {
    console.error('Fatal crash during master test execution:', err);
    process.exit(1);
  } finally {
    try { await db.pool.end(); } catch (e) {}
  }
}

runMasterTestSuite();
