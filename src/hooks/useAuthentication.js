import { db } from "../firebase/config";
import { useState, useEffect } from "react";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
 } from "firebase/auth";

 export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState(null)

    const auth = getAuth()

    function  checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    // Função de registro
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false) 

            return user

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message);

            let systemErrorMessase

            if (error.message.includes("Password")) {
                systemErrorMessase = "A senha precisa conter pelo menos 6 caracteres."
            } else if (error.message.includes("email-already")) {
                systemErrorMessase = "E-mail já cadastrado"
            } else {
                systemErrorMessase = "Ocorreu erro, por favor tente mais tarde"
            }

            setLoading(false) 
            setError(systemErrorMessase)
        }
        
        setLoading(false)        
    }

    // Função de Logout - sign out
    const logout = () => {

        checkIfIsCancelled();
        signOut(auth)
    }

    // Função de Login - SIgn in
    const login = async (data) => {

        console.log("DATA: ", data);
        
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            
            await signInWithEmailAndPassword(auth, data.email, data.password);

        } catch (error) {
            
            console.log("ERRO: ", error)
            let systemErrorMessase;

            if (error.message.includes("auth/invalid-credential")) {
                systemErrorMessase = "Usuário não encontrado."
            } else if (error.message.includes("wrong-password")){
                systemErrorMessase = "Senha incorreta."
            } else {
                systemErrorMessase = "Ocorreu um erro, por favor, tente mais tarde."
            }

            setError(systemErrorMessase)
            setLoading(false);
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
 }