import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function POST(request) {
    const reqBody = await request.json()
    try {
        await connectDB()
        await ItemModel.create(reqBody)
        return NextResponse.json({ message: "アイテム作成成功" });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "アイテム作成失敗" });
    }
}
// mongodb+srv://tatsuhiro0130:<password>@cluster0.khvdnhu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
