import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center px-6">
      
      <h1 className="text-6xl font-bold mb-4 text-cyan-400">
        Code Collab
      </h1>

      <p className="text-gray-300 text-lg mb-12 text-center max-w-2xl">
        Real-time collaborative coding platform for team projects,
        live contests, code execution, and AI-powered development.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">

        {/* GROUP PROJECT CARD */}
        <div className="bg-[#1e293b] rounded-2xl p-8 shadow-lg hover:scale-105 transition duration-300">
          
          <h2 className="text-3xl font-semibold text-cyan-300 mb-4">
            Group Project
          </h2>

          <p className="text-gray-400 mb-6">
            Collaborate with teammates in real-time using shared code
            editors, chat, video calls, and live compilation.
          </p>

          <button
            onClick={() => navigate("/group-project")}
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold"
          >
            Enter Workspace
          </button>
        </div>

        {/* CONTEST CARD */}
        <div className="bg-[#1e293b] rounded-2xl p-8 shadow-lg hover:scale-105 transition duration-300">
          
          <h2 className="text-3xl font-semibold text-purple-300 mb-4">
            Contest
          </h2>

          <p className="text-gray-400 mb-6">
            Participate in solo or team coding contests with live
            leaderboards, hidden test cases, and collaborative solving.
          </p>

          <button
            onClick={() => navigate("/contest")}
            className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-xl font-semibold"
          >
            Join Contest
          </button>
        </div>

      </div>
    </div>
  );
}

export default Home;