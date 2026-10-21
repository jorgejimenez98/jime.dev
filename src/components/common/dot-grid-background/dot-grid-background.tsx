"use client"

import { useEffect, useRef } from "react"

// Must match .dot-grid's background-size in globals.css, so the lens lands on its dots
const SPACING = 28
const DOT_RADIUS = 0.5
const LENS_RADIUS = 170
// At the lens center a dot grows by this much and is drawn fully in --primary
const GROW = 0.6
const MIN_ALPHA = 0.06
const MAX_ALPHA = 0.6
// Smoothing (ms): the lens trails the cursor a little, then fades out on leave
const FOLLOW_MS = 60
const FADE_IN_MS = 120
const FADE_OUT_MS = 280

/**
 * The site-wide dot grid. At rest it sits in the margins beside the reading
 * column (.dot-grid, pure CSS, painted with the HTML). This canvas draws the
 * lens around a mouse cursor, only while it moves, everywhere but at half
 * strength under the text (.dot-lens). Touch screens and reduced motion get
 * the still grid alone.
 */
export function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let enabled = false
    let width = 0
    let height = 0
    let color = ""
    let frame = 0
    let lastTime = 0
    let targetX = 0
    let targetY = 0
    let lensX = 0
    let lensY = 0
    let active = false
    let strength = 0

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    // The canvas inherits text-primary, which follows the light/dark theme
    const readColor = () => {
      color = getComputedStyle(canvas).color
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      if (strength < 0.005) return

      context.fillStyle = color
      const firstColumn = Math.max(
        0,
        Math.floor((lensX - LENS_RADIUS) / SPACING)
      )
      const lastColumn = Math.ceil((lensX + LENS_RADIUS) / SPACING)
      const firstRow = Math.max(0, Math.floor((lensY - LENS_RADIUS) / SPACING))
      const lastRow = Math.ceil((lensY + LENS_RADIUS) / SPACING)

      for (let row = firstRow; row <= lastRow; row++) {
        const y = SPACING / 2 + row * SPACING
        for (let column = firstColumn; column <= lastColumn; column++) {
          const x = SPACING / 2 + column * SPACING
          const distance = Math.hypot(x - lensX, y - lensY)
          if (distance >= LENS_RADIUS) continue

          const closeness = 1 - distance / LENS_RADIUS
          const t = closeness * closeness * (3 - 2 * closeness) * strength
          if (t < 0.01) continue

          context.globalAlpha = MIN_ALPHA + (MAX_ALPHA - MIN_ALPHA) * t
          context.beginPath()
          context.arc(x, y, DOT_RADIUS + GROW * t, 0, Math.PI * 2)
          context.fill()
        }
      }
      context.globalAlpha = 1
    }

    const tick = (time: number) => {
      const elapsed = Math.min(time - lastTime, 64)
      lastTime = time
      const follow = 1 - Math.exp(-elapsed / FOLLOW_MS)
      lensX += (targetX - lensX) * follow
      lensY += (targetY - lensY) * follow
      const goal = active ? 1 : 0
      strength +=
        (goal - strength) *
        (1 - Math.exp(-elapsed / (active ? FADE_IN_MS : FADE_OUT_MS)))

      const settled =
        Math.abs(targetX - lensX) < 0.1 &&
        Math.abs(targetY - lensY) < 0.1 &&
        Math.abs(goal - strength) < 0.002
      if (settled) strength = goal
      draw()
      frame = settled ? 0 : requestAnimationFrame(tick)
    }

    const wake = () => {
      if (frame || document.hidden) return
      lastTime = performance.now()
      frame = requestAnimationFrame(tick)
    }

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      targetX = event.clientX
      targetY = event.clientY
      // Entering: the lens appears under the cursor instead of sliding in
      if (!active && strength < 0.005) {
        lensX = targetX
        lensY = targetY
      }
      active = true
      wake()
    }

    const release = () => {
      active = false
      wake()
    }

    const pause = () => {
      if (!document.hidden) return
      cancelAnimationFrame(frame)
      frame = 0
      active = false
      strength = 0
      draw()
    }

    const themeObserver = new MutationObserver(readColor)

    const enable = () => {
      enabled = true
      resize()
      readColor()
      window.addEventListener("pointermove", move, { passive: true })
      window.addEventListener("resize", resize)
      window.addEventListener("blur", release)
      document.documentElement.addEventListener("pointerleave", release)
      document.addEventListener("visibilitychange", pause)
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"]
      })
    }

    const disable = () => {
      enabled = false
      cancelAnimationFrame(frame)
      frame = 0
      active = false
      strength = 0
      // A 0×0 canvas holds no memory on devices that never draw the lens
      canvas.width = 0
      canvas.height = 0
      window.removeEventListener("pointermove", move)
      window.removeEventListener("resize", resize)
      window.removeEventListener("blur", release)
      document.documentElement.removeEventListener("pointerleave", release)
      document.removeEventListener("visibilitychange", pause)
      themeObserver.disconnect()
    }

    const sync = () => {
      const wanted = finePointer.matches && !reducedMotion.matches
      if (wanted && !enabled) enable()
      if (!wanted && enabled) disable()
    }

    sync()
    finePointer.addEventListener("change", sync)
    reducedMotion.addEventListener("change", sync)

    return () => {
      finePointer.removeEventListener("change", sync)
      reducedMotion.removeEventListener("change", sync)
      if (enabled) disable()
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="dot-grid absolute inset-0" />
      <canvas
        ref={canvasRef}
        className="dot-lens absolute inset-0 size-full text-primary"
      />
    </div>
  )
}
