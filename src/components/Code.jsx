import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const initialRows = [
    "BI]?(*}]",
    "ME@ _WP% =-@BFS",
    "_HJ)U}",
    "]- L%? N#I DLXS",
];

const randomCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}<>?/\\";

/* ---- animation config ---- */
const CHANGES_PER_CHAR = 3;   // each letter is changed twice, then we move on
const STEP_DISTANCE = 40;     // px of mouse move / scroll needed for one step
const MAX_STEPS_PER_EVENT = 3; // protects against huge jumps
// row = row index (0-based). `after` = start when the trigger row reaches that char index.
const ROW_SEQUENCE = [
    { row: 0, after: null },                          // 1st row starts first
    { row: 1, after: { row: 0, char: "end" } },       // 2nd row: after 1st row is complete
    { row: 2, after: { row: 1, char: 3 } },           // 3rd row: on the 4th char of 1st row
    { row: 3, after: { row: 2, char: "end" } },       // 4th row: after 3rd row is complete
];

const randomChar = (exclude) => {
    let c;
    do {
        c = randomCharacters[Math.floor(Math.random() * randomCharacters.length)];
    } while (c === exclude);
    return c;
};

function Code() {
    const rootRef = useRef(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;

            // collect animatable (non-space) chars per row
            const rows = [...root.querySelectorAll("[data-row]")].map((rowEl) =>
                [...rowEl.querySelectorAll("[data-char]")].filter(
                    (el) => el.dataset.char.trim() !== ""
                )
            );

            const makeState = () =>
                ROW_SEQUENCE.map((cfg) => ({
                    ...cfg,
                    started: cfg.after === null,
                    done: false,
                    pos: 0,
                    changes: 0,
                }));

            let states = makeState();
            let inView = false;

            const reset = () => {
                rows.flat().forEach((el) => (el.textContent = el.dataset.char));
                states = makeState();
            };

            const step = () => {
                // start rows whose trigger condition is met
                states.forEach((s) => {
                    if (s.started || !s.after) return;
                    const trigger = states.find((t) => t.row === s.after.row);
                    if (!trigger) return;

                    const reached =
                        s.after.char === "end"
                            ? trigger.done
                            : trigger.pos >= s.after.char || trigger.done;

                    if (reached) s.started = true;
                });

                // advance every active row by one step
                states.forEach((s) => {
                    if (!s.started || s.done) return;
                    const el = rows[s.row]?.[s.pos];
                    if (!el) {
                        s.done = true;
                        return;
                    }

                    el.textContent = randomChar(el.textContent);
                    gsap.fromTo(
                        el,
                        { opacity: 0.2, y: -3 },
                        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", overwrite: true }
                    );

                    s.changes += 1;
                    if (s.changes >= CHANGES_PER_CHAR) {
                        s.changes = 0;
                        s.pos += 1;
                        if (s.pos >= rows[s.row].length) s.done = true;
                    }
                });

                // everything finished -> loop from the beginning
                if (states.every((s) => s.done)) {
                    states = makeState();
                }
            };

            // ---- input handling: mouse move + scroll ----
            let acc = 0;
            const feed = (distance) => {
                if (!inView) return;
                acc += distance;
                let steps = Math.min(Math.floor(acc / STEP_DISTANCE), MAX_STEPS_PER_EVENT);
                acc %= STEP_DISTANCE;
                while (steps-- > 0) step();
            };

            let lastX = null;
            let lastY = null;
            const onMouseMove = (e) => {
                if (lastX !== null) feed(Math.hypot(e.clientX - lastX, e.clientY - lastY));
                lastX = e.clientX;
                lastY = e.clientY;
            };

            let lastScroll = window.scrollY;
            const onScroll = () => {
                feed(Math.abs(window.scrollY - lastScroll));
                lastScroll = window.scrollY;
            };

            window.addEventListener("mousemove", onMouseMove, { passive: true });
            window.addEventListener("scroll", onScroll, { passive: true });

            // ---- only while the section is in the viewport ----
            const st = ScrollTrigger.create({
                trigger: root,
                start: "top bottom",
                end: "bottom top",
                onToggle: (self) => {
                    inView = self.isActive;
                    lastX = lastY = null;
                    lastScroll = window.scrollY;
                },
            });

            return () => {
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("scroll", onScroll);
                st.kill();
                reset();
            };
        },
        { scope: rootRef }
    );

    return (
        <div ref={rootRef} className="flex w-60 items-end relative">
            <div className="code whitespace-pre p-10 text-[12px] font-normal text-code">
                {initialRows.map((row, rowIndex) => (
                    <div key={rowIndex} data-row={rowIndex}>
                        {[...row].map((char, i) => (
                            <span key={i} data-char={char} className="inline-block">
                                {char}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
            <div className="line-right"></div>
        </div>
    );
}

export default Code;