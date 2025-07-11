import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import '../top-navigation/top-navigation.css';
import { Menu, Switch, type GetProp, type MenuProps, type MenuTheme } from 'antd';
import { useTheme } from 'antd-style';

interface TopNavigationProps {
    switchTheme: (checked: boolean) => void
}

function TopNavigation(props: TopNavigationProps) {
    const themeSwitch = useTheme().appearance;
    type MenuItem = GetProp<MenuProps, 'items'>[number];

    const items: MenuItem[] = [
        {
            key: '1',
            label: 'Expenses Manager',
            className: 'top-nav__item-title'
        },
        {
            key: '2',
            label: <Switch checkedChildren={<MoonOutlined />} unCheckedChildren={<SunOutlined />} onClick={props.switchTheme} />,
            className: 'top-nav__theme-switch'
        }
    ];

    return (
    <>
        <Menu className='top-nav' mode="horizontal" theme={themeSwitch as MenuTheme} items={items} />
    </>
    )
}

export default TopNavigation;

