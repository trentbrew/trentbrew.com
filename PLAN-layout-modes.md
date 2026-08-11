# Plan: Layout Modes + Freeform Canvas for trentbrew.com Desktop

## Overview
Layer the 7 layout modes from `sandbox/react-grid` into the existing Vue2 desktop. The current float/dock system becomes the `floating` mode. Layout modes add structured tiling (grid, niri, fibonacci, etc.) and a zoomable freeform canvas.

## Architecture: What ports cleanly vs what needs adaptation

### Direct copy (no React dependency) — ~370 lines
The layout computation functions are pure functions:
- `layouts/grid.js` — flow grid with per-window gridSizes
- `layouts/niri.js` — horizontal scrolling columns (focused centered)
- `layouts/fibonacci.js` — spiral tiling
- `layouts/stack.js` — offset deck
- `layouts/table.js` — uniform grid table
- `layouts/tabs.js` — one-at-a-time
- `layouts/freeform.js` — zoomable canvas (just passes x/y/w/h through)
- `layouts/floating.js` — current behavior passthrough
- `model.js` — `rect(x, y, w, h, extra)` helper

Input: `{ windows, viewport, focusId, gridSizes, camera, gap }`
Output: `{ rects: { [id]: { x, y, w, h, visible, opacity, scale, z } }, camera, world }`

### Needs Vue2 adaptation — ~400-500 lines
- **State management** (useWM.js → Desktop.vue data/computed/methods)
- **FLIP animations** (LayoutSurface.jsx layoutEffect → Vue watchers + requestAnimationFrame)
- **Camera/pan/zoom** (React wheel/pointer events → Vue event listeners)

### Skip (existing Vue2 handles it)
- WindowFrame.vue (already have Window.vue with vue-resizable)
- Dock system (already works, just needs mode awareness)
- Hash deep-linking (already works)
- Geometry persistence (already works)

---

## Phase 1: Layout Engine — extract pure functions
**Files:** `src/components/desktop/layouts.js` (new)

Copy the 8 layout functions + model.js rect helper into a single `layouts.js`. Zero framework dependency. Export `computeLayout(mode, ctx)`.

```js
// Example: computeLayout('grid', { windows, viewport: {w, h}, focusId, gridSizes })
// Returns: { rects: { 'w-1': {x,y,w,h,visible,...}, ... }, camera: {x,y,zoom} }
```

No changes to existing code yet. This is a pure utility.

## Phase 2: Layout Mode State in Desktop.vue
**Files:** `src/components/desktop/Desktop.vue` (edit)

Add reactive state:
```js
data() {
  return {
    // ... existing
    layoutMode: 'floating',  // 'floating' = current behavior (default)
    viewport: { w: 0, h: 0 },
    camera: { x: 0, y: 0, zoom: 1 },
    gridSizes: {},           // per-window size overrides for grid mode
    morphGen: 0,             // animation trigger counter
  }
}
```

Add computed:
- `visibleWindows` — filter out closed windows
- `computedLayout` — call `computeLayout(layoutMode, { windows: visibleWindows, viewport, focusId, gridSizes, camera })` whenever inputs change

Add methods:
- `setLayoutMode(mode)` — switch mode, bump morphGen
- `focusWindow(id)` — set focusId, bring to front in z-buffer

## Phase 3: Window Positioning via Layout Rects
**Files:** `src/components/desktop/Desktop.vue` + `Window.vue` (edit)

Current flow: Window.vue gets `initialWidth/Height` + `center` flag, computes its own left/top internally.

New flow: Desktop.vue passes computed `left/top/width/height` from `computedLayout.rects[window.id]`. Window.vue accepts these as props and uses them directly (no internal positioning in non-floating modes).

In `floating` mode: keep current behavior (Window.vue does its own positioning with center/random + geometry persistence).
In layout modes: Window.vue renders at the rect positions. No centering, no random, no user drag (except freeform).

