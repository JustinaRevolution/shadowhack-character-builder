import { useEffect, useRef } from 'react'

const CHARS = 'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF'
const FONT_SIZE = 24
const COL_SPACING = 72  // one column slot every 72px — ~20 slots on a 1440px screen
const DENSITY = 0.35    // ~35% of slots active at any time (~7 streams)
const FRAME_SKIP = 19   // advance every 20th frame (~3fps)

export default function MatrixRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (!ctx) {
      return
    }

    let columns = []
    let animId
    let frame = 0

    function init() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const count = Math.floor(canvas.width / COL_SPACING)
      columns = Array.from({ length: count }, () =>
        Math.random() < DENSITY
          ? Math.floor(Math.random() * -(canvas.height / FONT_SIZE))
          : -(canvas.height / FONT_SIZE) * 20
      )
    }

    function draw() {
      frame++
      if (frame % (FRAME_SKIP + 1) === 0) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.font = `${FONT_SIZE}px monospace`

        columns.forEach((y, i) => {
          const x = i * COL_SPACING
          ctx.fillStyle = '#ffffff'
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y * FONT_SIZE)
          ctx.fillStyle = '#00ff41'
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, (y - 1) * FONT_SIZE)

          if (y * FONT_SIZE > canvas.height && Math.random() > 0.99) {
            columns[i] = Math.floor(Math.random() * -(canvas.height / FONT_SIZE))
          }
          columns[i]++
        })
      }

      animId = requestAnimationFrame(draw)
    }

    init()
    draw()
    window.addEventListener('resize', init)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', init)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 block print:hidden" />
}
