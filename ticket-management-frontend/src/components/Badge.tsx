interface BadgeProps {
  label: string;
  color: string;
}

const Badge: React.FC<BadgeProps> = ({ label, color }) => {
  return (
    <span
      className={`inline-block bg-${color}-500 text-white text-xs font-semibold px-2 rounded-full uppercase mr-1`}
    >
      {label}
    </span>
  );
};

export default Badge;
