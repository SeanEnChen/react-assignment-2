interface Geo {
    lat: string
    lng: string
}

interface Address {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: Geo
}

interface Company {
    name: string
    catchPhrase: string
    bs: string
}

export interface User {
    id: number
    name: string
    username: string
    email: string
    address: Address
    phone: string
    website: string
    company: Company
}

export type Users = User[]

export interface likedType {
    [id: number]: boolean
}

export interface modalType {
    onClose: () => void;
    onSave: (userData: User) => void;
}