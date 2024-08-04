"use client"

import { useState } from "react";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                }),
            });
            const jsonData = await response.json();
            alert(jsonData.message);
        } catch (err) {
            alert("ユーザーの登録に失敗しました")
        }
    }
    return (
        <div>
            <h1 className="text-red font-bold">ユーザー登録</h1>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="名前を入力してください" required/>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="メールアドレスを入力してください" required/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="パスワードを入力してください" required/>
                <button>登録</button>
            </form>
        </div>
    );
};