import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [response, setResponse] = useState<null | string>(null);
  const [creatorAddress, setCreatorAddress] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let endpoint =
        "https://api.hypeshot.io/get_clips?creatorAddress=" +
        creatorAddress.toLowerCase();
      console.log(endpoint);
      const response = await axios.get(endpoint, {
        headers: {
          "X-API-KEY": process.env.NEXT_PUBLIC_HYPESHOT_API_KEY,
        },
      });
      setCreatorAddress("");
      setResponse(response.data);
    } catch (error) {
      console.log(error);
      setResponse("An error occurred. Please try again later!");
    }
  };

  const handleInputChange = (e: any) => {
    setCreatorAddress(e.target.value);
  };

  return (
    <div className={`flex flex-col h-screen dark:bg-black bg-white`}>
      <div className="flex-grow text-sm overflow-auto p-4 dark:bg-gray-800">
        {response ? (
          <pre
            className="border p-4 rounded bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-300 overflow-x-auto"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {typeof response === "object"
              ? JSON.stringify(response, null, 2)
              : response}
          </pre>
        ) : (
          <div className="text-gray-500 dark:text-gray-400">
            Waiting for response...
          </div>
        )}
      </div>
      <div className="mb-4">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center"
        >
          <input
            type="text"
            value={creatorAddress}
            onChange={handleInputChange}
            className="w-3/4 px-2 py-1 border text-black border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Type the creator address here"
          />
          <button
            disabled={!creatorAddress}
            type="submit"
            className="bg-blue-500 disabled:bg-gray-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
