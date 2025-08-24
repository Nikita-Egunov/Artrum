import { Header } from "@/features/profile";
import { Slider } from "@/widgets";
import { JSX } from "react";

export default function ProfilePage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="border-b border-app-dashed">
        {/* <Slider
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
        /> */}
      </main>
    </>
  );
}
