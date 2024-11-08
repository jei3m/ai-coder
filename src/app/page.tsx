"use client";
import { useChat } from "ai/react";
import { Bot, Loader2, Send, User2 } from "lucide-react";
import { Sandpack } from "@codesandbox/sandpack-react";
import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api",
    });

  const chatSectionRef = useRef(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(event, {
      data: {
        prompt: input,
      },
    });
  };

  useEffect(() => {
    if (messages.length > 0 && chatSectionRef.current) {
      (chatSectionRef.current as HTMLElement)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
  <main className="min-h-screen bg-gray-900 text-gray-100">

    {/*Hero Section */}
    <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-24">
            <div className="container mx-auto px-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center border border-white rounded-lg px-3 py-1">
                  <span className="text-gray-300 text-md">
                    Powered by <span className="font-medium text-white">Llama 3.1</span> and{" "}
                    <span className="font-medium text-white">NextJS</span>
                  </span>
                </div>
              <h1 className="mb-4 text-5xl font-extrabold leading-tight tracking-tight">
                Create {" "} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                React </span> components with 
                <span className="ml-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                  Llama AI
                </span>
              </h1>
              <p className="mb-10 text-2xl text-gray-300 max-w-xl mx-auto">
                Web-based AI Coder powered by Meta&apos;s AI model, Llama 3.1 405b with NextJS.
              </p>
              
              <div className="flex justify-center space-x-4">
                <a
                  href="#chat"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-900 transition duration-300"
                >
                  Start Coding
                </a>
                <a
                  href="https://github.com/jei3m"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition duration-300"
                >
                  <FontAwesomeIcon icon={faGithub} className="mr-2" />
                  View on GitHub
                </a>
              </div>
            </div>
       </section>

       {/* Chat Section */}
      <section id="chat" ref={chatSectionRef} className="w-full min-h-screen flex flex-col">
        <div className="flex-grow bg-gradient-to-r from-gray-800 to-gray-900 p-8">
          <div className="mx-auto w-full max-w-[800px]">
          <p className="ml-1 mb-2 text-lg text-gray-300 text-left mx-auto">
            Note: This is a just a demo application with rate limited responses. 
          </p> 
          <form
            onSubmit={handleFormSubmit}
            className="flex items-center space-x-4 mb-6"
          >
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder={isLoading ? "Generating . . ." : "Make me a calendar..."}
                value={input}
                disabled={isLoading}
                onChange={handleInputChange}
                className="bg-gray-700 border border-gray-600 rounded-[10px] px-6 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition w-full"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-black rounded-[8px] p-3 hover:bg-blue-700 hover:text-white transition duration-300"
              >
                {isLoading ? (
                  <Loader2
                    onClick={stop}
                    className="h-6 w-6 animate-spin"
                  />
                ) : (
                  <Send className="h-6 w-6" />
                )}
              </button>
            </div>
          </form>
          </div>

          {messages.length > 0 && (
            <div className="space-y-8">
              {messages.slice(-2).map((m, index) => (
                <div
                  key={index}
                  className={`flex ${m.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`relative max-w-full w-full p-5 rounded-lg shadow ${
                      m.role === "assistant" ? "bg-gray-700" : "bg-gray-600"
                    }`}
                  >
                    {m.role === "assistant" ? (
                      <Bot className="absolute -top-4 left-4 bg-blue-600 text-white rounded-full p-1" size={24} />
                    ) : (
                      <User2 className="absolute -top-4 right-4 bg-gray-500 text-white rounded-full p-1" size={24} />
                    )}
                    {m.role === "assistant" ? (
                      <div className="w-full overflow-hidden">
                        <Sandpack
                          template="react"
                          files={{
                            "/App.js": m.content,
                          }}
                          theme="dark"
                          options={{
                            editorHeight: 740,
                            showLineNumbers: true,
                          }}
                          customSetup={{
                            dependencies: {},
                          }}
                        />
                      </div>
                    ) : (
                        <div className="w-full overflow-hidden">
                          {m.content}
                        </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
