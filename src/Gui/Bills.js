
import React, { useContext, useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Col, Row, Card, Spin, List, Input, Switch, Divider, Button, Modal } from 'antd';
import { UserOutlined, TableOutlined, CalendarOutlined, ReloadOutlined, LogoutOutlined, HomeOutlined, BankTwoTone, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import hot_pot from '../Gui/Asset/hotpot.png'
import { AuthContext } from "../contexts/AuthContext";
import SubMenu from 'antd/es/menu/SubMenu';

import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { formattedTimestamp } from '../utils/DateTime';
import TextArea from 'antd/es/input/TextArea';

function Bills() {
    let [searchParams, setSearchParams] = useSearchParams()
    const ban = searchParams.get('id');



    useEffect(() => {
        getBills();
        // getBillaccepted();
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    useEffect(() => {
        const intervalId = setInterval(() => {
            getBills();
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);
    // /api/v1/booking/accepted/?orderId=1
    const acceptedbills = async (orderId) => {
        try {
            const response = await axios.patch(`/api/v1/booking/accepted/?orderId=${orderId}`);
            if (response.data.statusCode === 200) {
                nav(`/Billaccepted?id=${ban}`);
                console.log("thanh công");
            }

        } catch (error) {
            console.log('error', error);
        }
    }
    // /api/v1/booking/rejected/?orderId=1
    const rejectedbills = async (orderId,note) => {
        try {
            const response = await axios.patch(`/api/v1/booking/rejected/?orderId=${orderId}&reason="${note}"`);
            console.log(note);
            if (response.data.statusCode === 200) {
                // nav(`/Billaccepted?id=${ban}`);
                console.log("thanh công");
            }

        } catch (error) {
            console.log('error', error);
        }
    }
    const getBills = async () => {
        try {
            const response = await axios.get(`/api/v1/booking/table/preparing/${ban}`)

            if (response.data.statusCode === 200) {
                setBills(response.data.data);
                console.log("okee123", response.data.data);

            }

        } catch (error) {
            console.log('error: ', error);
        }
    }

    const nav = useNavigate();
    const [bills, setBills] = useState([]);
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState('');
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText('Đang từ chối đơn');
        // rejectedbills(Bills.orderId)
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };


    const [loading, setLoading] = useState(false)
    const { Logout } = useContext(AuthContext);
    const { Header, Content, Footer } = Layout;
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

                    {/* <Button
                    style={{height:50,marginTop:10,marginRight:20}}
                          
                          href={"/"}
                    > */}
                    <Menu.Item



                        style={{ marginRight: 50 }}>
                        <HomeOutlined style={{ fontSize: '25px', color: '#111111', marginRight: 5 }}></HomeOutlined>
                        <span onClick={() => {
                            nav("/");
                        }}> Trang chủ</span>
                    </Menu.Item>
                    {/* </Button> */}



                    {/* <Button style={{height:50,marginTop:10,marginRight:20}}
                          
                          href={`/Bills?id=${ban}`}
                              > */}
                    <SubMenu key="Bills"
                        style={{ marginRight: 50 }}
                        title={
                            <span
                                onClick={() => {
                                    nav(`/Bills?id=${ban}`);
                                }}

                            >
                                <CalendarOutlined style={{ fontSize: '25px', color: '#111111' }} />
                                <span>Đơn hàng chờ chấp nhận</span>
                            </span>
                        }>

                    </SubMenu>
                    {/* </Button> */}
                    {/* <SubMenu> */}

                    {/* <Button style={{height:50,marginTop:10,marginRight:50}}
                          
                          href={`/Billaccepted?id=${ban}`}
                              > */}
                    <SubMenu
                        // dataSource={ban}    

                        style={{ marginRight: 50 }}

                        title={

                            <span onClick={() => {
                                nav(`/Billaccepted?id=${ban}`);
                            }}>
                                <CheckOutlined style={{ fontSize: '25px', color: '#111111' }} />
                                <span>Đơn hàng đã chấp nhận</span>
                            </span>

                        }>

                    </SubMenu>
                    {/* </Button> */}
                    {/* {console.log("okeee12",ban)} */}


                    <Menu.Item
                        // onClick={() => {
                        //     setLoading(preValue => !preValue);

                        //     //getBillaccepted();
                        // }}
                        onClick={() => {
                            setLoading(true)
                            getBills();
                            setTimeout(() => {
                                setLoading(false);
                            }, 1000);


                        }}
                        key="Bills" style={{ marginRight: 800 }} >
                        <ReloadOutlined style={{ fontSize: '25px', color: '#111111', marginRight: 3 }} />
                        Làm mới</Menu.Item>
                    <Menu.Item>

                    </Menu.Item>


                    <Menu.Item key="/Blog" style={{ float: 'right', marginRight: 5, }}
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
                <Content style={{ padding: 50 }} >

                    <div style={{ background: '#ffffcc', padding: 24, minHeight: 280 }}>

                        <List

                            grid={{
                                gutter: 100,
                                column: 3,
                            }}
                            dataSource={bills}
                            renderItem={(item) => (

                                <List.Item style={{
                                    width: '100%',
                                    backgroundColor: item.available ? '#fff' : '#ffff6c',
                                    flex: 1,
                                    textAlign: 'center',
                                    fontWeight: item.available ? 'normal' : 'bold',
                                }}>
                                    <Card
                                        style={{
                                            //   width: '100%',
                                            backgroundColor: item.available ? '#fff' : '#ffff6c',
                                            //   height: '600px',
                                            textAlign: 'center',
                                            fontWeight: item.available ? 'normal' : 'bold',
                                        }}
                                    >
                                        <div>

                                            ID: {item.orderId}
                                            <br />
                                            Thời gian Đặt Đơn:{formattedTimestamp(item.createdTime)}
                                            <br />
                                            {item.note && "Ghi chú đơn: " + item.note}
                                            <br />
                                            Đơn Hàng Của Bàn :({item.table.ID})
                                        </div>
                                        <br />

                                        {item.items.map((product) => (
                                            <Card key={product.ID}>


                                                <br />
                                                Tên Món: {product.product.name}

                                                <br />
                                                Số Lượng: {product.quantity}
                                                <br />
                                            </Card>
                                        ))}
                                        <div style={{ flexDirection: 'row' }}>
                                            <Button
                                                onClick={() => {
                                                    acceptedbills(item.orderId);
                                                }}
                                                block style={{ height: 40, width: '50%', fontWeight: "bold", backgroundColor: '#00FF00' }} type="primary" htmlType="submit">Xác Nhận</Button>
                                            <Button
                                                onClick={() => {
                                                    //  rejectedbills(item.orderId);
                                                    showModal();
                                                }}
                                                block style={{ height: 40, width: '50%', fontWeight: "bold", backgroundColor: 'red' }} type="primary" htmlType="submit">Từ Chối</Button>
                                        </div>
                                        <Modal
                                            title="Lý Do Từ Chối"
                                            open={open}
                                            onOk={()=>{
                                                handleOk();
                                                console.log("note nè",note);
                                                rejectedbills(item.orderId,note);
                                            }}
                                            confirmLoading={confirmLoading}
                                            onCancel={handleCancel}
                                        >
                                            <TextArea
                                                onChange={(text) => {
                                                    setNote(text);
                                                }}
                                                placeholder="Nhập Lý Do từ chối đơn"
                                            />
                                        </Modal>
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

export default Bills
