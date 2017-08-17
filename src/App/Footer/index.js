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
            <div className={styles.left}>
                <Link to='/'>Home</Link>
                {links}
            </div>
            <div className={styles.right}>
                <span>
                    Email: <a href='mailto:fencing@andrew.cmu.edu'>
                        fencing@andrew.cmu.edu
                    </a>
                </span>
                <span>
                    Site design by <a href='https://szz.io'>Stan Zhang</a>
                </span>
                <span>
                    Source on <a href='https://github.com/aspyrx/cmu-fencing'>
                        GitHub
                    </a>
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

