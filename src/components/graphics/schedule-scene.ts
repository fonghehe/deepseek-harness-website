/** Give text/font paint priority, then initialize decoration in an idle task. */
export function scheduleScene(start: () => void) {
  let cancelled = false;
  let frame = 0;
  let idle = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const entrance = document.querySelector('.ds-hero-enter');
  const painted = Promise.all([
    document.fonts.ready,
    ...(entrance?.getAnimations() || []).map((animation) =>
      animation.finished.catch(() => undefined),
    ),
  ]);
  void painted.then(() => {
    if (cancelled) return;
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        if (cancelled) return;
        if ('requestIdleCallback' in window)
          idle = window.requestIdleCallback(
            () => {
              if (!cancelled) start();
            },
            { timeout: 1000 },
          );
        else
          timer = setTimeout(() => {
            if (!cancelled) start();
          }, 0);
      });
    });
  });
  return () => {
    cancelled = true;
    cancelAnimationFrame(frame);
    if (idle) window.cancelIdleCallback(idle);
    if (timer) clearTimeout(timer);
  };
}
