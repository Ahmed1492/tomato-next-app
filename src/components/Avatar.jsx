// Generates a beautiful initials avatar when no photo is uploaded
// Falls back to a generic icon if no name is available

const GRADIENTS = [
  "from-rose-400 to-pink-600",
  "from-orange-400 to-red-500",
  "from-violet-400 to-purple-600",
  "from-blue-400 to-indigo-600",
  "from-teal-400 to-cyan-600",
  "from-green-400 to-emerald-600",
];

function getGradient(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  if (parts[0]?.length >= 2) return parts[0].slice(0, 2).toUpperCase();
  return "?";
}

export default function Avatar({ src, name = "", className = "", size = "md" }) {
  const sizeMap = {
    xs: "w-8 h-8 text-xs",
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-xl",
    xl: "w-24 h-24 text-3xl",
    "2xl": "w-32 h-32 text-4xl",
  };

  const sizeClass = sizeMap[size] || sizeMap.md;
  const gradient = getGradient(name);
  const initials = getInitials(name);

  if (src) {
    return (
      <img
        src={src}
        alt={name || "avatar"}
        className={`${sizeClass} rounded-full object-cover ${className}`}
      />
    );
  }

  // No image — show initials or generic icon
  return (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 ${className}`}>
      {name ? (
        <span className="font-bold text-white leading-none">{initials}</span>
      ) : (
        // Generic person icon
        <svg className="w-1/2 h-1/2 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
        </svg>
      )}
    </div>
  );
}
