import { Header } from "@/features";
import { Slider } from "@/widgets";

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main className="border-b border-app-dashed">
        <Slider
          title="Ваша коллекция"
          cards={
            [
              { buttonUrl: '/', description: 'id 7777', imageUrl: '/nft.jpg', price: '100$', title: 'Monkey' },
              { buttonUrl: '/', description: 'id 7777', imageUrl: '/nft.jpg', price: '100$', title: 'Monkey' },
              { buttonUrl: '/', description: 'id 7777', imageUrl: '/nft.jpg', price: '100$', title: 'Monkey' },
              { buttonUrl: '/', description: 'id 7777', imageUrl: '/nft.jpg', price: '100$', title: 'Monkey' },
              { buttonUrl: '/', description: 'id 7777', imageUrl: '/nft.jpg', price: '100$', title: 'Monkey' },
              { buttonUrl: '/', description: 'id 7777', imageUrl: '/nft.jpg', price: '100$', title: 'Monkey' },
              { buttonUrl: '/', description: 'id 7777', imageUrl: '/nft.jpg', price: '100$', title: 'Monkey' },
              { buttonUrl: '/', description: 'id 7777', imageUrl: '/nft.jpg', price: '100$', title: 'Monkey' },
              { buttonUrl: '/', description: 'id 7777', imageUrl: '/nft.jpg', price: '100$', title: 'Monkey' },
              { buttonUrl: '/', description: 'id 7777', imageUrl: '/nft.jpg', price: '100$', title: 'Monkey' },
            ]
          }
        />
      </main>
    </>
  );
}
