import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

import { getYears, getPopulationPerYear, getYearIndex } from './DataParser';

import './App.css';

const App = ({history, location}) => {
    const years = getYears();
    const [selectedYear, setSelectedYear] = useState(+years[0]);
    const [tick, setTick] = useState(0);
    const [isPlaying, setPlay] = useState(false);

    const timerRef = useRef();
    const progressRef = React.createRef();
    const yearsCount = (years.length - 1);
    const chartData = getPopulationPerYear(selectedYear);

    const setPlayPause = () => {
        const year = selectedYear <= years[yearsCount] ? selectedYear : +years[0];
        history.push(`${location.pathname}?paused=${isPlaying}&year=${year}`);
        if (isPlaying) {
            clearTimeout(timerRef.current);
        }
        setPlay(!isPlaying);
    };

    const checkUrlParams = () => {
        const search = history.location.search;
        if (search) {
            setSelectedYear(+search.split('&year=')[1]);
            const isPaused = search.split('?paused=')[1].split('&')[0] === 'false';
            setPlay(isPaused);
        } else {
            history.push(`${location.pathname}?paused=true&year=${(+years[0])}`);
        }
    };

    const updateProgressBar = () => {
        const currentYearIndex = getYearIndex(years, selectedYear);
        const progressValue = currentYearIndex > 0 ? (100 / yearsCount) * currentYearIndex : 0;
        progressRef.current.style.width = progressValue + '%';
    };

    const changeCurrentYear = () => {
        if (isPlaying) {
            const isLastYear = selectedYear >= years[yearsCount];
            const isPaused = isLastYear ? 'true' : 'false';
            const nextYear = isLastYear ? +years[0] : selectedYear + 1;
            setSelectedYear(nextYear);
            history.push(`${location.pathname}?paused=${isPaused}&year=${nextYear}`);
            setPlay(!isLastYear);
        }
    };

    useEffect(() => {
        checkUrlParams();
    }, []);

    useEffect(() => {
        updateProgressBar();
    });

    useEffect(() => {
        changeCurrentYear();
    }, [tick]);

    if (isPlaying) {
        timerRef.current = setTimeout(() => { setTick(tick + 1) }, 2000);
    }

    return (
        <div className="App">
            <Bar
                data={chartData}
                width={80}
                height={300}
                options={{maintainAspectRatio: false}}
            />
            <div className="progress-bar">
                <button className={'button-play ' + (isPlaying ? 'playing' : 'paused')} onClick={setPlayPause}/>
                <span className="progress" ref={progressRef}/>
            </div>
        </div>
    );
};

export default App;
