import React from 'react';
import { 
  Terminal, Shield, Server, AlertTriangle, Globe, Key, FileJson 
} from 'lucide-react';
import HomeHeader from '../Components/HomeHeader';

const ApiReference = () => {

  const CodeBlock = ({ label, code }) => (
    <div className="bg-[#0f172a] max-w-7xl mx-auto rounded-xl border border-white/10 overflow-hidden font-mono text-sm">
      {label && (
        <div className="px-4 py-2 border-b border-white/5 bg-white/5 text-xs text-slate-400 font-bold uppercase tracking-wider flex justify-between">
          <span>{label}</span>
          <span className="text-slate-600">JSON</span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-slate-300">
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <HomeHeader />

      <div className="max-w-7xl mx-auto pt-28 pb-20 px-6">

        {/* HEADER */}
        <div className="mb-16 border-b border-white/5 pb-8">
          <div className="flex items-center gap-3 text-purple-400 mb-4 font-mono text-sm">
             <Terminal size={18} /> v1.0.0
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            API <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Reference</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            Integrate CodeSage's analysis engine directly into your IDE or workflow. 
            Automate code explanations, trimming, and optimization.
          </p>
          
          <div className="mt-8 flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg max-w-2xl">
            <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" size={20} />
            <div className="text-sm">
              <strong className="text-yellow-500 block mb-1">Public Access Limited</strong>
              <span className="text-slate-400">The public API is currently in beta. Rate limits are strictly enforced (50 req/day for free keys). Endpoints may evolve.</span>
            </div>
          </div>
        </div>

        {/* ================= AUTHENTICATION ================= */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-900 rounded-lg border border-white/10 text-purple-400"><Shield size={20} /></div>
            <h2 className="text-2xl font-bold text-white">Authentication</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
              <p>
                CodeSage uses <strong className="text-white">Bearer Token</strong> authentication. 
                You must include your API key in the <code>Authorization</code> header of every request.
              </p>
              <p>
                Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, etc.
              </p>
              <div className="flex items-center gap-2 mt-4 text-white">
                 <Key size={16} className="text-slate-500" /> 
                 <span>Header format:</span>
              </div>
            </div>
            
            <CodeBlock 
              label="Request Header"
              code={`Authorization: Bearer <YOUR_API_KEY>
Content-Type: application/json`}
            />
          </div>
        </section>

        {/* ================= ENDPOINTS ================= */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-slate-900 rounded-lg border border-white/10 text-blue-400"><Server size={20} /></div>
            <h2 className="text-2xl font-bold text-white">Endpoints</h2>
          </div>

          <div className="space-y-12">
            
            {/* 1. ANALYZE CODE */}
            <div className="group">
               <div className="flex items-center gap-4 mb-4 font-mono text-sm">
                 <span className="px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded font-bold">POST</span>
                 <span className="text-slate-300">/api/analyze</span>
               </div>
               <p className="text-slate-400 mb-6">Sends a code snippet to the AI engine for processing. Returns the analysis based on the requested action.</p>
               
               <div className="grid lg:grid-cols-2 gap-6">
                 <CodeBlock 
                   label="Payload"
                   code={`{
  "code": "const sum = (a,b) => a+b;",
  "action": "Explain", // Options: Explain, Summarize, Suggest, Trim
  "chatId": "optional_id_to_update"
}`}
                 />
                 <CodeBlock 
                   label="Response (200 OK)"
                   code={`{
  "success": true,
  "result": "This is an arrow function that takes two arguments...",
  "chatId": "new_chat_id_123"
}`}
                 />
               </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* 2. GET CHATS */}
            <div className="group">
               <div className="flex items-center gap-4 mb-4 font-mono text-sm">
                 <span className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded font-bold">GET</span>
                 <span className="text-slate-300">/api/user/chats</span>
               </div>
               <p className="text-slate-400 mb-6">Retrieves the authenticated user's chat history, sorted by most recent.</p>
               
               <div className="w-full">
                 <CodeBlock 
                   label="Response (200 OK)"
                   code={`[
  {
    "_id": "651a...",
    "title": "React Component Fix",
    "action": "Suggest",
    "createdAt": "2024-12-16T08:30:00.000Z"
  },
  ...
]`}
                 />
               </div>
            </div>

          </div>
        </section>

        {/* ================= ERROR CODES ================= */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-900 rounded-lg border border-white/10 text-red-400"><AlertTriangle size={20} /></div>
            <h2 className="text-2xl font-bold text-white">Errors</h2>
          </div>

          <div className="border border-white/5 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-slate-400 border-b border-white/5">
                <tr>
                  <th className="p-4 font-bold w-32">Status</th>
                  <th className="p-4 font-bold w-48">Code</th>
                  <th className="p-4 font-bold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr className="bg-slate-950/50">
                  <td className="p-4 font-mono text-red-400">400</td>
                  <td className="p-4 font-mono">BAD_REQUEST</td>
                  <td className="p-4 text-slate-400">Missing required fields (code or action).</td>
                </tr>
                <tr className="bg-slate-950/50">
                  <td className="p-4 font-mono text-red-400">401</td>
                  <td className="p-4 font-mono">UNAUTHORIZED</td>
                  <td className="p-4 text-slate-400">Invalid or missing Bearer token.</td>
                </tr>
                <tr className="bg-slate-950/50">
                  <td className="p-4 font-mono text-red-400">429</td>
                  <td className="p-4 font-mono">RATE_LIMIT</td>
                  <td className="p-4 text-slate-400">Daily request limit exceeded. Upgrade to Pro.</td>
                </tr>
                <tr className="bg-slate-950/50">
                  <td className="p-4 font-mono text-red-400">500</td>
                  <td className="p-4 font-mono">SERVER_ERROR</td>
                  <td className="p-4 text-slate-400">AI Engine failure or internal timeout.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ApiReference;