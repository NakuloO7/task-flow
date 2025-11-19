const Login: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form className="flex flex-col gap-3 w-64">
        <input
          type="email"
          placeholder="Email"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;