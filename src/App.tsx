import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchUsers, updateUser, deleteUser } from './services/api'
import { User, Users, likedType } from 'types/ types'
import Loadingsquare from 'components/Loadingsquare'
import Modal from 'components/Modal'

const App: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Users>([])
  const [errorMsg, setError] = useState<Error | null>(null)
  const [likedUser, setLikedUser] = useState<likedType>({})
  const [modal, setModal] = useState(false)
  const [editId, setEditId] = useState(0)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const getUsers = async () => {
    setLoading(true)
    try {
      const resData = await fetchUsers()
      setData(resData)
    } catch (error) {
      setError(error as Error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id)
      alert("User deleted successfully")
      setData((values) => {
        return values.filter((user: User) => user.id !== id)
      })
    } catch (error) {
      alert(`User deleted failed -> ${error}`)
    }
  }

  const handleLikeUser = async (id: number) => {
    setLikedUser((prevLikedUser: any) => ({
      ...prevLikedUser,
      [id]: !prevLikedUser[id]
    }))
  }

  const handleEditUser = async (userData: User) => {
    try {
      await updateUser(userData)
      setData((prevData) => {
        return prevData.map((user: User) => {
          if (user.id === editId) {
            return userData
          }
          return user
        })
      })
    } catch (error) {
      alert(`User updated failed -> ${error}`)
    }
  }

  const handleClickModal = async (id: number) => {
    setModal(!modal);
    setEditId(id);
    const currentUser = data.find(user => user.id === id);
    if (currentUser) {
        setCurrentUser(currentUser)
    } else {
        setCurrentUser(null)
    }
  }

  const handleModal = async () => {
    setModal(!modal)
  }

  return (
    loading ? <Loadingsquare /> : errorMsg ? <h1>{errorMsg.message}</h1> :
    <>
      {modal ? <Modal onClose={handleModal} onSave={handleEditUser} user={currentUser} /> : null }
      <div className='grid grid-cols-4 gap-4 p-5'>
        {
          data.map((user: User) => {
            const userName = user.username.replaceAll('.', '_')
            const isLiked = !!likedUser[user.id]
            const userPhoto = `https://github.com/SeanChenR/img_gif/blob/main/myimage/${userName}.png?raw=true`
            // const userPhoto = `https://avatars.dicebear.com/v2/avataaars/${user.name}.svg?options[mood][]=happy`
            return (
              <div key={user.id} className="max-w-lg max-h-lg bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg" src={userPhoto} alt="" />
                <div className="p-5 flex flex-col space-y-3">
                    <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user.name}</p>
                    <span className="mb-3 font-bold text-gray-700 dark:text-gray-400">Email: {user.email}</span>
                    <span className="mb-3 font-bold text-gray-700 dark:text-gray-400">Phone: {user.phone}</span>
                    <span className="mb-3 font-bold text-gray-700 dark:text-gray-400">Website: https://{user.website}</span>
                </div>
                <div className="flex m-4 md:mt-6 gap-5 items-end">
                  <button 
                    className={`inline-flex flex-auto justify-center items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 hover:text-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-300 dark:hover:bg-cyan-700 dark:focus:ring-blue-800 ${isLiked ? 'fill-red-600 dark:text-red-600' : 'fill-none dark:text-black'}`}
                    onClick={() => handleLikeUser(user.id)}
                    title='Like User'
                    aria-label='Like User'
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </button>
                  <button 
                    className="inline-flex flex-auto justify-center items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 hover:text-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-300 dark:hover:bg-cyan-700 dark:focus:ring-blue-800 dark:text-black"
                    onClick={() => handleClickModal(user.id)}
                    title='Edit User Info'
                    aria-label='Edit User Info'
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                  <button 
                    className="inline-flex flex-auto justify-center items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 hover:text-amber-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-300 dark:hover:bg-cyan-700 dark:focus:ring-blue-800 dark:text-black"
                    onClick={() => handleDeleteUser(user.id)}
                    title="Delete user"
                    aria-label="Delete user"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App
