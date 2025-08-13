import Link from "next/link"

type Props = {
  h1: string,
  p: string,
  button1Text: string,
  button1Url: string,
  button2Text: string
  button2Url: string
}

export default function Hero({
  h1,
  p,
  button1Text,
  button1Url,
  button2Text,
  button2Url,
}: Props) {
  return (
    <section className="base relative border-app-dashed border-b">
      <span className="border-app-dashed border-b absolute w-full top-[5%] left-0"></span>
      <div className="container border-app-dashed border-l border-r mx-auto text-center px-6 py-32 flex flex-col items-center justify-center min-h-[800px]">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-accent-400 to-secondary-300 bg-clip-text text-transparent mb-8">
            {h1}
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-12">
            {p}
          </p>
          <div className="flex justify-center gap-6">
            <Link href={button1Url} className="bg-accent-300 text-white px-8 py-4 rounded-full 
                        hover:bg-accent-400 transition-colors text-lg">
              {button1Text}
            </Link>
            <Link href={button2Url} className="border-2 border-accent-300 text-accent-300 px-8 py-4 
              rounded-full hover:bg-accent-300 hover:text-white 
              transition-colors text-lg">
              {button2Text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
