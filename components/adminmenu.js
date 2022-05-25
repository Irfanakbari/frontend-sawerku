import Link from "next/link";


const Menu = (props) => {
    const {bghover }= props;
    return (
        <Link href={props.to}>
            <div 
                style={
                    {
                        backgroundColor: props.bgwarna,
                    }
                }
            className={`border-4 rounded-3xl border-black p-3 hover:cursor-pointer`}>
                <div className="text-left text-[28px] font-zillaSlabMedium">
                    {props.title}
                </div>
                <br />
                <div className="text-left text-[20px] font-zillaSlabLight">
                    {props.desc}
                </div>
                <br />
                <br />
                <br />
            </div>
        </Link>
    )
}


export default Menu