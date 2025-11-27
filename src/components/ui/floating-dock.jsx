"use client";
import React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockDesktop = ({ items, className }) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3 md:flex ${className}`}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

const FloatingDockMobile = ({ items, className }) => {
  return (
    <div className={`flex gap-2 md:hidden ${className}`}>
      {items.map((item) => (
        <a
          key={item.title}
          href={item.href}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 dark:bg-neutral-900"
        >
          <div className="h-5 w-5 text-neutral-500 dark:text-neutral-400">
            {item.icon}
          </div>
        </a>
      ))}
    </div>
  );
};

function IconContainer({ mouseX, title, icon, href }) {
  let ref = useRef();

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthSpring = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightSpring = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = React.useState(false);

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{
          width: widthSpring,
          height: heightSpring,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative aspect-square rounded-2xl bg-gray-200 dark:bg-neutral-800 flex items-center justify-center"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-pre rounded-md bg-gray-800 px-2 py-1 text-xs text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="h-5 w-5 text-neutral-500 dark:text-neutral-400">
          {icon}
        </div>
      </motion.div>
    </a>
  );
}