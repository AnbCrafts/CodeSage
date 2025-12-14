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




export const analyzeCode = asyncHandler(async (req, res) => {
  const { code, action,chatId } = req.body;
  const userId = req.user?._id || req.body.userId; 

  if (!userId) {
    throw new ApiError(401, "You need to login to get the response");
  }

  if (!code) {
    throw new ApiError(400, "No code provided");
  }

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
    default:
      throw new ApiError(400, "Invalid action");
  }

  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: code },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.5,
    max_tokens: 1024,
  });

  if (!completion?.choices?.length) {
    throw new ApiError(502, "AI service failed");
  }

  const result = completion.choices[0].message.content;

  const titleHint = extractTitleHint(code);
  const title = `${{
    Summarize: "Summary",
    Explain: "Explanation",
    Suggest: "Improvements",
    Trim: "Refactored",
  }[action]}: ${titleHint}`.slice(0, 50);



let chat;

if (chatId) {
  // 🔒 Update existing chat (only if it belongs to the user)
  chat = await ChatModel.findOneAndUpdate(
    { _id: chatId, userId },
    {
      title,
      code,
      action,
      result,
    },
    { new: true }
  );

  if (!chat) {
    throw new ApiError(404, "Chat not found or access denied");
  }
} else {
  // 🆕 Create new chat
  chat = await ChatModel.create({
    title,
    userId,
    code,
    action,
    result,
  });

  await UserModel.findByIdAndUpdate(userId, {
    $push: { chats: chat._id },
  });
}


  return handleResponse(res, 200, "Code analyzed successfully", {
    chatId: chat._id,
    title,
    action,
    result,
  });
});
