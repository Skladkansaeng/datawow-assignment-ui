import axiosInstance from "@/utils/axios"
import { redirect, RedirectType, useRouter } from "next/navigation"
import { useState } from "react"

export const useLoginPage = () => {
    const [username, setUsername] = useState('')
    const router = useRouter()


    const login = async () => {
        try {
            const { data } = await axiosInstance.post('/user/auth', { username })
            localStorage.setItem('authToken', data?.token)
            router.push("/homepage")
        } catch (e) {
            alert('Login Error!')
        }

    }


    return { login, setUsername, username }
}