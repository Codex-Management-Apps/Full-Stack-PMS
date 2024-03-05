import { cn } from "@/lib/utils"

export type DCardProps = {
    name: string,
    description?: string,
    status: string
}

export function CardContent(props:React.HTMLAttributes<HTMLDivElement>){
    return (
        <div 
        {...props}
        className={cn(
            'flex w-full flex-col gap-3 rounded-xl border p-5 shadow',
            props.className
        )} />
    )
};
export default function Card(props : DCardProps){
    return(
        <>
        {<div className=" flex flex-wrap justify-between gap-3">
            <section>
                <div className="text-sm">
                    <p>{props.name}</p>
                </div>
                <div className='text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-400'>
                    {props.description}
                </div>
            </section>
            <p>{props.status}</p>
        </div>}
        </>
    )
}
