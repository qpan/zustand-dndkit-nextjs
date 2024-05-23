import { addTask } from "@/types";
import { useState } from "react";

function Input({ onSubmit }: { onSubmit: addTask}) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if(!input) return;

    onSubmit(input);
    setInput("");
  }

  return (
    <>
      <input
        type="text"
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <button onClick={handleSubmit} className="rounded-md py-2 px-3 bg-blue-500 text-white">Add</button>
    </>
  );
}

export default Input;