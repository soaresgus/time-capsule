import Link, { LinkProps } from 'next/link'

interface IButtonProps extends LinkProps {
  title: string
}

export function LinkButton(props: IButtonProps) {
  return (
    <Link
      className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
      {...props}
    >
      {props.title}
    </Link>
  )
}
