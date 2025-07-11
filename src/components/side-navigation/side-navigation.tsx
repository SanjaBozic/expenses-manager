import Sider, { type SiderTheme } from 'antd/es/layout/Sider';
import { FallOutlined, PieChartOutlined, RiseOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Menu, type GetProp, type MenuProps, type MenuTheme } from 'antd';
import { Link } from 'react-router';
import { useTheme } from 'antd-style';

function SideNavigation() {
    const [current, setCurrent] = useState('1');
    const [collapsed, setCollapsed] = useState(false);
    const themeSwitch = useTheme().appearance;
    type MenuItem = GetProp<MenuProps, 'items'>[number];

    const items: MenuItem[] = [
        {
            key: '1',
            icon: <PieChartOutlined />,
            label: <Link to="/">Dashboard</Link>
        },
        {
            key: '2',
            icon: <FallOutlined />,
            label: <Link to="/deduction">Deduction</Link>
        },
        {
            key: '3',
            icon: <RiseOutlined />,
            label: <Link to="/income">Income</Link>
        },
        {
            key: '4',
            label: 'Settings',
            icon: <SettingOutlined />,
            children: [
            { key: '5', label: <Link to="/account">Account</Link> },
            { key: '7', label: <Link to="/aboutus">About Us</Link> },
            ]
        }
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return (
    <>
        <Sider collapsible collapsed={collapsed} theme={themeSwitch as SiderTheme} onCollapse={(value) => setCollapsed(value)}> 
                <Menu
                theme={themeSwitch as MenuTheme}
                onClick={onClick}
                defaultSelectedKeys={['1']}
                selectedKeys={[current]}
                mode="inline"
                items={items}
                />
        </Sider>
    </>
    )
}

export default SideNavigation;