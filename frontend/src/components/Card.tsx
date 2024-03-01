
export type DCardProps = {
    name: string,
    designation: string,
    status: string
}

export default function Card(props : DCardProps){
    return(
        <div className=" flex flex-wrap justify-between gap-3">
            <section>
                <div className="text-sm">
                    <p>{props.name}</p>
                </div>
                <div className='text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-400'>
                    {props.designation}
                </div>
            </section>
            <p>{props.status}</p>
        </div>
    )
}