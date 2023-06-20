import { LinkButton } from './Button'

export function Hero() {
  return (
    <div className="space-y-5">
      <div className="max-w-[420px] space-y-1">
        <h1 className=" text-[40px] font-bold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>
        <p
          className="text-lg leading-relaxed
            "
        >
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <LinkButton href="/memories/new" title="cadastrar lembrança" />
    </div>
  )
}
