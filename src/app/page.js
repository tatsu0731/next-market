import Image from "next/image";
import Link from "next/link";

const getAllItems = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readall`, {
    cache: "no-store",
  })
  const jsonData = await response.json()
  const allItems = jsonData.allItems
  return allItems
}

export default async function ReadAllItems () {
  const allItems = await getAllItems()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-red font-bold">こんにちは</h1>
      <h3 className="text-red font-bold">さようなら</h3>
      {allItems.map(item =>
        <Link href={`/item/readsingle/${item._id}`} key={item._id}>
          <Image src={item.image} height={500} width={750} alt="item-image priority"></Image>
          <div>
            <h2>{item.price}</h2>
            <h3>{item.title}</h3>
            <p>{item.description.substring(0, 80)}...</p>
          </div>
        </Link>
      )}
    </main>
  );
}
