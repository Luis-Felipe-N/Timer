import { ReactNode } from "react"

const STATUS_COLOR = {
    yellow: '--yellow-500',
    green: '--green-500',
    red: '--red-500',
}

interface IStatusColors {
    children: ReactNode;
    color: keyof typeof STATUS_COLOR;
}

export function StatusColors({ children, color }: IStatusColors) {
    return (
        <span>
            { children }
        </span>
    )
}