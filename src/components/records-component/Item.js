export default function Item(args) {
    return (  
        <div>
        {
            args.data !== undefined ?
            <div className="item__container">
                <span>{args.data.level}</span> 
                <span>{args.data.minutes} : {args.data.seconds < 10 ? "0" + args.data.seconds : args.data.seconds}</span>
                <span>{args.data.failures}</span>
            </div> :
            <div></div>
        }
        </div>
    )
}