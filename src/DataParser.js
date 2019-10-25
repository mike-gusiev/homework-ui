import data from './wild-pig-data.json';

const getPigsByYears = () => {
    let results = {};
    data['PIG POPULATIONS'].forEach(function (pigs) {
        if (results[pigs.year] === undefined) {
            results[pigs.year] = [];
        }
        results[pigs.year].push({
            pigPopulation: pigs.pigPopulation,
            island: pigs.island
        });
    });
    return results;
};

const pigsByYears = getPigsByYears(data);

export const getYears = () => {
    return Object.keys(pigsByYears).sort();
};

export const getPopulationPerYear = (year) => {
    let pigsForOneYear = pigsByYears[year];
    const populations = [];
    const pigIslands = [...new Set(data['PIG POPULATIONS'].map((datum) => (datum.island) ))];
    pigIslands.forEach((pigIsland, i) => {
        populations.push(pigsForOneYear[i].pigPopulation)
    });
    return {
        labels: pigIslands,
        datasets: [
            {
                label: year,
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: populations,
            }
        ]
    };
};

export const getYearIndex = (arr, val) => {
    let index = arr.indexOf(`${val}`);
    if (index !== -1) {
        return index
    }
    return false;
};
