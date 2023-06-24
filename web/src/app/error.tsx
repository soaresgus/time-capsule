'use client'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <button
      className="flex flex-1 items-center justify-center p-16"
      onClick={reset}
    >
      <p>
        Um erro inesperado ocorreu,{' '}
        <span className="underline">tente novamente</span>
      </p>
    </button>
  )
}
