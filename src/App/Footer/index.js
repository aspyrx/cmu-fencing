import React from 'react';
import { object, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './index.less';

export default function Footer({ routeConfig }) {
    const links = Object.keys(routeConfig.children)
        .map((name, i) => {
            const { title } = routeConfig.children[name];
            return <Link key={i} to={`/${name}/`}>{title}</Link>;
        });

    return <footer className={styles.footer}>
        <nav>
            <Link to='/'>Home</Link>
            {links}
            <div className={styles.right}>
                <span>
                    Email: <a href='mailto:fencing@andrew.cmu.edu'>
                        fencing@andrew.cmu.edu
                    </a>
                </span>
                <span>
                    Site design by <a href='https://szz.io'>Stan Zhang</a>
                </span>
            </div>
        </nav>
    </footer>;
}

Footer.propTypes = {
    routeConfig: shape({
        path: string.isRequired,
        title: string.isRequired,
        children: object.isRequired
    })
};

