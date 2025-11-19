const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to TaskFlow</h2>
      <p className="text-gray-600 max-w-lg">
        Manage your boards, lists, and tasks efficiently — built with React + TypeScript + Tailwind
        CSS.
      </p>
    </div>
  );
};

export default Home;