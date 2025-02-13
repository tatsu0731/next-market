import Image from "next/image"
import Link from "next/link"

const getSingleItem = async (id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {
        cache: "no-store",
    })
    const jsonData = await response.json()
    const singleItem = await jsonData.singleItem
    return singleItem
}

export default async function ReadSingleItem(context) {
    const singleItem = await getSingleItem(context.params.id)
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <Image src={singleItem.image} width={750} height={500} alt="item-image" priority/>
            </div>
            <div>
                <h1>{singleItem.title}</h1>
                <h2>¥{singleItem.price}</h2>
                <hr />
                <p>{singleItem.description}</p>
                <Link href={`/item/update/${singleItem._id}`}>アイテム編集</Link>
                <Link href={`/item/delete/${singleItem._id}`}>アイテム削除</Link>
            </div>
        </div>
    );
}