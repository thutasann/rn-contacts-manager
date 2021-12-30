import { useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import LoginComponent from '../../components/login';
import login from '../../context/actions/auth/login';
import { GlobalContext } from '../../context/Provider';


const LoginScreen = () => {

    const { params } = useRoute();
    const [ form , setForm ] = useState({});
    const [ justSignedUp, setJustSignedUp ] = useState(false);

    useEffect(() => {
        if(params?.data){
            console.log(`params =>`, params);
            setJustSignedUp(true);
            setForm({
                ...form,
                userName: params.data.userName,
            })
        }
    }, [params]);


    const {  authDispatch, authState: {error, loading } } = useContext(GlobalContext);

    const onChange = ({ name, value }) =>{
        setJustSignedUp(false);
        setForm({
            ...form,
            [name] : value
        });
    }

    const onSubmit = () =>{
        if(form.userName && form.password){
            login(form)(authDispatch)
        }
    };

    return (
        <LoginComponent
            onSubmit={onSubmit}
            onChange={onChange}
            form={form}
            error={error}
            loading={loading}
            justSignedUp={justSignedUp}
        />
    )
}

export default LoginScreen
