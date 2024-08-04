import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-gray-800 text-white text-center p-4">
            <div>
                <Link href={"/"}>
                    <Image src="next.svg" width={1330} height={148} alt="logo" priority/>
                </Link>
            </div>
            <nav>
                <ul>
                    <li><Link href={"/user/register"}>登録</Link></li>
                    <li><Link href={"/user/login"}>ログイン</Link></li>
                    <li><Link href={"/item/create"}>アイテム作成</Link></li>
                </ul>
            </nav>
        </header>
    );
}