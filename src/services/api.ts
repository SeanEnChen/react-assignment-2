import { Users, User } from '../types/ types';

const BASE_URL = "https://jsonplaceholder.typicode.com/users"

export const fetchUsers = async () => {
    const response = await fetch(BASE_URL)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    if (!response.ok) {
        throw new Error("Failed to fetch user.")
    } else {
        const resData = await response.json() as Users
        return resData
    }
}

export const fetchUser = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`)
    if (!response.ok) {
        throw new Error("Failed to fetch user.")
    } else {
        const resData = await response.json() as User
        return resData
    }
}

export const updateUser = async (user: User) => {
    const response = await fetch(`${BASE_URL}/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    if (!response.ok) {
        throw new Error(`Failed to update user -> status: ${response.status}`)
    }
}

export const deleteUser = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    })
    if (!response.ok) {
        throw new Error(`Failed to delete user -> status: ${response.status}`)
    }
}
