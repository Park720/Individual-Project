import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import ModeContext from '../context/ModeContext';
import { usePosts } from '../context/PostsContext';
import {
    HomeIcon, SearchIcon, ExploreIcon, ReelsIcon,
    MessageIcon, NotifIcon, CreateIcon, MoreIcon
} from './Icons';

const navbarContent = [
    { label: 'Home',          icon: HomeIcon,    path: '/' },
    { label: 'Search',        icon: SearchIcon,  path: '/search' },
    { label: 'Explore',       icon: ExploreIcon, path: null },
    { label: 'Reels',         icon: ReelsIcon,   path: null },
    { label: 'Messages',      icon: MessageIcon, path: null },
    { label: 'Notifications', icon: NotifIcon,   path: null },
    { label: 'Create',        icon: CreateIcon,  path: null, action: 'openModal' },
    { label: 'Profile',       icon: null,        path: '/profile' },
    { label: 'More',          icon: MoreIcon,    path: null, bottom: true },
];

function Navbar() {
    const location = useLocation();
    const { theme, toggleTheme } = useContext(ModeContext);
    const { openModal } = usePosts();

    const actions     = { openModal };
    const mainItems   = navbarContent.filter(item => !item.bottom);
    const bottomItems = navbarContent.filter(item =>  item.bottom);

    const renderItem = ({ label, icon: Icon, path, action }) => {
        const isActive  = path && location.pathname === path;
        const className = `${styles.navItem} ${isActive ? styles.active : ''}`;

        const iconEl    = Icon
            ? <Icon filled={isActive} />
            : <div className={styles.profileAvatar}>J</div>;
        const content = (
            <>
                <span className={styles.navIcon}>{iconEl}</span>
                <span className={styles.navLabel}>{label}</span>
            </>
        );

        return path
            ? <Link key={label} to={path} className={className}>{content}</Link>
            : <a    key={label} onClick={action ? actions[action] : undefined} className={className}>{content}</a>;
    };

    return (
        <nav className={styles.nav}>
            <Link to="/" className={styles.logo}>Instagram</Link>
            <div className={styles.navLinks}>{mainItems.map(renderItem)}</div>
            <div className={styles.bottomSection}>
                <div className={styles.divider} />
                <button className={styles.themeToggle} onClick={toggleTheme}>
                    <span className={styles.toggleIcon}>{theme === 'dark' ? '●' : '○'}</span>
                    <span className={styles.navLabel}>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                {bottomItems.map(renderItem)}
            </div>
        </nav>
    );
}

export default Navbar;