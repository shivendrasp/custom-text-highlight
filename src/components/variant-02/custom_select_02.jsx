import { useEffect, useState } from "react";
import style from "./style.module.css";

export default function CustomSelect02() {
  const [rects, setRects] = useState([]);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
        setRects([]);
        return;
      }

      const range = selection.getRangeAt(0);
      const rectList = Array.from(range.getClientRects());

      setRects(rectList);
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return (
    <>
      <div className={style.textContainer}>
        <p className={style.text}>
          Experiment 271 584 <br/>
          Experiment 272 584 <br/>
          Experiment 273 584 <br/>
          Experiment 274 584 <br/>
        </p>
      </div>

      {rects.map((rect, id) => (
        <div
          key={id}
          className={style.customSelect}
          style={{
            position: "absolute",
            pointerEvents: "none",
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          }}
        />
      ))}
    </>
  );
}
