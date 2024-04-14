interface BadgeProps {
  label: string;
  color: "blue" | "red";
}

const Badge: React.FC<BadgeProps> = ({ label, color }) => {
  const backgroundColor = color === "blue" ? "blue" : "red";

  return (
    <span
      className={`inline-block ${
        backgroundColor === "blue" ? "bg-blue-500" : "bg-red-500"
      } text-white text-xs font-semibold px-2 rounded-full uppercase mr-1`}
    >
      {label}
    </span>
  );
};

export default Badge;
