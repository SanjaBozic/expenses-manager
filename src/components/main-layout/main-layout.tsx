import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { ThemeProvider } from 'antd-style';
import { useState } from 'react';
import '../top-navigation/top-navigation.css';
import TopNavigation from '../top-navigation/top-navigation';
import SideNavigation from '../side-navigation/side-navigation';
import PageRoutes from '../routes/page-routes';
import { BrowserRouter as Router } from 'react-router';

type themeAppearance = 'light' | 'dark';

function MainLayout() {
    const [theme, setTheme] = useState<themeAppearance>('light');

    const switchTheme = (checked: boolean) => {
        setTheme(checked ? 'dark' : 'light');
    };

    return (
    <>
    <ThemeProvider appearance={theme}>
        <Layout style={{height:"100vh"}}>
            <Header>
                <TopNavigation switchTheme={switchTheme}/>
            </Header>
            <Router>
                <Layout>
                    <SideNavigation/>
                    <Layout>
                        <Content>
                            <PageRoutes/>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Sanja Božić Ribarić ©{new Date().getFullYear()}
                        </Footer>
                    </Layout>
                </Layout>
            </Router>

        </Layout>
    </ThemeProvider>
    </>
    )
}

export default MainLayout;

