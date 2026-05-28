import { useNavigate } from "react-router-dom";
export default function LandingPage() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0b1220_0%,#000000_60%)]"></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-10">

        {/* Top Badge */}
        <div className="mb-6">
          <div className="px-5 py-2 rounded-full border border-cyan-500/30 bg-[#0b0b0b] shadow-[0_0_20px_rgba(0,255,255,0.12)]">
            <span className="text-xs tracking-[0.25em] text-cyan-300 font-medium">
              COLLABORATE • CODE • CREATE
            </span>
          </div>
        </div>

        {/* Hero Text */}
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Code Together.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Build Anything.
            </span>
          </h1>

          <p className="mt-5 text-gray-400 text-lg max-w-3xl leading-relaxed">
            Real-time collaborative coding platform for team projects,
            live contests, code execution, and AI-powered development.
          </p>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-5xl">

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl border border-purple-500/20 bg-[#0d0d0d] flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Real-time Collaboration
              </h3>

              <p className="text-gray-400 text-sm">
                Code together seamlessly
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl border border-purple-500/20 bg-[#0d0d0d] flex items-center justify-center">
              <span className="text-2xl">&lt;/&gt;</span>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Online Contests
              </h3>

              <p className="text-gray-400 text-sm">
                Compete. Rank. Win.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl border border-purple-500/20 bg-[#0d0d0d] flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Instant Execution
              </h3>

              <p className="text-gray-400 text-sm">
                Run code in real-time
              </p>
            </div>
          </div>
        </div>

        {/* Main Cards */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">

          {/* GROUP PROJECT */}
          <div className="relative rounded-3xl border border-cyan-500/20 bg-[#07111d] p-8 overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.06)]">

            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent"></div>

            <div className="relative z-10 flex flex-col h-full">

              <div className="w-14 h-14 rounded-2xl border border-cyan-500/20 bg-[#0d1625] flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>

              <h2 className="mt-6 text-4xl font-bold text-cyan-400">
                Group Project
              </h2>

              <p className="mt-4 text-gray-300 leading-relaxed max-w-sm">
                Collaborate with your team in real-time.
                Share code, chat, video call, and build
                amazing projects together.
              </p>

              <button
  onClick={() => navigate("/workspace")}
  className="mt-8 w-fit px-7 py-3 rounded-2xl bg-cyan-400 text-black font-semibold hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(0,255,255,0.35)]"
>
  Enter Workspace →
</button>
            </div>

            {/* Right Side Laptop */}
            <div className="absolute bottom-6 right-6 hidden md:block">

              <div className="w-64 h-40 rounded-2xl bg-[#0b1522] border border-cyan-500/20 rotate-[-6deg] shadow-2xl overflow-hidden">

                <div className="p-4 font-mono text-xs text-cyan-300 space-y-1">
                  <p>const room = createRoom();</p>
                  <p>socket.join(room);</p>
                  <p>runCode();</p>
                  <p>shareScreen();</p>
                </div>
              </div>
            </div>
          </div>

          {/* CONTEST */}
          <div className="relative rounded-3xl border border-purple-500/20 bg-[#12081b] p-8 overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.06)]">

            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>

            <div className="relative z-10 flex flex-col h-full">

              <div className="w-14 h-14 rounded-2xl border border-purple-500/20 bg-[#160c22] flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>

              <h2 className="mt-6 text-4xl font-bold text-purple-400">
                Contest
              </h2>

              <p className="mt-4 text-gray-300 leading-relaxed max-w-sm">
                Join coding contests, solve challenging
                problems, climb the leaderboard,
                and prove your skills.
              </p>

              <button className="mt-8 w-fit px-7 py-3 rounded-2xl bg-purple-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.35)]">
                Join Contest →
              </button>
            </div>

            {/* Trophy */}
            <div className="absolute bottom-3 right-10 text-[130px] opacity-20">
              🏆
            </div>
          </div>
        </div>

        {/* Bottom Left Logo */}
        <div className="absolute bottom-6 left-6 flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl border border-purple-500/20 bg-[#0d0d0d] flex items-center justify-center">
            <span className="text-purple-400 text-xl">&lt;/&gt;</span>
          </div>

          <div>
            <h3 className="font-bold text-xl">
              Code Collab
            </h3>

            <p className="text-gray-500 text-sm">
              Code together. Build together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}