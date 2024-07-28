import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const reqBody = await request.json()
    try {
        await connectDB()
        const savedUserData = await UserModel.findOne({ email: reqBody.email })
        // emailで検索、戻り値はUserのデータ全てってことか
        if (savedUserData) {
            if (reqBody.password === savedUserData.password) {
                const secretKey = new TextEncoder().encode("next-market-app-book");
                const payload = {
                    email: reqBody.email,
                }
                const token = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("1d").sign(secretKey);
                console.log(token)
                return NextResponse.json({ message: "ログイン成功" });
            } else {
                return NextResponse.json({ message: "ログイン失敗：パスワードが間違っています" });
            }
        } else {
            return NextResponse.json({ message: "ログイン失敗：ユーザー登録をしてください" });
        }
    } catch (err) {
        return NextResponse.json({ message: "ログイン失敗" });
    }
}