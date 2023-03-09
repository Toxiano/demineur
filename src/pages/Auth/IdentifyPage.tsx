import React, {useContext, useState} from 'react'
import ButtonExpand from "../../components/ButtonExpand";
import {GameContext} from "../../HOC/GameContext";

const IdentifyPage = () => {
    const {createUsername} = useContext(GameContext)
    const [username, setUsername] = useState("");

    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <div className="flex justify-center items-center m-10">
                    <h1 className="text-3xl font-bold text-center">Choisissez votre nom d'utilisateur, vous ne pouvez le
                        faire qu'une seule fois.</h1>
                </div>
                <div className="w-4/12 mx-auto rounded-xl border border-gray-100 p-4 shadow-xl p-8">
                    <div className="mb-6">
                        <label
                            htmlFor="username"
                            className="relative block overflow-hidden border-b border-gray-200 pt-3 focus-within:border-blue-600"
                        >
                            <input
                                type="text"
                                id="username"
                                placeholder="Nom d'utilisateur"
                                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <span
                                className="absolute left-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
            {"Nom d'utilisateur"}
          </span>
                        </label>
                    </div>
                    <div className="flex justify-center mt-10">
                        <ButtonExpand
                            text={'Créer'}
                            bgColor={'bg-green-300'}
                            borderColor={'border-green-300'}
                            textColor={'text-green-300'}
                            buttonType={'button'}
                            onClick={() => createUsername(username)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IdentifyPage