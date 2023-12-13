import { createContext, useEffect, useState } from 'react'
import axios from 'axios';
// import { URL } from './url';
import { toast } from 'react-toastify';
import { URL } from './url';


export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

	const [userToken, setUserToken] = useState("demo");
	const [errorLogin, setErrorLogin] = useState(null);
	// const [ban, setban] = useState([]);
	useEffect(() => {
		LoadUserVerified();
		addToken(localStorage.getItem('userToken'));
	}, []);
	
	const LoadUserVerified = async () => {
		if ( localStorage.getItem('userToken')) {
			setUserToken( localStorage.getItem('userToken'));
			addToken( localStorage.getItem('userToken'));
		}
		else setUserToken(null);
		
	}
	
	const Login = async ({username,password}) => {


		console.log(username);
		console.log(password);
				
		try {
			const response = await axios.post(`${URL}/api/v1/auth/sign-in`, 
			
			{
				email: username,
				password: password,
			  } )
			
			if (response.data.message ==="Sign up success: welcome!") {
				// toast.success("Đăng nhập thành công!");
				setErrorLogin('Đăng nhập thành công');
				alert('chào mừng bạn đến với bếp ,đăng nhập thành công🤗🤗🤗')
				setTimeout(() =>{
					setErrorLogin('');
				}, 10000)

				console.log(response.data.data.token)
				 localStorage.setItem('userToken',response.data.data.token);
				setUserToken(response.data.data.token);
				addToken(response.data.data.token);
				window.location.reload(false);
			}
			
		} catch (error) {
			console.log('Loging error: ',error);
			//  toast.error("Email hoặc mật khẩu khồng đúng, vui lòng thử lại!");
			alert('thông xin sai mất rồi ,đăng nhập thất bại😓😓😓')
			setErrorLogin('Thông tin không chính xác');
			setTimeout(() =>{
						setErrorLogin('');
					}, 10000)
		}

		// await localStorage.setItem('userToken',email);
		// 		setUserToken(email);
		// 		addToken(email);
		// 		window.location.reload(false);
	}
	
	const Logout = async () =>{
		 localStorage.removeItem('userToken');
		setUserToken(null);
	}
	
	const addToken=(token)=>{
		if (token) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
		} else {
			delete axios.defaults.headers.common['Authorization']
		}
	}

	return (
		<AuthContext.Provider value={{
			userToken, setUserToken, Login, Logout, errorLogin,setErrorLogin
		}}>
			{children}
		</AuthContext.Provider>
	)
}

