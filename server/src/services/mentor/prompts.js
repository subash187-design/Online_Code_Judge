const SYSTEM_PROMPT = `
You are the AI Code Mentor on an elite competitive programming and computer science learning platform.
Your mission is to guide students to understand, debug, and optimize their algorithmic code using the Socratic method.

ABSOLUTE CONSTRAINTS:
1. NEVER provide full code implementations or working code blocks.
2. Ground all discussions in the provided Static Analysis results. Do not contradict them.
3. If the user asks for the direct solution or says "just give me the code", politely decline and provide an insightful guiding question instead.
4. Keep all responses concise, pedagogical, supportive, and non-patronizing.
5. Your output must strictly adhere to the requested JSON format.
`;

function buildFeedbackPrompt(context) {
  return `
Context:
- Problem: "${context.problem.title}"
- Current Stage: Stage ${context.stage.order_index} (${context.stage.name})
- Target Stage Complexity: Time: ${context.stage.expected_time_complexity || 'N/A'}, Space: ${context.stage.expected_space_complexity || 'N/A'}
- Submission Verdict: ${context.submission.verdict}
- Detected Approach: ${context.analysis.detected_approach}
- Detected Time Complexity: ${context.analysis.time_complexity}
- Detected Space Complexity: ${context.analysis.space_complexity}
- Detected Patterns: ${JSON.stringify(context.analysis.detected_patterns || [])}
- Compiler/Error Output: ${context.submission.compile_output || 'None'}

User C++ Code:
\`\`\`cpp
${context.submission.code}
\`\`\`

Generate structured, non-spoiler mentoring feedback in this exact JSON schema:
{
  "approach": "Brief description of their current approach",
  "complexity": "Detected Time vs Target Time summary",
  "what_you_are_doing_well": "One or two positive, specific implementation choices",
  "what_could_be_improved": "The primary logical flaw or optimization bottleneck (without giving code)",
  "next_goal": "A clear, actionable next milestone for the student to explore"
}
`;
}

function buildHintPrompt(context, hintLevel) {
  return `
The user has requested Hint Level ${hintLevel} of 3 for problem "${context.problem.title}" on Stage ${context.stage.order_index}.
Current Verdict: ${context.submission.verdict}
Current Detected Approach: ${context.analysis.detected_approach}
User Code:
\`\`\`cpp
${context.submission.code}
\`\`\`

Hint Guidelines by Level:
- Level 1: Conceptual direction only. Ask an insightful guiding question to make them reflect.
- Level 2: Technique-level direction. Suggest a data structure, pattern, or mathematical invariant without giving away the steps.
- Level 3: Algorithmic blueprint. Provide a high-level walkthrough in plain English (Step 1, Step 2, Step 3). DO NOT output any C++ code.

Generate the hint in this exact JSON schema:
{
  "hint_level": ${hintLevel},
  "title": "Short title describing the hint focus",
  "content": "The hint guidance text"
}
`;
}

module.exports = { SYSTEM_PROMPT, buildFeedbackPrompt, buildHintPrompt };
