
import React, { useContext, useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Col, Row, Card, Spin, List, Input, Switch, Divider, Button } from 'antd';
import { UserOutlined, TableOutlined, CalendarOutlined, ReloadOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons';
import hot_pot from '../Gui/Asset/hotpot.png'
import { AuthContext } from "../contexts/AuthContext";
import SubMenu from 'antd/es/menu/SubMenu';
import { useNavigate } from 'react-router-dom';

//import Table from './Tables';
import axios from 'axios';

//import { URL } from '../contexts/url';








function Home() {


    useEffect(() => {
        getBan();
        //setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
          getBan();
        }, 10000); 
      
        return () => clearInterval(intervalId); 
      }, []);


    const getBan = async () => {
        // console.log(`${URL}api/v1/tables`);
        try {
            const response = await axios.get(`/api/v1/tables/all`)

            if (response.data.statusCode === 200) {
                setban(response.data.data);
                console.log("okee", response.data.data);

            }

        } catch (error) {
            console.log('error: ', error);
        }
    }
    const nav = useNavigate();
    const [ban, setban] = useState([]);

    const [loading, setLoading] = useState(false)
    const { Logout } = useContext(AuthContext);
    const { Header, Content ,Footer} = Layout;
    //const { Header, Content } = Layout;


    const handlelogout = async () => {
        await Logout()
        window.location.reload(false);
    }
    const onMenuClcik = (item) => {
        nav(`${item.key}`)
    }
    
    return (

        <Layout style={{ background: '#ffffff', padding: 0, height: 80,width: "100%" }}>
            
            <Header style={{ background: '#ffffff', padding: 0, height: 80, width: "100%" }}>
                <div style={{ float: 'left', marginLeft: 20, marginRight: 20 }}>
                    <img src={hot_pot} alt="" height={90} width={90} />


                </div>



                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}


                    onClick={onMenuClcik}
                    mode="horizontal" style={{ lineHeight: '64px', }}>

                    <Menu.Item key="/" style={{ marginRight: 50 }}>
                        <HomeOutlined onClick={() => {
                            getBan();
                        }} style={{ fontSize: '25px', color: '#111111', marginRight: 5 }}></HomeOutlined>
                        Trang chủ
                    </Menu.Item>

                    {/* <SubMenu key="/"
                        style={{ marginRight: 70 }}
                        title={
                            <span

                            >
                                <TableOutlined style={{ fontSize: '25px', color: '#111111' }} />
                                <span>Phòng bàn</span>
                            </span>
                        }>
                        <Menu.Item key="Tables" style={{ marginRight: 50 }}>Bàn Trống</Menu.Item>
                        <Menu.Item key="Tables1" style={{ marginRight: 50 }}>Bàn Đã Sử Dụng</Menu.Item>
                    </SubMenu> */}


                    {/* <SubMenu key="sub2"
                        style={{ marginRight: 70 }}
                        title={
                            <span>
                                <CalendarOutlined style={{ fontSize: '25px', color: '#111111' }} />
                                <span>Đơn hàng</span>
                            </span>
                        }>
                        <Menu.Item key="/Bills" >Đơn hàng chờ chấp nhận</Menu.Item>
                        <Menu.Item key="/Billaccepted" >Đơn hàng đã chấp nhận</Menu.Item>
                        <Menu.Item key="5" >Đơn hàng đã từ chối</Menu.Item>
                    </SubMenu> */}
                    {/* <SubMenu> */}

                    <Menu.Item
                        onClick={() => {
                            setLoading(true)
                            getBan();
                            setTimeout(() => {
                                setLoading(false);
                            }, 1000);
                           

                        }}
                        key="/" style={{ marginRight: 1200 }} >
                        <ReloadOutlined style={{ fontSize: '25px', color: '#111111', marginRight: 3 }} />
                        Làm mới</Menu.Item>
                    <Menu.Item>

                    </Menu.Item>

                        {/* <div style={{right:0}}> */}
                    <Menu.Item key="/Blog" style={{ float: 'right', right:0 , }}>

                        <UserOutlined /> Nhân Viên
                    </Menu.Item>

                    <Menu.Item key="/Login" style={{ float: 'right',right:0, color: 'red' }} >

                        <a onClick={handlelogout} >
                            Đăng xuất</a>

                        <LogoutOutlined style={{ fontSize: '20px', color: 'red', marginLeft: 3, }} />

                    </Menu.Item>
                    {/* </div> */}


                </Menu>



            </Header>
            <Spin spinning={loading}>
                <Content style={{ padding: 50 }} spi>

                    <div style={{ background: '#ffffcc', padding: 24, minHeight: 280 }}>

                        <List

                            grid={{
                                gutter: 100,
                                column: 3,
                            }}
                            dataSource={ban}
                            renderItem={(item) => (
                               
                                <List.Item  >
                                     <Button 
                                     href={`/bills?id=${item.ID}`}
                                     style={{
                                        width: '100%',
                                        backgroundColor: item.available ? '#fff' : '#ffff6c',
                                        height: '400px',
                                        textAlign: 'center',
                                        color:item.available ?'black':'red',
                                        fontWeight:item.available ?'normal':'bold',}}>
                                    <Card 
                                    style={{
                                        width: '100%',
                                        backgroundColor: item.available ? '#fff' : '#ffff6c',
                                        height: '300px',
                                        textAlign: 'center',
                                        color:item.available ?'black':'red',
                                        // fontSize:item.available? "none":"100px",
                                        fontWeight:item.available ?'normal':'bold',}}

                                     title={"Tên bàn: " + item.ID}  >
                                        Số Lượng Khách: {item.capacity}
                                        <br></br>
                                        Trạng Thái: {item.available ? "TRỐNG" : "CÓ KHÁCH"}
                                        <br></br>
                                        Khu Vực : {item.area.ID === 1 ? "F1A1" : "F1A2"}
                                    </Card>
                                    </Button>
                                </List.Item>
                              
                            )}
                        />



                    </div>
                </Content>
            </Spin>
            <Footer >
                <div style={{float:'left'}}>
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
            <div style={{float:'right'}}>
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
            
        </Layout>
    


    );
}

export default Home
