import { useEffect, useState } from "react";
import style from "./style.module.css";

export default function CustomSelect01() {
  const [rects, setRects] = useState([]);
  const [maskImage, setMaskImage] = useState(
    "linear-gradient(transparent, transparent)",
  );
  const [maskSize, setMaskSize] = useState("0 0");

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
        setRects([]);
        setMaskImage("linear-gradient(transparent, transparent)");
        setMaskSize("0 0");
        return;
      }

      const range = selection.getRangeAt(0);
      const rectList = Array.from(range.getClientRects());

      
      const wrapperEl = document.querySelector(`.${style.effectWrapper}`);
      if (!wrapperEl) return;
      const wrapperRect = wrapperEl.getBoundingClientRect();

      const MASK_RADIUS = 12;
      const rectsSvg = rectList
        .map((r) => {
          const x = r.left - wrapperRect.left;
          const y = r.top - wrapperRect.top;
          const w = Math.max(0, r.width);
          const h = Math.max(0, r.height);
          const rx = Math.min(MASK_RADIUS, w / 2, h / 2);
          return `<rect fill="white" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ry="${rx}"/>`;
        })
        .join("");

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${wrapperRect.width} ${wrapperRect.height}">${rectsSvg}</svg>`;
      setMaskImage(`url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
      setMaskSize("100% 100%");

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
        <div
          className={style.effectWrapper}
          style={{
            WebkitMaskImage: maskImage,
            WebkitMaskSize: maskSize,
            WebkitMaskPosition: "0 0",
            WebkitMaskRepeat: "no-repeat",
            maskImage,
            maskSize,
            maskPosition: "0 0",
            maskRepeat: "no-repeat",
          }}
        >
          <div className={style.effect} />
        </div>
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
