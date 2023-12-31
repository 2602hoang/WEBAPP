import { HomeOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Layout, List, Menu, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import hot_pot from '../Gui/Asset/hotpot.png'
import axios from "axios";
import { URL } from "../contexts/url";

function Blog() {
    const nav = useNavigate();
    const { Header, Content, Footer } = Layout;
    const { Logout } = useContext(AuthContext);
    const handlelogout = async () => {
        await Logout()
        window.location.reload(false);
    }
    const onMenuClcik = (item) => {
        nav(`${item.key}`)
    }
    const [me, setMe] = useState([]);
    useEffect(() => {
        getThongtin();
    }, [])
    const getThongtin = async () => {
        // await wait(3000);
        try {
            const response = await axios.get(`${URL}/api/v1/auth/me`);

            if (response.data.message === "Get user info success: congrats!") {
                setMe(response.data.data);
                console.log("tao ne", response.data.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <Layout style={{ background: '#ffffff', padding: 0, height: 80, width: 1920 }}>
            <Header style={{ background: '#ffffff', padding: 0, height: 80, width: 2000 }}>
                <div style={{ float: 'left', marginLeft: 20, marginRight: 20 }}>
                    <img src={hot_pot} height={90} width={90} />

                </div>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}


                    onClick={onMenuClcik}
                    mode="horizontal" style={{ lineHeight: '64px', }}>

                    <Menu.Item key="/" style={{ marginRight: 50 }}>
                        <HomeOutlined onClick={() => {
                            // getBan();
                        }} style={{ fontSize: '25px', color: '#111111', marginRight: 5 }}></HomeOutlined>
                        Trang chủ
                    </Menu.Item>

                    <Menu.Item key="/Blog" style={{  marginLeft:1200 }}>

                        <UserOutlined /> Nhân Viên
                    </Menu.Item>

                    <Menu.Item key="/Login" style={{  color: 'red' }} >

                        <a onClick={handlelogout} >
                            Đăng xuất</a>

                        <LogoutOutlined style={{ fontSize: '20px', color: 'red', marginLeft: 3, }} />

                    </Menu.Item>



                </Menu>
            </Header>
            <Content style={{ padding: 200 }} spi>

                <div style={{ background: '#ffffcc', padding: 100, justifyContent: 'center', alignItems: 'center ', alignSelf: 'center', flex:1 }}>


                    <Card
                        title="Thông Tin Nhân Viên Bếp "
                        // extra={<a href="#">More</a>}
                        style={{
                            width: '80%',
                            height: '80%',
                            justifySelf: 'center'
                        }}
                    >
                        <p>Họ và Tên Nhân Viên :     &nbsp;&nbsp;&nbsp;&nbsp;      {me.fullName}</p>
                        <p>Số Điện Thoại Của Nhân Viên:   &nbsp;&nbsp;&nbsp;&nbsp;          {me.tel}</p>
                        <p>Giới Tính Nhân Viên :  &nbsp;&nbsp;&nbsp;&nbsp;          {me.gender ? "Nữ" : "Nam"}</p>
                        <p>Chức vụ: &nbsp;&nbsp;&nbsp;&nbsp; {me.ID === 3 ? "Nhân Viên Bếp" : "Nhân Viên"}</p>
                    </Card>






                </div>
            </Content>
            <div style={{margin:300}}></div>
            {/* <div style={{float:'inline-end'}}> */}
            <Footer style={{float:'inline-end',alignSelf:"unset"}} >
                <div style={{ float: 'left' }}>
                    <a1>BẾP NHÀ HÀNG LẨU XUÝT XOA</a1>
                    <br></br>
                    <h>Chức năng:
                        <br></br>
                        Nhận Đơn Theo Bàn
                        <br></br>
                        Từ chối Đơn Theo Bàn
                        <br></br>
                        Xác Nhận Món Ăn Đã Ra Theo Đơn
                    </h >
                </div>

                {/* <div style={{textAlign:'center',color:'red'}}>
                <h1>LÀM VIỆC VỚI CÁI TÂM HƯỚNG VỀ KHÁCH HÀNG</h1>
            </div> */}
                <div style={{ float: 'right' }}>
                    {/* <a1>BẾP NHÀ HÀNG LẨU XUÝT XOA</a1> */}
                    <br></br>
                    <a>Liên Hệ:
                        <br></br>
                        @fda.offical
                        <br></br>
                        fda.contact
                        <br></br>
                        0364015071
                    </a>
                </div>
            </Footer>
            {/* </div> */}



        </Layout>

    )
}
export default Blog