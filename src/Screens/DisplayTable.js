import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from '../redux/slice/todo'

const DisplayTable = () => {
    const [isdataload, setisdataload] = useState(false)
    // const [id, setid] = useState(0)
    var id = 0;

    const deleteClicked = async (ide) => {
        let response = await fetch(`https://backend-peackock.onrender.com/api/deleteUser/${ide}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        setisdataload(false)
        rendering()
    }

    // const loadData = async () => {
    //     let response = await fetch("https://backend-peackock.onrender.com/api/userData", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     });
    //     response = await response.json();
    //     console.log(response);
    // };
    useEffect(() => {
        rendering();
    }, []);

    const dispatch = useDispatch()

    const state = useSelector((state) => state)
    console.log(state)

    // if (state.todo.isLoading) {
    //     return <h1>Loading ...</h1>
    // }

    // dispatch(fetchTodos())

    const rendering = () => {
        if (isdataload == false) {
            // setisdataload(true)
            setisdataload(true)
            dispatch(fetchTodos())
            return <h1>Loading ...</h1>
        }
    }

    return (
        <div>
            <Navbar />
            {/* <div>
                <button onClick={e => dispatch(fetchTodos())} className='className="font-medium text-blue-600 dark:text-blue-500 hover:underline'>Fetch</button>
            </div> */}
            {
                rendering()
            }
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mobile number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Details
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>

                    {state.todo.data ?
                        state.todo.data[0].map((data) => {
                            return (
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {++id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {data.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {data.number}
                                        </td>
                                        <td className="px-6 py-4">
                                            {data.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={`/edit/${data._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to="/display" onClick={() => deleteClicked(data._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</Link>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })
                        : <h1>Loading ...</h1>
                    }
                </table>
            </div>

        </div>
    )
}

export default DisplayTable