import { cn } from "./lib/utils";

interface CassetteTapeProps {
  size?: "sm" | "md" | "lg" | "xl";
  spinning?: boolean;
  className?: string;
  cassetteColor?: "black" | "white" | "clear" | "red" | "blue" | "green" | "purple" | "orange" | "pink" | "yellow";
}

const sizeClasses = {
  sm: "w-32 h-20",
  md: "w-48 h-30",
  lg: "w-64 h-40",
  xl: "w-96 h-60",
};

export const CassetteTape = ({
  size = "lg",
  spinning = false,
  className,
  cassetteColor = "black"
}: CassetteTapeProps) => {
  const getCassetteColorStyle = () => {
    switch(cassetteColor) {
      case "white":
        return {
          body: "linear-gradient(to bottom, #f5f5f5, #ffffff, #e5e5e5)",
          label: "#ffffff",
          spools: "#1a1a1a"
        };
      case "clear":
        return {
          body: "linear-gradient(to bottom, rgba(228, 228, 231, 0.3), rgba(212, 212, 216, 0.2))",
          label: "rgba(255, 255, 255, 0.9)",
          spools: "#2a2a2a"
        };
      case "red":
        return {
          body: "linear-gradient(to bottom, #991b1b, #dc2626)",
          label: "#fca5a5",
          spools: "#450a0a"
        };
      case "blue":
        return {
          body: "linear-gradient(to bottom, #1e40af, #3b82f6)",
          label: "#93c5fd",
          spools: "#1e3a8a"
        };
      case "green":
        return {
          body: "linear-gradient(to bottom, #166534, #22c55e)",
          label: "#86efac",
          spools: "#14532d"
        };
      case "purple":
        return {
          body: "linear-gradient(to bottom, #6b21a8, #a855f7)",
          label: "#d8b4fe",
          spools: "#581c87"
        };
      case "orange":
        return {
          body: "linear-gradient(to bottom, #9a3412, #f97316)",
          label: "#fed7aa",
          spools: "#7c2d12"
        };
      case "pink":
        return {
          body: "linear-gradient(to bottom, #9f1239, #ec4899)",
          label: "#fbcfe8",
          spools: "#831843"
        };
      case "yellow":
        return {
          body: "linear-gradient(to bottom, #a16207, #eab308)",
          label: "#fef08a",
          spools: "#854d0e"
        };
      case "black":
      default:
        return {
          body: "linear-gradient(to bottom, #18181b, #27272a, #18181b)",
          label: "#52525b",
          spools: "#09090b"
        };
    }
  };

  const colors = getCassetteColorStyle();

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Cassette body */}
      <div 
        className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl"
        style={{ 
          background: colors.body,
          border: cassetteColor === "white" ? "1px solid #d4d4d8" : "1px solid rgba(255,255,255,0.1)"
        }}
      >
        {/* Top section with spools */}
        <div className="absolute top-[15%] left-0 right-0 h-[45%] flex items-center justify-around px-[12%]">
          {/* Left spool */}
          <div className="relative w-[28%] aspect-square">
            <div 
              className={cn(
                "absolute inset-0 rounded-full",
                spinning && "animate-spin"
              )}
              style={{ 
                background: `conic-gradient(from 0deg, ${colors.spools} 0%, ${colors.spools} 45%, transparent 45%, transparent 55%, ${colors.spools} 55%, ${colors.spools} 100%)`
              }}
            />
            {/* Center hole */}
            <div 
              className="absolute inset-[35%] rounded-full"
              style={{ background: colors.body }}
            />
          </div>

          {/* Right spool */}
          <div className="relative w-[28%] aspect-square">
            <div 
              className={cn(
                "absolute inset-0 rounded-full",
                spinning && "animate-spin"
              )}
              style={{ 
                background: `conic-gradient(from 0deg, ${colors.spools} 0%, ${colors.spools} 45%, transparent 45%, transparent 55%, ${colors.spools} 55%, ${colors.spools} 100%)`
              }}
            />
            {/* Center hole */}
            <div 
              className="absolute inset-[35%] rounded-full"
              style={{ background: colors.body }}
            />
          </div>
        </div>

        {/* Tape visible between spools */}
        <div 
          className="absolute top-[35%] left-[20%] right-[20%] h-[15%]"
          style={{ background: colors.spools, opacity: 0.8 }}
        />

        {/* Label area */}
        <div 
          className="absolute top-[65%] left-[8%] right-[8%] h-[25%] rounded"
          style={{ 
            background: colors.label,
            boxShadow: cassetteColor === "clear" ? "inset 0 1px 3px rgba(0,0,0,0.2)" : "inset 0 1px 3px rgba(0,0,0,0.3)"
          }}
        >
          {/* Label lines */}
          <div className="absolute top-[25%] left-[5%] right-[5%] h-[2px] bg-black/20" />
          <div className="absolute top-[50%] left-[5%] right-[5%] h-[2px] bg-black/20" />
          <div className="absolute top-[75%] left-[5%] right-[5%] h-[2px] bg-black/20" />
        </div>

        {/* Screws in corners */}
        <div 
          className="absolute top-[5%] left-[5%] w-[6%] aspect-square rounded-full"
          style={{ background: colors.spools, border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div className="absolute inset-[30%] border-t border-b" style={{ borderColor: colors.body, transform: "rotate(45deg)" }} />
        </div>
        <div 
          className="absolute top-[5%] right-[5%] w-[6%] aspect-square rounded-full"
          style={{ background: colors.spools, border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div className="absolute inset-[30%] border-t border-b" style={{ borderColor: colors.body, transform: "rotate(45deg)" }} />
        </div>
        <div 
          className="absolute bottom-[5%] left-[5%] w-[6%] aspect-square rounded-full"
          style={{ background: colors.spools, border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div className="absolute inset-[30%] border-t border-b" style={{ borderColor: colors.body, transform: "rotate(45deg)" }} />
        </div>
        <div 
          className="absolute bottom-[5%] right-[5%] w-[6%] aspect-square rounded-full"
          style={{ background: colors.spools, border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div className="absolute inset-[30%] border-t border-b" style={{ borderColor: colors.body, transform: "rotate(45deg)" }} />
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default CassetteTape;