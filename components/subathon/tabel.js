import { useState } from "react";

const TabelWaktu = (props) => {
    const [data, setData] = useState([]);

    const handleChange = (event) => {
        const target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
    };
    return (
        <tr>
            <td className="w-auto text-left">
                <input
                    className="py-2 border-b-[1px] border-black focus:outline-none"
                    type="number"
                    onChange={handleChange}
                    name="gross"
                    placeholder="10000"
                />
                <span className="text-2xl font-zillaSlabBold m-4">=</span>
            </td>
            <td className="w-auto text-left">
                <input
                    className=" py-2 block border-b-[1px] border-black focus:outline-none"
                    type="number"
                    onChange={handleChange}
                    name="jamplus"
                    placeholder="10000"
                />
            </td>
            <td className="w-auto text-left">
                <input
                    className=" py-2 block border-b-[1px] border-black focus:outline-none"
                    type="number"
                    onChange={handleChange}
                    name="minplus"
                    placeholder="10000"
                />
            </td>
            <td className="w-auto text-left">
                <input
                    className=" py-2 block border-b-[1px] border-black focus:outline-none"
                    type="number"
                    onChange={handleChange}
                    name="secplus"
                    placeholder="10000"
                />
            </td>
        </tr>
    );
};

export default TabelWaktu;
