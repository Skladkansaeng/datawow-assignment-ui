import axiosInstance from "@/utils/axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const useLoginPage = () => {
    const [username, setUsername] = useState('')
    const router = useRouter()


    const register = async () => {
        try {
            await axiosInstance.post('/user', { username, image: '' })
            router.push("/login")
        } catch (e) {
            alert('User Error!')
        }

    }


    return { register, setUsername, username }
}