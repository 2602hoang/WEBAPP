
import React, { useContext, useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Col, Row, Card, Spin, List, Input, Switch, Divider, Button, Checkbox } from 'antd';
import { UserOutlined, TableOutlined, CalendarOutlined, ReloadOutlined, LogoutOutlined, HomeOutlined, BankTwoTone, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import hot_pot from '../Gui/Asset/hotpot.png'
import { AuthContext } from "../contexts/AuthContext";
import SubMenu from 'antd/es/menu/SubMenu';

import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { formattedTimestamp } from '../utils/DateTime';
import { URL } from '../contexts/url';

function Billaccepted() {
    let [searchParams, setSearchParams] = useSearchParams()
    const [reload, setReload] = useState(false);
    const banid = searchParams.get('id');
    console.log(banid);
    useEffect(() => {
        // getBills();
        getBillaccepted();
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [reload]);
    useEffect(() => {
        const intervalId = setInterval(() => {
          getBillaccepted();
        }, 10000); 
      
        return () => clearInterval(intervalId); 
      }, []);

    const [isActive, setIsActive] = useState(false);
    const xacnhanmon = async (id) => {
        try {
            const response = await axios.post(`${URL}/api/v1/bills/finished/${id}`)

            if (response.data.statusCode === 200) {
                setXacnhan(response.data.data);
                console.log("okee12340", response.data.data);
                setReload(!reload);
            }

        } catch (error) {
            console.log('error: ', error);
        }
    }

    const getBillaccepted = async () => {
        try {
            const response = await axios.get(`${URL}/api/v1/booking/table/${banid}`)

            if (response.data.statusCode === 200) {
                setBillaccepted(response.data.data);
                console.log("okee12341", response.data.data);

            }

        } catch (error) {
            console.log('error: ', error);
        }
    }
    const [xacnhan,setXacnhan]=useState([]);
    const nav = useNavigate();
    const { Logout } = useContext(AuthContext);
    const [billaccepted, setBillaccepted] = useState([]);
    const [check, setCheck] = useState(false)
    const [loading, setLoading] = useState(false)
    const { Header, Content ,Footer} = Layout;
    const handlelogout = async () => {
        await Logout()
        window.location.reload(false);
    }
    // const onMenuClcik = (item) => {
    //     nav(`/${item.key}`)
    // }
    return (

        <Layout style={{ background: '#ffffff', padding: 0, height: 80, width: "100%" }}>

            <Header style={{ background: '#ffffff', padding: 0, height: 80, width: "100%" }}>
                <div style={{ float: 'left', marginLeft: 20, marginRight: 20 }}>
                    <img src={hot_pot} alt="" height={90} width={90} />


                </div>



                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}

                    // onClick={onMenuClcik}
                    // onClick={onMenuClcik}
                    mode="horizontal" style={{ lineHeight: '64px', }}>

                    <Menu.Item



                        style={{ marginRight: 50 }}>
                        <HomeOutlined style={{ fontSize: '25px', color: '#111111', marginRight: 5 }}></HomeOutlined>
                        <span onClick={() => {
                            nav("/");
                        }}> Trang chủ</span>
                    </Menu.Item>





                    {/* <Button style={{height:50,marginTop:10,marginRight:20}}
                          
                          href={`/Bills?id=${banid}`}
                              > */}
                    <SubMenu
                        style={{ marginRight: 50 }}
                        title={
                            <span onClick={() => {

                                nav(`/Bills?id=${banid}`);
                            }}>
                                <CalendarOutlined style={{ fontSize: '25px', color: '#111111' }} />
                                <span>Đơn hàng chờ chấp nhận</span>
                            </span>
                        }>

                    </SubMenu>
                    {/* </Button> */}
                    {/* <SubMenu> */}

                    {/* <Button style={{height:50,marginTop:10,marginRight:50}}
                          
                          href={`/Billaccepted?id=${banid}`}
                              > */}
                    <SubMenu
                        // dataSource={ban}    

                        style={{ marginRight: 50 }}

                        title={

                            <span onClick={() => {
                                nav(`/Billaccepted?id=${banid}`);
                            }}>
                                <CheckOutlined style={{ fontSize: '25px', color: '#111111' }} />
                                <span>Đơn hàng đã chấp nhận</span>
                            </span>

                        }>

                    </SubMenu>
                    {/* </Button> */}


                    <Menu.Item
                        // onClick={() => {
                        //     setLoading(preValue => !preValue);
                        //     // getBills();
                            
                        // }}
                        onClick={() => {
                            setLoading(true)
                            getBillaccepted();
                            setTimeout(() => {
                                setLoading(false);
                            }, 1000);
                           

                        }}
                        key="Billaccepted" style={{ marginRight: 800 }} >
                        <ReloadOutlined style={{ fontSize: '25px', color: '#111111', marginRight: 3 }} />
                        Làm mới</Menu.Item>
                    <Menu.Item>

                    </Menu.Item>


                    <Menu.Item style={{ float: 'right', marginRight: 5, }}
                        onClick={() => {
                            nav('/Blog');
                        }}
                    >

                        <UserOutlined /> Nhân Viên
                    </Menu.Item>

                    <Menu.Item key="/Login" style={{ float: 'right', marginRight: 50, color: 'red' }} >

                        <a onClick={handlelogout} >
                            Đăng xuất</a>

                        <LogoutOutlined style={{ fontSize: '20px', color: 'red', marginLeft: 3, }} />

                    </Menu.Item>



                </Menu>



            </Header>
            <Spin spinning={loading}>
                <Content style={{ padding: 50 }} spi>

                    <div style={{ background: '#ffffcc', padding: 24, minHeight: 280 ,flexDirection:'row'}}>


                        <List

                            grid={{
                                gutter: 100,
                                column: 2,
                                Row:1
                            }}
                            dataSource={billaccepted}
                            renderItem={(item) => (

                                <List.Item style={{
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    flex: 1,
                                    textAlign: 'center',
                                    fontWeight: item.available ? 'normal' : 'bold',
                                }}>
                                    <Card
                                        style={{
                                            //   width: '100%',
                                            backgroundColor: '#CCFF99',
                                            //   height: '600px',
                                            textAlign: 'center',
                                            fontWeight: item.available ? 'normal' : 'bold',
                                        }}
                                    >
                                        <div>

                                            ID: {item.orderId}
                                            <br />
                                            (Đơn Hàng đã Xác Nhận)
                                            <br />
                                            Thời gian Đặt Đơn:{formattedTimestamp(item.createdTime)}
                                            <br />
                                            {item.note && "Ghi chú đơn: " + item.note}
                                            <br />
                                            Đơn Hàng Của Bàn :({item.table.ID})
                                            <br />
                                            
                                        </div>
                                        <br />
                                        

                                        {item && item.items &&  item.items.map((product, index) => (
                                        <Card key={product.product.ID}>
                                            

                                            <br />
                                            Tên Món: {product.product.name}

                                            <br />
                                            Số Lượng: {product.quantity}
                                            <br></br>
                                            <Button
                                                block
                                                style={{ height: 40, fontWeight: "bold", width: 200,
                                                backgroundColor: product.status? '#FF0000' : '#00FF00',
                                            }}
                                                type="primary"
                                                htmlType="submit"
                                                disabled={check}
                                                onClick={() => {
                                                     xacnhanmon(product.billId);
                                                }}
                                            >
                                                Xác Nhận ra Món
                                            </Button>
                                           
                                            
                                            <br />
                                            
                                        </Card>
                                        
                                            ))}
                                           
                                        
                                    </Card>
                                    
                                </List.Item>

                            )}
                        />
                         



                    </div>
                </Content>
            </Spin>
         
        </Layout>



    );
}

export default Billaccepted
