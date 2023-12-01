import React, { useContext, useState } from "react";
import './Login.css'
import hot_pot from '../Gui/Asset/hotpot.png'
import { Button, Form, Input } from "antd";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
    const [form] = Form.useForm();
    const [err, setErr] = useState("");
    const nav = useNavigate();
    const { Login,  errorLogin} = useContext(AuthContext);


  
  
    const HandleLogin = async () => {
        const { username, password } = form.getFieldValue();
        try {

            const LoginData = await Login({
                username: username,
                password: password
            })
            if ((!LoginData.success)) {
                // errorLogin();
                // toast.success("Đăng nhập thành công!");
                setTimeout(() => setErr(''), 3000)
            }
            else {
                errorLogin();
                // toast.error("Email hoặc mật khẩu khồng đúng, vui lòng thử lại!");
                nav("/");
            }

        } catch (error) {
            console.log(error);
            // errorLogin();
            toast.error("Email hoặc mật khẩu khồng đúng, vui lòng thử lại!");
        }
    }

    return (

        <div className="container" >
            <img src={hot_pot} alt="" height={400} width={400} />
            <h2 >Nhà Hàng Lẩu "Xuýt Xoa"</h2>
            <Form className="loginForm" form={form} onFinish={HandleLogin}>
                <Form.Item
                    style={{
                        height: 60,
                        padding: 10,
                    }}
                    rules={[
                        {
                             
                            required: true,
                            type: "string",
                            message: "Vui Lòng không để trống ",
                            
                        },
                    ]}
                    label={<span style={{ fontWeight: "500", }}>UserName</span>} name={"username"}>
                    <Input style={{ height: 40 }} placeholder="Nhập UserName " />
                </Form.Item>
                <Form.Item
                    style={{
                        height: 60,
                        padding: 10,
                    }}
                    rules={[
                        {
                            
                            required: true,
                            message: "Vui Lòng không để trống",
                        },
                    ]}
                    label={<span style={{ fontWeight: "500", }}>Mật khẩu</span>} name={"password"}>
                    <Input.Password
                        style={{ height: 40 }}
                        placeholder="Nhập mật khẩu" />
                </Form.Item>
                <div
                    style={{
                        textAlign: 'center',
                        padding: 5,
                        color: 'red'
                    }}>{ errorLogin}</div>
                <Button block style={{ height: 40, fontWeight: "bold" }} type="primary" htmlType="submit">Đăng Nhập</Button>
            </Form>

            <div>____________________________________________________________</div>
            <h3> Đăng nhập để sử dụng ứng dụng </h3>
        </div>
    )
}
export default Login