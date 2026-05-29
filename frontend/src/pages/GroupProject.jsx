import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import Editor from "@monaco-editor/react";
import api from "../api";
import { useRef } from "react";
import axios from "axios";
export default function GroupProject() {
  
  const { roomId } = useParams();
    const [activePanel, setActivePanel] = useState("chat");
    const [message, setMessage] = useState("");
const [messages, setMessages] = useState([]);
const [participants, setParticipants] = useState([]);
const [files, setFiles] = useState({


});
const [activeFile, setActiveFile] = useState();

const saveTimeout = useRef(null);
const saveFileToDatabase = async () => {
  console.log("AutoSve called")
  try {

    await api.post(
      `/files/save/${roomId}`,
      {
        fileName: activeFile,
        language: files[activeFile].language,
        content: files[activeFile].content,
      }
    );

    console.log("File saved");

  } catch (error) {

    console.error(error);

  }

};

useEffect(() => {


 


  socket.emit("join-room", {
  roomId,
  username: "Prachi",
});



  socket.on("participants-update", (users) => {
  setParticipants(users);
});


socket.on("receive-message", (data) => {

  setMessages((prev) => [
    ...prev,
    data,
  ]);

});

  socket.on("receive-code", ({ fileName, code }) => {

  setFiles((prev) => {

    if (!prev[fileName]) return prev;

    return {
      ...prev,

      [fileName]: {
        ...prev[fileName],
        content: code,
      },
    };

  });


   return () => {

    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

  };

});



  socket.on("file-deleted", (fileName) => {

  setFiles((prev) => {

    const updatedFiles = { ...prev };

    delete updatedFiles[fileName];


    const remainingFiles =
  Object.keys(updatedFiles);

if (remainingFiles.length > 0) {
  setActiveFile(remainingFiles[0]);
}

    return updatedFiles;

  });

});




socket.on(
  "file-renamed",
  ({ oldFileName, newFileName }) => {

    setFiles((prev) => {


      if (activeFile === oldFileName) {
  setActiveFile(newFileName);
}

      const updatedFiles = { ...prev };

      updatedFiles[newFileName] =
        updatedFiles[oldFileName];

      delete updatedFiles[oldFileName];

      return updatedFiles;

    });

  }
);





  const loadFiles = async () => {

    try {

      const response = await axios.get(
        `http://localhost:8080/api/files/${roomId}`
      );

      const loadedFiles = {};

response.data.forEach((file) => {

  loadedFiles[file.fileName] = {
    language: file.language,
    content: file.content,
  };

});

setFiles(loadedFiles);

const firstFile = response.data[0];
if (firstFile) {

  setActiveFile(firstFile.fileName);

}
    } catch (error) {

      console.error(error);

    }

  };
  loadFiles();





  socket.on("file-created", ({ fileName, language }) => {
  setFiles((prev) => ({
    ...prev,

    [fileName]: {
      language,
      content: "",
    },
  }));

});



  socket.on("receive-code", ({ fileName, code }) => {
    
  setFiles((prev) => ({
    ...prev,

    [fileName]: {
      ...prev[fileName],
      content: code,
    },
  }));

 
});



  return () => {
    socket.off("receive-message");
    socket.off("receive-code");
    socket.off("participants-update");

    socket.off("file-created");
socket.off("file-deleted");
socket.off("file-renamed");
  };

}, [roomId]);




const sendMessage = () => {
  if (!message.trim()) return;

  const msgData = {
    roomId,
    sender: "Prachi",
    text: message,
  };

  socket.emit("send-message", msgData);

  setMessage("");
};



const handleCodeChange = (value) => {

  setFiles((prev) => ({
    ...prev,

    [activeFile]: {
      ...prev[activeFile],
      content: value,
    },
  }));

  socket.emit("code-change", {
    roomId,
    fileName: activeFile,
    code: value,
  });


  if (saveTimeout.current) {
  clearTimeout(saveTimeout.current);
}

saveTimeout.current = setTimeout(() => {

  saveFileToDatabase();

}, 3000);

};

const createNewFile = () => {

  const fileName = prompt("Enter file name");

  if (!fileName) return;

  const extension = fileName.split(".").pop();

  const languageMap = {
    js: "javascript",
    py: "python",
    java: "java",
    cpp: "cpp",
    c: "c",
    html: "html",
    css: "css",
    json: "json",
    ts: "typescript",
php: "php",
go: "go",
rs: "rust",
sql: "sql",
xml: "xml",
md: "markdown",
sh: "shell",
  };

  const language =
    languageMap[extension] || "plaintext";

  setFiles((prev) => ({
    ...prev,

    [fileName]: {
      language,
      content: "",
    },
  }));

  socket.emit("create-file", {
    roomId,
    fileName,
    language,
  });

};


const deleteFile = (fileName) => {

  const updatedFiles = { ...files };

  delete updatedFiles[fileName];

  setFiles(updatedFiles);

  socket.emit("delete-file", {
  roomId,
  fileName,
});


  const remainingFiles =
    Object.keys(updatedFiles);

  if (remainingFiles.length > 0) {
    setActiveFile(remainingFiles[0]);
  }

};


const renameFile = (oldFileName) => {

  const newFileName = prompt(
    "Enter new file name",
    oldFileName
  );

  if (!newFileName) return;




  const updatedFiles = { ...files };

  updatedFiles[newFileName] =
    updatedFiles[oldFileName];

  delete updatedFiles[oldFileName];

  setFiles(updatedFiles);


  socket.emit("rename-file", {
  roomId,
  oldFileName,
  newFileName,
});

  if (activeFile === oldFileName) {
    setActiveFile(newFileName);
  }

};





  return (
    <div className="h-screen w-full bg-[#050505] text-white flex overflow-hidden">

      {/* LEFT SIDEBAR */}
      <div className="w-[70px] bg-[#0b0b0b] border-r border-white/10 flex flex-col items-center py-5 gap-6">

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-xl">
          &lt;/&gt;
        </div>

        <div
  onClick={() => setActivePanel("files")}
  className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl cursor-pointer transition-all ${
    activePanel === "files"
      ? "bg-cyan-400/20 border border-cyan-400"
      : "bg-white/5 hover:bg-white/10"
  }`}
>
  📁
</div>

<div
  onClick={() => setActivePanel("chat")}
  className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl cursor-pointer transition-all ${
    activePanel === "chat"
      ? "bg-purple-400/20 border border-purple-400"
      : "bg-white/5 hover:bg-white/10"
  }`}
>
  💬
</div>

<div
  onClick={() => setActivePanel("participants")}
  className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl cursor-pointer transition-all ${
    activePanel === "participants"
      ? "bg-pink-400/20 border border-pink-400"
      : "bg-white/5 hover:bg-white/10"
  }`}
>
  👥
</div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <div className="h-[70px] border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between px-6">

          <div>
            <h1 className="text-lg font-bold">
              Code Collab Workspace
            </h1>

            <p className="text-sm text-gray-400 mt-1">
              Room ID: {roomId}
            </p>
          </div>

          <div className="flex gap-4">

            <button className="px-5 py-2 rounded-xl bg-white/5">
              Copy Invite
            </button>

            <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold">
              Run Code
            </button>

            <button
  onClick={saveFileToDatabase}
  className="px-5 py-2 rounded-xl bg-green-500 text-black font-semibold"
>
  Save
</button>

          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 flex overflow-hidden">

          {/* EDITOR */}
          <div className="flex-1">

           {files[activeFile] && (

<Editor
  height="100%"
  language={files[activeFile].language}
  theme="vs-dark"
  value={files[activeFile].content}
  onChange={handleCodeChange}
/>

)}

          </div>

         {/* RIGHT PANEL */}
<div className="w-[320px] min-w-[320px] border-l border-white/10 bg-[#0a0a0a] flex flex-col">

  {/* FILES PANEL */}
  {activePanel === "files" && (
    <div className="p-5">

      <h2 className="text-lg font-semibold mb-4">
        Project Files
      </h2>


      <button
  onClick={createNewFile}
  className="w-full mb-4 py-2 rounded-lg bg-cyan-400 text-black font-semibold"
>
  + New File
</button>

      <div className="flex flex-col gap-3 text-sm">
{Object.keys(files).map((fileName) => (

  <div
    key={fileName}
    className={`rounded-lg px-4 py-3 transition-all flex items-center justify-between ${
      activeFile === fileName
        ? "bg-cyan-400/20 border border-cyan-400"
        : "bg-white/5"
    }`}
  >

    <div
      onClick={() => setActiveFile(fileName)}
      className="cursor-pointer flex-1"
    >
      {fileName}
    </div>

    <div className="flex gap-2">

      <button
        onClick={() => renameFile(fileName)}
        className="text-yellow-400"
      >
        ✏️
      </button>

      <button
        onClick={() => deleteFile(fileName)}
        className="text-red-400"
      >
        🗑
      </button>

    </div>

  </div>

))}

  
      </div>
    </div>
  )}

  {/* CHAT PANEL */}
  {activePanel === "chat" && (
    <div className="flex-1 flex flex-col">

      <div className="p-5 border-b border-white/10">
        <h2 className="text-lg font-semibold">
          Team Chat
        </h2>
      </div>


      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">

  {messages.map((msg, index) => (
    <div
      key={index}
      className="bg-white/5 rounded-xl px-4 py-3"
    >
      <p className="text-cyan-400 text-sm font-semibold">
        {msg.sender}
      </p>

      <p className="text-sm text-gray-200 mt-1">
        {msg.text}
      </p>
    </div>
  ))}

</div>

      <div className="p-4 border-t border-white/10">

        <input
          type="text"
           value={message}
  onChange={(e) => setMessage(e.target.value)}
          placeholder="Send message..."
          className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 outline-none"
        />

        <button
  onClick={sendMessage}
  className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold"
>
  Send
</button>

      </div>
    </div>
  )}

  {/* PARTICIPANTS PANEL */}
  {/* PARTICIPANTS PANEL */}
{activePanel === "participants" && (

  <div className="p-5">

    <h2 className="text-lg font-semibold mb-4">
      Participants
    </h2>

    <div className="flex flex-col gap-3">

      {participants.map((user, index) => (

        <div
          key={index}
          className="bg-white/5 rounded-xl p-3 flex items-center gap-3"
        >

          <div className="w-10 h-10 rounded-full bg-cyan-400"></div>

          <div>
            <p className="font-medium">
              {user}
            </p>

            <p className="text-xs text-gray-400">
              Active User
            </p>
          </div>

        </div>

      ))}

    </div>

  </div>

)}
</div>


        </div>
      </div>
    </div>
  );
}