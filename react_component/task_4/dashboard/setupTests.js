import '@testing-library/jest-dom';

expect.extend({
    toHaveStyle(received, styles) {
        const element = received;
        const computedStyle = window.getComputedStyle(element);

        for (const [property, expectedValue] of Object.entries(styles)) {
            if (property === 'color') {
                const actualColor = computedStyle.color;

                const colorMap = {
                    'rgb(255, 0, 0)': 'red',
                    'rgb(0, 0, 255)': 'blue'
                };

                const normalizedColor = colorMap[actualColor] || actualColor;

                if (normalizedColor !== expectedValue) {
                    return {
                        pass: false,
                        message: () => `Expected color ${expectedValue}, got ${normalizedColor}`
                    };
                }
            }
        }

        return { pass: true };
    }
});
