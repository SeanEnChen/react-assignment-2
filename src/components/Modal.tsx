import React, { useState, useEffect } from 'react'
import { modalType } from '../types/ types'
import { fetchUser } from 'services/api'
import { User } from '../types/ types'

interface modalTypeWithUser extends modalType {
    user: User | null;
}

const Modal: React.FC<modalTypeWithUser> = ({onClose, onSave, user}: modalTypeWithUser) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setPhone(user.phone)
      setWebsite(user.website)
    }
  }, [user]);

  const handleSave = () => {
    if (user){
      const updatedUser = {
        ...user,
        name,
        email,
        phone,
        website
      } as User
      onSave(updatedUser)
      onClose()
    }
  }

  return (
    <div className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center">
        <div className="w-1/4 rounded-xl bg-slate-50 dark:bg-gray-700 p-10 shadow-md shadow-stone-400 dark:shadow-slate-500 flex flex-col gap-3">
            <h1 className="text-4xl dark:text-white">Edit User</h1>
            <div className="mb-5 border-y-2 border-dashed border-cyan-500 py-2">
              <label htmlFor="name" className="after:content-['*'] after:ml-0.5 after:text-xl after:text-red-600 block mb-2 text-xl font-medium text-gray-900 dark:text-white">Name</label>
              <input type="text" id="name" className="w-full mb-3 shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Sean" required value={name} onChange={(e) => setName(e.target.value)} />

              <label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-xl after:text-red-600 block mb-2 text-xl font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email" id="email" className="w-full mb-3 shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="example@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
              {/* <p className="invisible peer-invalid:visible pb-2 text-red-500">Please provide a valid email address.</p> */}

              <label htmlFor="phone" className="after:content-['*'] after:ml-0.5 after:text-xl after:text-red-600 block mb-2 text-xl font-medium text-gray-900 dark:text-white">Phone</label>
              <input type="text" id="phone" className="w-full mb-3 shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="0912345678" required value={phone} onChange={(e) => setPhone(e.target.value)} />

              <label htmlFor="website" className="after:content-['*'] after:ml-0.5 after:text-xl after:text-red-600 block mb-2 text-xl font-medium text-gray-900 dark:text-white">Website</label>
              <input type="text" id="website" className="w-full mb-3 shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="sean.com" required value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSave}>Save</button>
        </div>
    </div>
  )
}

export default Modal