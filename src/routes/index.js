import React from 'react';
import { shape } from 'prop-types';
import { Link } from 'react-router-dom';

import events, { eventShape } from 'src/routes/events/events.js';
import asyncComponent from 'src/async-component';
import HomeContent from 'bundle-loader?lazy!./index.md';
import styles from './index.less';

function Hero() {
    return <div className={styles.hero}>
        <h1>CMU Fencing</h1>
    </div>;
}

function EventPreview(props) {
    const { event: {
        title, location, date, path
    } } = props;

    return <div className={styles.eventPreview}>
        <h3>{date}: <Link to={`/events/${path}`}>{title}</Link></h3>
        <h4>{location}</h4>
    </div>;
}

EventPreview.propTypes = {
    event: shape(eventShape)
};

export default function Home() {
    const Content = asyncComponent(HomeContent);

    return <div className={styles.home}>
        <Hero />
        <Content />
        <Link to="/events/"><h2>Upcoming Events</h2></Link>
        <ul>{events.map((event, i) =>
            <li key={i}><EventPreview event={event} /></li>
        )}</ul>
    </div>;
}

