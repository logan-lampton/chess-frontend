import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../axiosConfig";
import Dropdown from "../components/Dropdown";
import { useUserContext } from "../App";
import LoadingSpinner from "../components/LoadingSpinner";
import Back from "../components/Back";

function ViewClubGames() {
    const [games, setGames] = useState([]);
    const { id } = useParams();
    const { loading, setLoading } = useUserContext();

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("token");
        axios
            .get(`/games/in_progress/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setGames(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching club data: ", error);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        console.log(games);
    }, [games]);

    const deleteGame = async (gameId) => {
        const token = localStorage.getItem("token");
        try {
            const deleteResponse = await axios.delete(
                `http://localhost:3000/games/${gameId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Game deleted: ", deleteResponse);
            setGames(games.filter((game) => game.id !== gameId));
        } catch (error) {
            console.error("Error fetching club data: ", error);
        }
    };

    const patchGame = async (gameId, dropdownResult) => {
        const token = localStorage.getItem("token");
        try {
            const patchResponse = await axios.patch(
                `http://localhost:3000/games/${gameId}`,
                {
                    result: dropdownResult,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Game winner declared: ", patchResponse);
        } catch (error) {
            console.error("Error fetching game data: ", error);
        }
    };

    return (
        <>
            <Back to={`/clubs/${id}`} />
            <div className='relative'>
                {loading && <LoadingSpinner />}
                {!loading && (
                    <>
                        <button className='absolute top-12 right-8 h-15 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mb-4'>
                            <Link
                                to={`/games/completed/${id}`}
                                className='text-white'
                            >
                                View Completed Games
                            </Link>
                        </button>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 my-20 mx-auto text-lg'>
                            {games.map((game) => (
                                <div key={game.id} className='mt-5 mb-5 p-8'>
                                    <div className='border-2 border-gray-900'>
                                        <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-2 flex justify-between'>
                                            <h3>
                                                {game.player_name_white} /{" "}
                                                {game.player_name_black}
                                            </h3>
                                            <button
                                                onClick={() =>
                                                    deleteGame(game.id)
                                                }
                                                className='text-black p-1 text-sm ml-2'
                                            >
                                                Cancel Game
                                            </button>
                                        </div>
                                        <div className='ml-5 p-1'>
                                            <p className='mb-1'>
                                                White Player:{" "}
                                                {game.player_name_white}
                                            </p>
                                            <p>
                                                Black Player:{" "}
                                                {game.player_name_black}
                                            </p>
                                            <div className='flex mt-3 mb-2'>
                                                <p className='mt-3'>Winner:</p>
                                                <div className='ml-2 align-middle'>
                                                    <Dropdown
                                                        patchGame={patchGame}
                                                        gameId={game.id}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default ViewClubGames;
