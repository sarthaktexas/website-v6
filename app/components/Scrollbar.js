import { useState, useEffect, useRef } from "react";
import useResizeObserver from "use-resize-observer";

export default function Scrollbar(props) {
  const [isScrollable, setIsScrollable] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  const bodyRef = useRef(document.body);
  const trackRef = useRef(null);

  useEffect(() => {
    let view = bodyRef.current;
    const onScroll = (e) => {
      if (!bodyRef.current) {
        return;
      }
      setRenderCount((count) => count + 1);
    };
    view.addEventListener("scroll", onScroll);
    return () => view.removeEventListener("scroll", onScroll);
  }, []);

  const onResize = () => {
    let container = bodyRef.current;
    if (container && container.scrollWidth > container.offsetWidth) {
      setIsScrollable(true);
    } else {
      setIsScrollable(false);
    }
    setRenderCount((count) => count + 1);
  };

  useResizeObserver({ ref: bodyRef, onResize });
  const barWidth = bodyRef.current
    ? bodyRef.current.offsetWidth / bodyRef.current.scrollWidth
    : 0;
  const trackWidth = trackRef.current ? trackRef.current.offsetWidth : 0;
  const barPos = bodyRef.current
    ? bodyRef.current.scrollLeft /
      (bodyRef.current.scrollWidth - bodyRef.current.offsetWidth)
    : 0;

  if (!isScrollable) {
    return null;
  }

  return (
    <div className="scrollbar">
      <div className="track" ref={trackRef}>
        <div
          style={{
            width: barWidth * 100 + "%",
            transform:
              "translateX(" + (1 - barWidth) * trackWidth * barPos + "px)",
          }}
          className="slider"
        />
      </div>
    </div>
  );
}
