import Sider, { type SiderTheme } from 'antd/es/layout/Sider';
import { FallOutlined, PieChartOutlined, RiseOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Menu, type GetProp, type MenuProps, type MenuTheme } from 'antd';
import { Link, useLocation } from 'react-router';
import { useTheme } from 'antd-style';

function SideNavigation() {
    const [collapsed, setCollapsed] = useState(false);
    const themeSwitch = useTheme().appearance;
    const location = useLocation();

    type MenuItemData = {
        key: string;
        path?: string;
        label: string;
        icon?: React.ReactNode;
        children?: MenuItemData[];
    };

    const data: MenuItemData[] = [
        {
            key: "1",
            path: "/",
            label: "Dashboard",
            icon: <PieChartOutlined />
        },
        {
            key: "2",
            path: "/expenses",
            label: "Expenses",
            icon: <FallOutlined />
        },
        {
            key: "3",
            path: "/income",
            label: "Income",
            icon: <RiseOutlined />
        },
        {
            key: "4",
            label: "Settings",
            icon: <SettingOutlined />,
            children: [
                {
                    key: "5",
                    path: "/settings/categories",
                    label: "Categories"
                },
                {
                    key: "6",
                    path: "/settings/information",
                    label: "Information"
                }
            ]
        },
    ];

    type MenuItem = GetProp<MenuProps, 'items'>[number];

    const buildMenuItems = (items: MenuItemData[]): MenuItem[] =>
        items.map(item => ({
            key: item.key,
            icon: item.icon,
            label: item.path ? <Link to={item.path}>{item.label}</Link> : item.label,
            children: item.children ? buildMenuItems(item.children) : undefined,
        }));
    
    const items: MenuItem[] = buildMenuItems(data);

    //  Map paths to keys for quick lookup
    const pathToKey: Record<string, string> = {};
    const buildPathToKey = (items: MenuItemData[]) => {
        items.forEach(item => {
            if (item.path) pathToKey[item.path] = item.key;
            if (item.children) buildPathToKey(item.children);
        });
    };
    buildPathToKey(data);

    // Find the key for the current path
    const selectedKey = pathToKey[location.pathname] || '1';

    return (
    <>
        <Sider collapsible collapsed={collapsed} theme={themeSwitch as SiderTheme} onCollapse={(value) => setCollapsed(value)}> 
                <Menu
                theme={themeSwitch as MenuTheme}
                defaultSelectedKeys={[selectedKey]}
                selectedKeys={[selectedKey]}
                mode="inline"
                items={items}
                />
        </Sider>
    </>
    )
}

export default SideNavigation;