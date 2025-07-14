import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { ThemeProvider } from 'antd-style';
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router';
import './main-layout.css';
import TopNavigation from '../top-navigation/top-navigation';
import SideNavigation from '../side-navigation/side-navigation';
import PageRoutes from '../routes/page-routes';
import { DataContext, useCreateDataCtx } from '../../context/data-context';

type themeAppearance = 'light' | 'dark';

function MainLayout() {
    const [theme, setTheme] = useState<themeAppearance>('light');

    const switchTheme = (checked: boolean) => {
        setTheme(checked ? 'dark' : 'light');
    };

    const data = useCreateDataCtx();

    return (
    <>
    <ThemeProvider appearance={theme}>
        <DataContext.Provider value={data}>
            <Layout className="main-layout">
                <Header>
                    <TopNavigation switchTheme={switchTheme}/>
                </Header>
                <Router>
                    <Layout>
                        <SideNavigation />
                        <Layout>
                            <Content className='main-layout__content'>
                                <PageRoutes/>
                            </Content>
                            <Footer className='main-layout__footer'>
                                Sanja Božić Ribarić ©{new Date().getFullYear()}
                            </Footer>
                        </Layout>
                    </Layout>
                </Router>
            </Layout>
        </DataContext.Provider>
    </ThemeProvider>
    </>
    )
}

export default MainLayout;

