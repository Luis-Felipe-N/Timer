import { ReactNode, useRef } from "react"

interface IStatusColors {
    yellow: '--yellow-500',
    green: '--green-500',
    red: '--red-500',
}

const STATUS_COLOR: IStatusColors = {
    yellow: '--yellow-500',
    green: '--green-500',
    red: '--red-500',
}

interface IStatusColorsProps {
    children: ReactNode;
    color: keyof typeof STATUS_COLOR;
}

export function StatusColors({ children, color }: IStatusColorsProps) {
    
    return (
        <span>
            <span style={{backgroundColor: `var(${STATUS_COLOR[color]})`}}></span>
            { children }
        </span>
    )
}