import Image from "next/image";
import Link from "next/link";

export type CardProps = {
  title: string,
  description: string,
  price: string,
  imageUrl: string,
  buttonUrl: string
}

export default function Card({
  title,
  description,
  price,
  imageUrl,
  buttonUrl,
}: CardProps) {
  return (
    <div className="rounded-xl border border-gray-700 p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="aspect-square rounded-lg mb-4">
        <Image className="w-full" src={imageUrl} alt={title} width={250} height={250} />
        <h3 className="text-xl max-w-fit mt-2.5 font-bold bg-gradient-to-r from-accent-400 to-secondary-300 bg-clip-text text-transparent mb-2">
          {title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary-400">{price}</span>
          <Link href={buttonUrl} className="bg-secondary-300 text-white px-6 py-2 rounded-full
                      hover:bg-secondary-400 transition-colors">
            Купить
          </Link>
        </div>
      </div>
    </div>
  )
}
