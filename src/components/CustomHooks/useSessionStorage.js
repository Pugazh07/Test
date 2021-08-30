import { useState } from "react";

export const useSessionStorage= (key, initialValue) => {
    const [value, setValue]=useState(()=>{
    return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : initialValue;
})
    return [value,setValue]
}