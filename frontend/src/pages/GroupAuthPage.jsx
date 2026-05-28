import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function GroupAuthPage() {
    const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
    const createRoom = async () => {

  try {

    const response = await axios.post(
      "http://localhost:8080/api/rooms/create"
    );

    const roomId = response.data.roomId;

    navigate(`/workspace/${roomId}`);

  } catch (error) {

    console.log(error);

  }
};
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#111827_0%,#000000_65%)]"></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-10">

        {/* Heading */}
        <div className="text-center mb-14">

          <h1 className="text-6xl font-extrabold">
            Group
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {" "}Workspace
            </span>
          </h1>

          <p className="mt-5 text-gray-400 text-lg">
            Build, collaborate, and code together in real-time workspaces.
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl">

          {/* CREATE ROOM CARD */}
          <div className="relative rounded-3xl border border-cyan-500/20 bg-[#07111d] p-10 overflow-hidden shadow-[0_0_40px_rgba(0,255,255,0.08)] hover:-translate-y-1 transition-all duration-300">

            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent"></div>

            <div className="relative z-10">

              <div className="w-16 h-16 rounded-2xl border border-cyan-500/20 bg-[#0d1625] flex items-center justify-center">
                <span className="text-3xl">🚀</span>
              </div>

              <h2 className="mt-8 text-4xl font-bold text-cyan-400">
                Create Room
              </h2>

              <p className="mt-4 text-gray-400 leading-relaxed">
                Start a new collaborative coding workspace and invite your teammates instantly.
              </p>

              {/* Inputs */}
              <div className="mt-8 flex flex-col gap-5">

                <input
                  type="email"
                  placeholder="Enter Email"
                  className="bg-[#0b1522] border border-cyan-500/20 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition-all"
                />

                <input
                  type="password"
                  placeholder="Enter Password"
                  className="bg-[#0b1522] border border-cyan-500/20 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition-all"
                />

                <button
  onClick={createRoom}
  className="mt-8 w-full py-4 rounded-2xl bg-cyan-400 text-black font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(0,255,255,0.35)]"
>
  Create Workspace →
</button>
              </div>
            </div>
          </div>
          {/* JOIN ROOM CARD */}
          <div className="relative rounded-3xl border border-purple-500/20 bg-[#12081b] p-10 overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.08)] hover:-translate-y-1 transition-all duration-300">

            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>

            <div className="relative z-10">

              <div className="w-16 h-16 rounded-2xl border border-purple-500/20 bg-[#160c22] flex items-center justify-center">
                <span className="text-3xl">🔗</span>
              </div>

              <h2 className="mt-8 text-4xl font-bold text-purple-400">
                Join Room
              </h2>

              <p className="mt-4 text-gray-400 leading-relaxed">
                Enter a room code or paste an invite link shared by your teammates.
              </p>
            
              {/* Input */}
              <div className="mt-8 flex flex-col gap-5">
                
                <input
                  type="text"
                  placeholder="Enter Room ID"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="bg-[#160c22] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-400 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300"
                />
                
                <button
  onClick={() => {
  if (roomId.trim() !== "") {
    navigate(`/workspace/${roomId}`);
  }
}}
  className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.35)]"
>
  Join Workspace →
</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Branding */}
        <div className="absolute bottom-6 left-6 flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl border border-purple-500/20 bg-[#0d0d0d] flex items-center justify-center">
            <span className="text-purple-400 text-xl">&lt;/&gt;</span>
          </div>

          <div>
            <h3 className="font-bold text-xl">
              Code Collab
            </h3>

            <p className="text-gray-500 text-sm">
              Real-time collaborative coding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}