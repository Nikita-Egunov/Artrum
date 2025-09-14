import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  url: string;
  imgUrl: string;
  btnText: string;
  isWrapped?: boolean;
};

export default function About({
  title,
  description,
  url,
  imgUrl,
  btnText,
  isWrapped = false,
}: Props) {
  return (
    <section id="about" className="container">
      <div className="">
        <div className="px-6 py-20">
          <div
            className={`flex flex-col ${isWrapped ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
          >
            {/* Image placeholder */}
            <div className="flex-1">
              <div className="bg-secondary-500/20 rounded-xl max-h-96 w-full overflow-hidden">
                <Image
                  src={imgUrl}
                  className="w-full h-full"
                  alt={"the most hight cost nft"}
                  height={384}
                  width={600}
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-8">
              <h2
                className="text-4xl w-fit font-bold bg-gradient-to-r from-accent-400 to-secondary-300 
                      bg-clip-text text-transparent"
              >
                {title}
              </h2>
              <p className="text-lg leading-relaxed">{description}</p>
              {/* <Link
                href={url}
                className="border-2 border-secondary-300 text-secondary-300 
                          px-8 py-3 rounded-full hover:bg-secondary-300 
                          hover:text-white transition-colors"
              >
                {btnText}
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
