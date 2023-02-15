import { config } from '../app_config';
import swap from './swap';
import { getValue, setColor } from './util';

const { lowestColor } = config.selectionSort;
const { compareColor, baseColor, sortedColor } = config.common;

/**
 * 
 * @param {function} callback 
 * @param {number} delay 
 */
export async function SelectionSort(callback, delay = 100) {
    let container = document.getElementById('container');

    let blocks = container.childNodes;

    for (let i = 0; i < blocks.length; i++) {
        let lowest = i;

        setColor(i, lowest === i ? lowestColor : compareColor);

        for (let j = i + 1; j < blocks.length; j++) {
            setColor(j, compareColor);

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
            let value1 = getValue(j);
            let value2 = getValue(lowest);

            if (value1 < value2) {
                setColor(lowest, baseColor);
                lowest = j;
                setColor(lowest, lowestColor);
            }

            if (j !== lowest) setColor(j, baseColor);
        }
        if (i !== lowest) {
            await swap(blocks[i], blocks[lowest]);

            blocks = container.childNodes;
        }
        setColor(i, sortedColor);
    }
    if (callback) callback();
}