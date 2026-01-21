/* ================================
   Wheel picker – fixed wrapper
================================ */
.wheel-picker-fixed {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(var(--footer-h) + 2px);
  z-index: 30;

  padding: 8px 12px;

  background: rgba(0, 0, 0, 0.38);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);

  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

/* ================================
   Scroll container (wheel physics)
================================ */
.wheel-scroll {
  max-height: 112px;
  overflow-y: auto;

  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
}

/* ================================
   Wheel items
================================ */
.wheel-item {
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  font-weight: 500;

  scroll-snap-align: center;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

/* ================================
   Spacers (center alignment)
================================ */
.wheel-spacer {
  height: 40px;
  pointer-events: none;
}
