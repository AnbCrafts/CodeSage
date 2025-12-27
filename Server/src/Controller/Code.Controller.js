import Groq from "groq-sdk";
import dotenv from "dotenv";
import ApiError from "../Utils/APIError.utility.js";
import asyncHandler from "../Utils/AsyncHandler.utility.js";
import handleResponse from "../Utils/HandleResponse.Utility.js";
import ChatModel from "../Models/Chat.Model.js";
import UserModel from "../Models/User.Model.js";


dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


const extractTitleHint = (code) => {
  const functionMatch =
    code.match(/function\s+([a-zA-Z0-9_]+)/) ||
    code.match(/const\s+([a-zA-Z0-9_]+)\s*=\s*\(/) ||
    code.match(/class\s+([a-zA-Z0-9_]+)/);

  return functionMatch ? functionMatch[1] : "Code Snippet";
};



const cleanLLMResponse = (text) => {
  if (!text) return "";
  return text.replace(/^```[a-z]*\n/i, "").replace(/```$/, "").trim();
};

export const analyzeCode = asyncHandler(async (req, res) => {
  const { code, action, chatId,language,targetLanguage,customPrompt } = req.body;
  // Fallback to body.userId only if middleware fails (unlikely if setup correctly)
  const userId = req.user?._id || req.body.userId; 

  if (!userId) {
    throw new ApiError(401, "You need to login to get the response");
  }

  if (!code) {
    throw new ApiError(400, "No code provided");
  }

  // --- 1. DAILY LIMIT CHECK ---
  const today = new Date().toISOString().split('T')[0];

  // Initialize usage if missing
  if (!req.user.usage) {
     req.user.usage = { date: today, count: 0 };
  }

  if (req.user.usage.date !== today) {
    req.user.usage.date = today;
    req.user.usage.count = 0;
    await req.user.save(); // Save the reset immediately
  }

  if (!req.user.isPro && req.user.usage.count >= 50) {
    return res.status(402).json({
        success: false, 
        message: "Daily limit reached (50/50). Upgrade to Pro for unlimited access."
    });
  }

  // --- 2. SELECT SYSTEM PROMPT ---
  let systemPrompt = "";


 
 switch (action) {
    case "Summarize":
      systemPrompt = `
You are an elite senior software engineer.

Task:
Summarize the following code in **2–3 concise sentences**.

Guidelines:
- Focus on the **overall purpose** of the code.
- Explain **what problem it solves** and **how it does it at a high level**.
- Do NOT explain syntax or go line-by-line.
- Do NOT mention variable names unless essential.
- Assume the reader understands programming basics.

Output style:
- Plain text
- No markdown
- No bullet points
`;

      break;
    case "Explain":
      systemPrompt = `
You are a highly skilled programming tutor.

Task:
Explain the given code in a **clear, step-by-step manner**.

Guidelines:
- Break the explanation into **logical sections**, not just lines.
- Explain **why** things are done, not just what is written.
- Use **simple, non-technical language** where possible.
- After the explanation, provide **1–2 concrete examples**
  showing how the code behaves or how it would be used.
- Assume the reader is a beginner to intermediate developer.

Output style:
- Clear paragraphs
- No unnecessary verbosity
- Examples must be practical and easy to understand
`;

      break;
    case "Suggest":
      systemPrompt = `
You are an experienced senior developer performing a professional code review.

Task:
Analyze the following code and suggest improvements.

Guidelines:
- Focus on:
  • Performance
  • Readability
  • Maintainability
  • Security (if applicable)
  • Best practices
- Suggestions must be **actionable**, not vague.
- If the code is already well-written, clearly state that and explain why.
- Do NOT rewrite the entire code unless necessary.

Output style:
- Bullet points
- Each bullet should describe ONE improvement
- Be honest and critical, but constructive
`;

      break;
    case "Trim":
      systemPrompt = `
You are a strict compiler and refactoring engine.

Task:
Clean and optimize the given code.

Primary instructions:
- Remove:
  • All comments
  • console.log / debug statements
  • Unused variables or imports
  • Redundant whitespace
- Keep the original logic intact.

Secondary instructions:
- If you detect a **small bug or inefficient logic**:
  1. First output the cleaned version of the original code.
  2. Then add a heading exactly as:
     Better Suggestions
  3. Under it, either:
     • Provide a corrected version of the code, OR
     • List the corrections made in bullet points.

Critical rules:
- Do NOT use markdown backticks.
- Do NOT explain unless under "Better Suggestions".
- Output raw code only.
`;
 
      break;
    case "DSA Guide":
      systemPrompt = `
You are a senior DSA instructor, competitive programmer, and code mentor.

Your task is to analyze the given DSA code and transform it into a learning-oriented, self-revisable explanation.

Follow this structure STRICTLY and in the SAME ORDER:

────────────────────────────
1️⃣ PROBLEM HEADING
────────────────────────────
- Add a clear, appropriate heading for the problem.
  Example:
  // Problem: Check if a Number is Prime
  // Problem: Bubble Sort Algorithm
  // Problem: Find GCD using Euclidean Algorithm

────────────────────────────
2️⃣ APPROACH OVERVIEW
────────────────────────────
- Briefly describe the approach used.
- Mention why this approach is chosen.
- Avoid unnecessary theory.

────────────────────────────
3️⃣ TIME & SPACE COMPLEXITY
────────────────────────────
- Clearly state:
  // Time Complexity: O(...)
  // Space Complexity: O(...)
- If any specific line affects complexity, mention it explicitly in comments later.

────────────────────────────
4️⃣ CODE WITH DETAILED COMMENTS
────────────────────────────
- Rewrite the given code with **meaningful comments BETWEEN lines**.
- Comments must answer:
  • Why this loop is needed
  • Why this condition is checked
  • Why this variable exists
  • Why iteration stops at this point
- If a line impacts time/space complexity, highlight it using comments like:
  // ⚠️ This loop contributes to O(n²) time complexity

────────────────────────────
5️⃣ STEP-BY-STEP DRY RUN (EXAMPLE)
────────────────────────────
- Pick ONE meaningful example input.
- Explain execution step-by-step.
- For iterative algorithms, show state changes clearly.
  Example:
  // Step 1: Array = [5, 3, 1]
  // Step 2: After first iteration → [3, 5, 1]
- Keep it sequential and easy to visualize.

────────────────────────────
6️⃣ EDGE CASE TESTS
────────────────────────────
- Provide important test cases where algorithms usually fail.
- Mention WHY each test case is important.
  Example:
  // Edge Case: n = 0 → No elements to process
  // Edge Case: n = 1 → Loop should not execute

────────────────────────────
7️⃣ BETTER APPROACHES (IF ANY)
────────────────────────────
- If a better approach exists:
  Add comments EXACTLY like this:
  // Another approach for better complexity:
  // Algorithm: <name>
  // Time Complexity: O(x)
  // Space Complexity: O(y)
- Do NOT provide code for the alternative approach.

────────────────────────────
8️⃣ FINAL CLEAN CODE (NO COMMENTS)
────────────────────────────
- Output the final optimized version of the SAME code.
- Remove ALL comments.
- Preserve logic exactly.
- This section must contain ONLY code.

CRITICAL RULES:
- Do NOT use markdown backticks.
- Use ONLY comments (//) for explanations.
- Do NOT change the algorithm unless explicitly stated.
- Do NOT add unnecessary theory.
- Output must be readable and revision-friendly.

`;
 
      break;

     case "Custom":
  systemPrompt = `
${customPrompt}
  `;
  break;


       case "Polyglot":
        if (!targetLanguage) throw new ApiError(400, "Target language required for Polyglot action");
  systemPrompt = `
Convert the given code written in ${language} into ${targetLanguage}.
Preserve the exact logic, control flow, data structures, and behavior.
Do not add comments, explanations, or extra text.
Return only valid, clean, executable ${targetLanguage} code.
  `;
  break;


    default:
      throw new ApiError(400, "Invalid action");
  }

  // --- 3. CALL AI ---
  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: code },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.5,
    max_tokens: 2048,
  });

  if (!completion?.choices?.length) {
    throw new ApiError(502, "AI service failed");
  }

  const rawResult = completion.choices[0].message.content;
  const result = cleanLLMResponse(rawResult);

  const titleHint = extractTitleHint(code);
  const title = `${{
    Summarize: "Summary",
    Explain: "Explanation",
    Suggest: "Improvements",
    Trim: "Refactored",
    "DSA Guide": "Explained", // Fix: Use quotes to match the string with space
    "Polyglot": "Converted", // Fix: Use quotes to match the string with space
    "Custom": "Custom Modification", // Fix: Use quotes to match the string with space
}[action] || "Analysis"}: ${titleHint}`.slice(0, 50);

  // --- 4. DATABASE UPDATE LOGIC ---
  let chat;

  if (chatId) {
    // 🔒 Update existing chat
    chat = await ChatModel.findOneAndUpdate(
      { _id: chatId, userId },
      {
        title,
        code,
        action,
        result,
        language
      },
      { new: true }
    );

    if (!chat) {
      throw new ApiError(404, "Chat not found or access denied");
    }
    
    // Increment usage for updates too
    await UserModel.findByIdAndUpdate(userId, { $inc: { "usage.count": 1 } });
    
  } else {
    // 🆕 Create new chat
    chat = await ChatModel.create({
      title,
      userId,
      code,
      action,
      result,
      language
    });

    await UserModel.findByIdAndUpdate(userId, {
      $push: { chats: chat._id },
      $inc: { "usage.count": 1 } 
    });
  }

  // --- 5. SEND RESPONSE (MOVED OUTSIDE) ---
  // Now this runs for BOTH new chats and updates!
  return handleResponse(res, 200, "Code analyzed successfully", {
    chatId: chat._id,
    title,
    action,
    result,
    language
  });
});






