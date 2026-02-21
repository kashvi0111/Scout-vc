"use client"

export function AnimatedOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute top-[10%] left-[15%] h-[500px] w-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'float-orb-1 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-[50%] right-[10%] h-[400px] w-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
          filter: 'blur(120px)',
          animation: 'float-orb-2 25s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[10%] left-[40%] h-[450px] w-[450px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)',
          filter: 'blur(110px)',
          animation: 'float-orb-3 22s ease-in-out infinite',
        }}
      />
    </div>
  )
}
