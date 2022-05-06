import React, {FC} from 'react';
import styles from './Layout.module.css';
import {Link, Outlet, useLocation} from "react-router-dom";
import {Layout, Menu} from 'antd';

interface LayoutProps {
}

const {Header, Footer, Content} = Layout;


const Baselayout: FC<LayoutProps> = () => {
    const location = useLocation();
    return (
        <div className={styles.Layout} data-testid="Layout">
            <Layout style={{height: '100%'}}>
                <Header>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[location.pathname]} >
                        <Menu.Item key="/">
                            <span>Quiz</span>
                            <Link to="/"/>
                        </Menu.Item>
                        <Menu.Item key="/results/leaderboard">
                            <span>Leaderboard</span>
                            <Link to="/results/leaderboard"/>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">
                        <Outlet/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    @2022 Behnam. All Rights Reserved
                </Footer>
            </Layout>
        </div>
    )
};

export default Baselayout;
