import React from 'react';
import {
    bool, string, oneOfType, func, shape, object, node
} from 'prop-types';
import { Route, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import Dropdown from 'src/Dropdown';
import styles from './index.less';

function objectIsEmpty(obj) {
    // eslint-disable-next-line guard-for-in
    for (const key in obj) {
        return false;
    }

    return true;
}

function Logo() {
    return <div className={styles.logo}>
        <NavLink to='/' exact activeClassName={styles.active}>
            CMU Fencing
        </NavLink>
    </div>;
}

function HeaderLink({ to, children, ...props }) {
    return typeof children === 'function'
        ? <Route path={to} children={children} {...props} />
        : <NavLink
            to={to}
            exact
            activeClassName={styles.active}
            {...props}
        >
            {children}
        </NavLink>;
}

HeaderLink.propTypes = {
    to: string.isRequired,
    children: oneOfType([func, node])
};

function DropdownButton({ to, title, isOpen }) {
    function Child({ isActive }) {
        const classes = classNames(styles.button, {
            [styles.active]: isActive,
            [styles.open]: isOpen
        });

        const onClick = event => event.preventDefault();

        return <a className={classes} href='' onClick={onClick}>
            {title}
        </a>;
    }

    Child.propTypes = {
        isActive: bool
    };

    return <HeaderLink
        to={to}
        exact={false}
        children={Child}
    />;
}

DropdownButton.propTypes = {
    to: string.isRequired,
    title: string.isRequired,
    isOpen: bool
};

function DropdownMenu({ to, title, children }) {
    return <div className={styles.menu}>
        <HeaderLink to={to}>{title}</HeaderLink>
        {renderRoutes(to, children)}
    </div>;
}

DropdownMenu.propTypes = {
    to: string.isRequired,
    title: string.isRequired,
    isOpen: bool,
    children: object.isRequired
};

function renderRoutes(parent, children) {
    return Object.keys(children)
        .map((name, i) => {
            const { children: grandchildren, title, path } = children[name];

            if (objectIsEmpty(grandchildren)) {
                return <HeaderLink
                    key={i}
                    to={path}
                >
                    {title}
                </HeaderLink>;
            }

            const button = <DropdownButton
                to={path}
                title={title}
            />;

            const { enter, enterActive, exit, exitActive } = styles;

            return <Dropdown
                key={i}
                className={styles.dropdown}
                button={button}
                transition={{
                    appear: true,
                    classNames: {
                        enter, enterActive, exit, exitActive,
                        appear: enter,
                        appearActive: enterActive
                    },
                    timeout: 300
                }}
            >
                <DropdownMenu
                    to={path}
                    title={title}
                >
                    {grandchildren}
                </DropdownMenu>
            </Dropdown>;
        });
}

export default function Header({ routeConfig }) {
    return <header className={styles.header}>
        <nav>
            <Logo />
            {renderRoutes('', routeConfig.children)}
        </nav>
    </header>;
}

Header.propTypes = {
    routeConfig: shape({
        path: string.isRequired,
        title: string.isRequired,
        children: object.isRequired
    })
};

