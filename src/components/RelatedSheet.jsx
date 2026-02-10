import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 640px)").matches : false
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 640px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener?.("change", handler);
    
    if (!mq.addEventListener) mq.addListener(handler);
    return () => {
      mq.removeEventListener?.("change", handler);
      if (!mq.removeEventListener) mq.removeListener(handler);
    };
  }, []);
  return isMobile;
}

export default function RelatedSheet({ items = [], onSelect }) {
  const controls = useAnimation();

    const isMobile = useIsMobile();

  return (
  <motion.div
  style={{zIndex: 10000}} 
      className="fixed inset-x-0 bottom-0 z-10000"
      initial={{ y: isMobile ? 340 : 260 }} 
      animate={controls}
      drag="y"
      dragConstraints={{ top: -200, bottom: isMobile ? 340 : 260 }}
      dragElastic={0.05}
      onDragEnd={(_, info) => {
        const openY = 90; 
        const closedY = isMobile ? 340 : 260; 
        const nextY = info.offset.y < -80 ? openY : closedY;
        controls.start({ y: nextY, transition: { type: "spring", stiffness: 320, damping: 30 } });
      }}
    >
  <div className="mx-3 sm:mx-4 mb-[calc(env(safe-area-inset-bottom)+56px)] rounded-t-2xl bg-black/80 backdrop-blur shadow-xl border-t border-white/10">
        <div className="flex justify-center py-2">
          <div className="h-1.5 w-10 rounded-full bg-white/30" />
        </div>

  <div className="max-h-[38vh] overflow-y-auto px-3 pb-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {items.map((item) => (
            <button
              key={item.id || item.slug}
              onClick={() => onSelect?.(item)}
              className="text-left bg-white/5 hover:bg-white/10 rounded-lg overflow-hidden ring-1 ring-white/10"
            >
              <div className="aspect-video bg-black">
                {item.thumbnailUrl ? (
                  <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full " loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/60 text-xs">No thumbnail</div>
                )}
              </div>
              <div className="p-2">
                <div className="text-xs text-white/80 truncate">{item.title}</div>
                {item.category && <div className="text-[10px] text-white/50">{item.category}</div>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

