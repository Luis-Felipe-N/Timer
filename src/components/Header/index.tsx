import Image from "next/image";

import style from './style.module.scss'
import { Scroll, Timer } from "@phosphor-icons/react";
import Link from "next/link";

export function Header() {
    return (
        <header className={style.header}>
            <Image
                alt=""
                src="./logo-ignite.svg"
                width={40}
                height={40}
            />
            <nav>
                <Link href={'/'}>
                    <Timer size={24} />
                </Link>
                <Link href={'/history'}>
                    <Scroll size={24} />
                </Link>
            </nav>
        </header>
    )
}