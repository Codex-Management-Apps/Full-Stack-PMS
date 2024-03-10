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
        {<div className=" flex flex-wrap justify-between gap-3 items-center">
            <section>
                <div className="text-sm">
                    <p>{props.name}</p>
                </div>
                <div className='text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-400 text-xs'>
                    {props.description}
                </div>
            </section>
            <span className="inline-flex items-center m-2 px-3 py-1 bg-green-200 hover:bg-green-300 rounded-full text-sm font-semibold text-green-600">
	            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
	            <span className="ml-1">
                    {props.status}
	            </span>
            </span>
        </div>}
        </>

        // This code is for Inactive (Smily beside the status name)(change the color to want you want)

        /*<span class="inline-flex items-center m-2 px-3 py-1 bg-red-200 hover:bg-red-300 rounded-full text-sm font-semibold text-red-600">
	        <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
	        <span class="ml-1">
	            Danger Badge
	        </span>
        </span>*/

        // This code is for Inactive (a dot beside the status name)(change the color to want you want)

        /*<div class="flex space-x-2">
            <div style="padding-top: 0.2em; padding-bottom: 0.2rem" class="flex items-center space-x-1 text-xs px-2 bg-gray-200 text-gray-800 rounded-full">
                <div style="width: 0.4rem; height: 0.4rem" class="bg-gray-500 rounded-full"></div>
                <div>Badge</div>
            </dive>
        </div>*/


    )
}
