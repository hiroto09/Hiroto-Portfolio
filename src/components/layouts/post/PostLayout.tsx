import style from "./PostLayout.module.scss"
import { ReactNode } from 'react';


export default function PostLayout({ children }: { children: ReactNode }) {
    return (
        <div className={style.post}>
            <div className={style.postContent}>
            {children}
            </div>
        </div>
    )
}