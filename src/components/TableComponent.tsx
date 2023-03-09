import React from 'react'
import {HistoryGame} from "../interfaces/storage";

interface TableComponentProps {
    data: HistoryGame[]
}

const TableComponent = ({data}: TableComponentProps) => {

    const formatTime = (time: number) => {
        if (time < 60) {
            return `${time} secondes`
        }
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;
        return `${minutes}m ${seconds}s`
    }

    return (
        <>
            <div className="m-20">
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-gray-200 border-b">
                                    <tr>
                                        <th scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            #
                                        </th>
                                        <th scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Niveau
                                        </th>
                                        <th scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Gagné
                                        </th>
                                        <th scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Temps
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        data.map((item, index) => {
                                            return (
                                                <tr key={index}
                                                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index}</td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {item.level}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">


                                                        {item.cheat ? item.win ? "T'as gagné en trichant" : "T'as perdu en trichant, t'es null" : item.win ? "T'as gagné" : "T'as perdu"}
                                                        {/*{item.win && item.cheat ? "Tu as gagné en trichant" : "Tu as perdu en pleurant tu es null"}*/}

                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {formatTime(item.time)}
                                                    </td>
                                                </tr>

                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default TableComponent
