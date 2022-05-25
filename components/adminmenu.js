import Link from "next/link";
import { useEffect, useState } from "react";

const Menu = (props) => {
    const [data, setData] = useState([]);
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        setData(props);
        setLoading(false);
    }, [props]);

    return (
        <Link href={props.to}>
            <div
                className={`border-4 rounded-3xl border-black bg-menu1 p-3 hover:cursor-pointer menu`}
            >
                <style jsx>{`
          .menu {
            background-color: ${data.bgwarna};
          }
          .menu:hover {
            background-color: ${data.bghover};
            }
        `}</style>

                <div className="text-left text-[28px] font-zillaSlabMedium">
                    {
                        loading? "Loading..." : data.title
                    }
                </div>
                <br />
                <div className="text-left text-[20px] font-zillaSlabLight">
                    {
                        loading? "Loading..." : data.desc
                    }
                </div>
                <br />
                <br />
                <br />
            </div>
        </Link>
    );
};

export default Menu;
