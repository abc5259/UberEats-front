interface ButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button = ({ canClick, loading, actionText }: ButtonProps) => {
  return (
    <button
      className={`text-lg font-medium focus:outline-none text-white py-4 transition-colors ${
        !canClick
          ? "bg-gray-300 pointer-events-none"
          : "bg-lime-600 hover:bg-lime-700"
      }`}
    >
      {loading ? "Loading..." : actionText}
    </button>
  );
};
