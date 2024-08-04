"use client"

import useAuth from "@/app/utils/useAuth";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DeleteItem(context) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");

    const loginUserEmail = useAuth()

    useEffect(() => {
        const getSingleItem = async (id) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {
                cache: "no-store",
            })
            const jsonData = await response.json()
            const singleItem = await jsonData.singleItem
            setTitle(singleItem.title)
            setPrice(singleItem.price)
            setImage(singleItem.image)
            setDescription(singleItem.description)
            setEmail(singleItem.email)
        }
        getSingleItem(context.params.id)
    }, [context])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${context.params.id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    email: "tatsuhiro.0130+0803@gmail.com"
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        } catch (error) {
            alert("アイテム削除失敗")
        }
    }

    if (loginUserEmail === email) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <div>
                    <Image src={image} width={750} height={500} alt="item-image" priority/>
                </div>
                <div>
                    <h1>{title}</h1>
                    <h2>¥{price}</h2>
                    <hr />
                    <p>{description}</p>
                    <button onClick={handleSubmit}>削除</button>
                </div>
            </div>
        );
    } else {
        return <h1>権限がありません</h1>
    }
}