import Chat from "./chat";

export default function Home() {
  return (
    <div className="w-full h-full bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full h-full items-center justify-center sm:items-start">
        <Chat />
      </main>
    </div>
  );
}
