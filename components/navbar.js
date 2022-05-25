import Link from "next/link"

const Navbar = (props) => {
    const { title, children } = props;
    return (
        <div className="block items-center justify-center z-0 rounded-t-2xl border-4 m-2 border-black  overflow-hidden">
            <div className=" w-full border-b-4 border-black  text-center">
                <div className="flex place-content-between font-patrick px-3 text-[30px] p-1 text-white font-semibold border-black bg-[#BB6BD9]">
                    <Link href="/admin">
                        <div className="text-center hover:cursor-pointer hover:text-green-500">Back</div>
                    </Link>
                    <div className="text-center">{title}</div>
                </div>
            </div>
            <main>
                {children}
            </main>
        </div>
    )
}

export default Navbar