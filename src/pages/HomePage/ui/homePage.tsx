import { About, Footer, Header, Hero, Slider } from "@/widgets";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero
        h1="Приветствую тебя в своём магзине артов"
        p="Здесь ты можешь купить AFT. Это ценность на этой площадке"
        button1Text="Купить"
        button1Url="/shop"
        button2Text="О нас"
        button2Url="/about"
      />
      <Slider
        title="Доступные для покупки арты"
        cards={[
          { buttonUrl: '/', description: 'id этого арта: 777', imageUrl: '/nft.jpg', price: '99$', title: 'Title' },
          { buttonUrl: '/', description: 'id этого арта: 777', imageUrl: '/nft.jpg', price: '99$', title: 'Title' },
          { buttonUrl: '/', description: 'id этого арта: 777', imageUrl: '/nft.jpg', price: '99$', title: 'Title' },
          { buttonUrl: '/', description: 'id этого арта: 777', imageUrl: '/nft.jpg', price: '99$', title: 'Title' },
          { buttonUrl: '/', description: 'id этого арта: 777', imageUrl: '/nft.jpg', price: '99$', title: 'Title' },
          { buttonUrl: '/', description: 'id этого арта: 777', imageUrl: '/nft.jpg', price: '99$', title: 'Title' },
        ]}
      />
      <About
        title="Немного об Artrum"
        description="
          Эта старнная площадка была создана для того чтобы продавать арты. 
          Т.е. вы покупаете id фотографии из моей базы данных.
          Всё)
          Возможно кто то захочет его купить, возмоджно и нет. 
        "
        url="/about"
        imgUrl="/theRiachestNft.jpg"
        btnText="Хочу знать всё"
      />
      <div className="border-app-dashed border-t">
        <Slider
          title="Редкие арты"
          cards={[
            { buttonUrl: '/', description: 'id этого арта: 777', imageUrl: '/nft.jpg', price: '99$', title: 'Title' },
            { buttonUrl: '/', description: 'id этого арта: 777', imageUrl: '/nft.jpg', price: '99$', title: 'Title' },
            { buttonUrl: '/', description: 'id этого арта: 777', imageUrl: '/nft.jpg', price: '99$', title: 'Title' },
            { buttonUrl: '/', description: 'id этого арта: 777', imageUrl: '/nft.jpg', price: '99$', title: 'Title' },
            { buttonUrl: '/', description: 'id этого арта: 777', imageUrl: '/nft.jpg', price: '99$', title: 'Title' },
            { buttonUrl: '/', description: 'id этого арта: 777', imageUrl: '/nft.jpg', price: '99$', title: 'Title' },
          ]}
        />

        <About
          title="Вообще, а зачем это всё?"
          description="Честно, не знаю. Просто мне было в прикол разработать такой сервис где люди могут дарить друг другу цифровые подарки и собирать коллекции вроде бы как NFT, но за меньшие деньги"
          url="/about"
          imgUrl="/merge.png"
          isWrapped={true}
          btnText="Хочу знать всё"
        />
      </div>
      <Footer />
    </>
  )
}