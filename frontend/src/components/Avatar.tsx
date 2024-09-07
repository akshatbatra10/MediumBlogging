export const Avatar = ({
  name,
  size = "small",
}: {
  name: string;
  size?: string;
}) => {
  return (
    <div
      className={`${
        size === "small" ? "w-8 h-8" : "w-10 h-10"
      } relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full`}
    >
      <span
        className={`${
          size === "small" ? "text-sm" : "text-md"
        } font-medium text-gray-300`}
      >
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </span>
    </div>
  );
};
