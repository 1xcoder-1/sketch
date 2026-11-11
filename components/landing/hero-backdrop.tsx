"use client";

import { useEffect, useRef } from "react";
import { damp, getCoverCrop, getLensCrop, getLensInfluence } from "./hero-lens";

const MOUNTAIN_IMAGE = "https://assets.aceternity.com/screenshots/mountains-2.webp";
const CELL_SIZE = 60;

type Cell = { x: number; y: number; strength: number };

export default function HeroBackdrop() {
  const backdropRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const canvas = canvasRef.current;
    const surface = backdrop?.parentElement;
    if (!backdrop || !canvas || !surface) return;
    const context = canvas.getContext("2d");
    const photo = document.createElement("canvas");
    const photoContext = photo.getContext("2d");
    if (!context || !photoContext) {
      backdrop.style.backgroundImage = `url("${MOUNTAIN_IMAGE}")`;
      backdrop.dataset.ready = "true";
      return;
    }

    const image = new window.Image();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1;
    let height = 480;
    let ratio = 1;
    let loaded = false;
    let inView = true;
    let animation = 0;
    let lastTime = 0;
    let cells: Cell[] = [];
    let crop = { x: 0, y: 0, width: 1, height: 1 };
    const pointer = { x: 0, y: -height, targetX: 0, targetY: -height, strength: 0.4 };

    function drawBase() {
      if (!loaded || !context) return;
      context.globalAlpha = 1;
      context.clearRect(0, 0, width, height);
      context.drawImage(photo, 0, 0, width, height);
    }

    function requestFrame() {
      if (!animation && loaded && inView && !document.hidden && !motion.matches) {
        animation = requestAnimationFrame(draw);
      }
    }

    function draw(now: number) {
      animation = 0;
      if (!context || motion.matches || !inView || document.hidden) return;
      const frames = lastTime ? Math.min(3, (now - lastTime) / (1000 / 60)) : 1;
      lastTime = now;
      const distance = Math.hypot(pointer.targetX - pointer.x, pointer.targetY - pointer.y);
      const diagonal = Math.hypot(width, height);
      const strength = 0.4 + Math.min(1.4, distance / diagonal * 6);
      pointer.x = damp(pointer.x, pointer.targetX, 0.12, frames);
      pointer.y = damp(pointer.y, pointer.targetY, 0.12, frames);
      pointer.strength = damp(pointer.strength, strength, 0.06, frames);
      const radius = diagonal * 0.5 * pointer.strength;
      let unsettled = distance > 0.1 || Math.abs(pointer.strength - strength) > 0.001;
      drawBase();

      for (const cell of cells) {
        const target = getLensInfluence(cell.x, cell.y, pointer.x, pointer.y, radius);
        cell.strength = damp(cell.strength, target, target > cell.strength ? 0.08 : 0.025, frames);
        if (Math.abs(cell.strength - target) > 0.001) unsettled = true;
        if (cell.strength < 0.001) continue;
        const sample = getLensCrop({
          x: crop.x + cell.x / width * crop.width,
          y: crop.y + cell.y / height * crop.height,
          width: CELL_SIZE / width * crop.width,
          height: CELL_SIZE / height * crop.height,
        }, cell.strength);
        context.globalAlpha = cell.strength;
        context.drawImage(image,
          sample.x, sample.y, sample.width, sample.height,
          cell.x, cell.y, CELL_SIZE, CELL_SIZE,
        );
      }
      context.globalAlpha = 1;
      context.fillStyle = "rgba(255,255,255,0.9)";
      for (const cell of cells) {
        if (cell.strength < 0.001) continue;
        context.beginPath();
        context.arc(cell.x, cell.y, CELL_SIZE * 0.07 * cell.strength, 0, Math.PI * 2);
        context.fill();
      }
      if (unsettled) requestFrame();
      else lastTime = 0;
    }

    function resize() {
      if (!backdrop || !canvas || !context || !photoContext) return;
      const rect = backdrop.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      width = rect.width;
      height = rect.height;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = photo.width = Math.round(width * ratio);
      canvas.height = photo.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      photoContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      pointer.x = pointer.targetX = width / 2;
      pointer.y = pointer.targetY = -height;
      cells = [];
      for (let y = 0; y < height; y += CELL_SIZE) {
        for (let x = 0; x < width; x += CELL_SIZE) cells.push({ x, y, strength: 0 });
      }
      if (loaded) {
        crop = getCoverCrop(image.naturalWidth, image.naturalHeight, width, height);
        photoContext.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, width, height);
        drawBase();
        requestFrame();
      }
    }

    function leave() {
      pointer.targetX = width / 2;
      pointer.targetY = -height;
      requestFrame();
    }
    function move(event: PointerEvent) {
      if (motion.matches || event.pointerType === "touch" || !backdrop) return;
      const rect = backdrop.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || x > width || y < 0 || y > height) return leave();
      pointer.targetX = x;
      pointer.targetY = y;
      requestFrame();
    }
    function updateActivity() {
      cancelAnimationFrame(animation);
      animation = 0;
      lastTime = 0;
      if (motion.matches) drawBase();
      else requestFrame();
    }

    image.onload = () => {
      loaded = true;
      resize();
      backdrop.dataset.ready = "true";
    };
    image.onerror = () => {
      console.warn("The decorative mountain background could not be loaded.");
      backdrop.dataset.failed = "true";
    };
    image.crossOrigin = "anonymous";
    image.src = MOUNTAIN_IMAGE;
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(backdrop);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateActivity();
    });
    observer.observe(backdrop);
    surface.addEventListener("pointermove", move, { passive: true });
    surface.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", updateActivity);
    motion.addEventListener("change", updateActivity);

    return () => {
      cancelAnimationFrame(animation);
      resizeObserver.disconnect();
      observer.disconnect();
      surface.removeEventListener("pointermove", move);
      surface.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", updateActivity);
      motion.removeEventListener("change", updateActivity);
      image.onload = null;
      image.onerror = null;
    };
  }, []);

  return <div ref={backdropRef} className="hero-backdrop" aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