Key: the `:style` binding in Window.vue switches between:
- Floating: `left: ${left}px; top: ${top}px` (current, internal state)
- Layout modes: `left: ${rect.x}px; top: ${rect.y}px; width: ${rect.w}px; height: ${rect.h}px` (external, from layout engine)

## Phase 4: FLIP Animations on Mode Switch
**Files:** `src/components/desktop/Desktop.vue` (edit)

Port the FLIP technique from LayoutSurface.jsx:
1. On mode change, capture previous rects for each window
2. Apply new layout rects
3. For each window, compute delta: `dx = prev.x - new.x, dy = prev.y - new.y, sx = prev.w / new.w, sy = prev.h / new.h`
4. Set `transform: translate(dx, dy) scale(sx, sy)` on each window
5. Force reflow (`offsetWidth`)
6. Set `transition: transform 520ms cubic-bezier(0.16, 0.8, 0.24, 1)` and reset transform to identity
7. After transition, clean up inline styles

Use a Vue watcher on `layoutMode` + `morphGen` to trigger FLIP.

## Phase 5: Freeform Canvas (Pan/Zoom)
**Files:** `src/components/desktop/Desktop.vue` (edit)

When `layoutMode === 'freeform'`:
- Wrap the windows in a `<div class="layout-layer">` with `transform: translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})`
- Handle wheel events: `ctrl/meta + scroll` = zoom toward cursor, plain scroll = pan
- Handle space + drag = pan (track space keydown/keyup)
- Handle pinch-to-zoom on trackpad
- Dot-matrix background that tracks camera (Figma-style)
- Double-click titlebar = zoom-to-fit on that window

Port the wheel/pointer handlers from LayoutSurface.jsx (they're vanilla DOM, not React-specific).

## Phase 6: UI Controls + Keyboard Shortcuts
**Files:** `src/components/desktop/Desktop.vue` (edit), dock items (edit)

Add to dock:
- Layout mode switcher (cycle through 7 modes via dock icon or keyboard)
- Or: keyboard shortcuts `1-7` to switch modes directly

Add a small mode indicator to the topbar area (currently hidden in Desktop.vue).

Default keybindings:
- `1` → tabs, `2` → stack, `3` → niri, `4` → table, `5` → grid, `6` → fibonacci, `7` → freeform
- `0` → floating (current behavior)
- `Space+drag` → pan (in freeform)
- `Ctrl+scroll` → zoom (in freeform)

## Phase 7: Persistence
**Files:** `src/components/desktop/Desktop.vue` (edit)

Extend existing localStorage persistence:
- Save `layoutMode` per space/route
- Save `camera` position for freeform mode
- Save `gridSizes` for grid mode
- The existing `trentbrew.windowGeometry` already saves per-slug geometry — extend to also save mode

## What NOT to do
- Don't port WindowFrame.jsx — keep existing Window.vue (vue-resizable)
- Don't port CommandPalette — the dock serves this purpose already
- Don't port Spaces — trentbrew.com has one desktop, not multiple workspaces
- Don't port Zen mode — could add later but not in initial scope

---

## Estimated effort
- Phase 1: ~30 min (copy/paste, verify)
- Phase 2: ~1 hr (state management bridge)
- Phase 3: ~1.5 hr (window positioning refactor)
- Phase 4: ~1 hr (FLIP animations)
- Phase 5: ~1 hr (freeform canvas)
- Phase 6: ~30 min (keyboard shortcuts)
- Phase 7: ~30 min (persistence)

Total: ~6 hrs (one session)

## Risk: The Window.vue refactor (Phase 3)
The biggest structural change is making Window.vue accept externally-computed positions. Currently it has its own internal state for left/top/width/height (for centering, random positioning, drag/resize). In layout modes, this needs to be overridden by the layout engine's rects. The cleanest approach:

- Add a `layoutMode` prop to Window.vue
- When `layoutMode !== 'floating'`: window ignores its own centering/random logic, accepts external left/top/width/height as props
- When `layoutMode === 'floating'`: keep current internal behavior

This avoids breaking the existing floating mode while adding the new layout modes.
