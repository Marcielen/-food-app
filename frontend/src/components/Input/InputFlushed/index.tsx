export const InputFlushed = () => {
  return (
    <div>
      <div className="relative">
        <input
          type="text"
          id="username"
          className="border-b bg-transparent py-1 focus:outline-none focus:border-black focus:border-b-2 transition-black peer"
        />
        <label className="absolute bg-none left-0 top-1 text-black cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-black transition-all">
          Username
        </label>
      </div>
    </div>
  );
};
