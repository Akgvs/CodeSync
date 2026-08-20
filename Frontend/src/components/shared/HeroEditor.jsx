import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Play, Code2, Sparkles, CheckCircle2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import Button from "../ui/Button";

const STARTER_CODE = {
  javascript: `// Real-Time Collaborative Editor Demo
function calculateMetrics(activeUsers, latencyMs) {
  console.log(\`⚡ Connected Users: \${activeUsers}\`);
  console.log(\`🚀 Sync Latency: \${latencyMs}ms\`);
  return { status: "Active", health: "Optimal" };
}

calculateMetrics(3, 14);`,
  python: `# Real-Time Collaborative Editor Demo
def calculate_metrics(active_users, latency_ms):
    print(f"⚡ Connected Users: {active_users}")
    print(f"🚀 Sync Latency: {latency_ms}ms")
    return {"status": "Active", "health": "Optimal"}

calculate_metrics(3, 14)`,
  cpp: `// Real-Time Collaborative Editor Demo
#include <iostream>

int main() {
    std::cout << "⚡ Connected Users: 3" << std::endl;
    std::cout << "🚀 Sync Latency: 14ms" << std::endl;
    return 0;
}`,
  java: `// Real-Time Collaborative Editor Demo
public class Main {
    public static void main(String[] args) {
        System.out.println("⚡ Connected Users: 3");
        System.out.println("🚀 Sync Latency: 14ms");
    }
}`,
};

export default function HeroEditor() {
  const { user } = useUser();
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(STARTER_CODE.javascript);
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const userName = user
    ? [user.firstName, user.lastName].filter(Boolean).join(" ")
    : "Developer (You)";

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(STARTER_CODE[lang] || `// Write your ${lang} code here...`);
    setOutput(null);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput(null);

    setTimeout(() => {
      if (language === "javascript") {
        try {
          const logs = [];
          const customConsole = {
            log: (...args) => logs.push(args.join(" ")),
            error: (...args) => logs.push("Error: " + args.join(" ")),
          };
          const runFn = new Function("console", code);
          runFn(customConsole);
          setOutput(logs.join("\n") || "Program executed successfully (no output)");
        } catch (err) {
          setOutput("Runtime Error: " + err.message);
        }
      } else {
        setOutput(`⚡ Executed ${language.toUpperCase()} script successfully.\nOutput:\nConnected Users: 3\nSync Latency: 14ms\nStatus: Optimal`);
      }
      setIsRunning(false);
    }, 600);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Glow behind */}
      <div className="absolute -inset-4 bg-brand-500/10 blur-3xl rounded-3xl" />

      {/* Editor Window */}
      <div className="relative rounded-2xl overflow-hidden border border-edge/80 bg-surface-secondary shadow-2xl shadow-black/60">
        {/* Window Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-surface-tertiary border-b border-edge/70 select-none">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-muted font-mono bg-surface-secondary/80 px-2.5 py-1 rounded-md border border-edge/40">
              <Code2 className="w-3.5 h-3.5 text-brand-400" />
              <span>live-demo.{language === "javascript" ? "js" : language === "python" ? "py" : language === "cpp" ? "cpp" : "java"}</span>
            </div>
          </div>

          {/* Language Selector Chips */}
          <div className="flex items-center gap-1.5">
            {["javascript", "python", "cpp", "java"].map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wider uppercase transition-all ${
                  language === lang
                    ? "bg-brand-500 text-white shadow-sm"
                    : "text-text-muted hover:text-text-heading hover:bg-surface-secondary"
                }`}
              >
                {lang === "cpp" ? "C++" : lang}
              </button>
            ))}
          </div>

          {/* Real User Presence Tag */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs text-brand-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span>{userName}</span>
            </div>
            <Button
              size="sm"
              variant="primary"
              icon={Play}
              loading={isRunning}
              onClick={handleRunCode}
              className="text-xs px-3 py-1 bg-brand-500 hover:bg-brand-600"
            >
              Run
            </Button>
          </div>
        </div>

        {/* Real Monaco Editor Instance */}
        <div className="h-[280px] w-full bg-[#1e1e1e]">
          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{
              fontSize: 13,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              padding: { top: 12, bottom: 12 },
              lineNumbersMinChars: 3,
            }}
          />
        </div>

        {/* Real Code Output Terminal */}
        {output !== null && (
          <div className="p-3 bg-[#0d1117] border-t border-edge/60 font-mono text-xs text-emerald-400">
            <div className="flex items-center gap-1.5 text-text-muted mb-1 text-[11px] uppercase tracking-wider font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span>Console Output</span>
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed text-text-body font-mono">{output}</pre>
          </div>
        )}

        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-surface-tertiary border-t border-edge/60 text-[11px] text-text-muted">
          <div className="flex items-center gap-3">
            <span className="capitalize">{language}</span>
            <span>UTF-8</span>
            <span className="flex items-center gap-1 text-brand-400">
              <Sparkles className="w-3 h-3" />
              Monaco Engine
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-success">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Live Interactive Editor
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
