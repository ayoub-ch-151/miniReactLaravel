export default function Loader() {
  return (
    <div className="text-center my-5">
      <div
        className="spinner-border text-primary"
        role="status"
        style={{
          animation: 'spinner-bounce 1.5s linear infinite',
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3">Loading...</p>

      <style>{`
        @keyframes spinner-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
