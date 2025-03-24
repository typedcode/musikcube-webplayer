import { test, expect, describe } from 'vitest';;
import secondsToTime from '../../../src/common/secondsToTime';

describe('secondsToTime', () => {
    test('even seconds', () => {
        expect(secondsToTime(53)).toBe("0:53");
    });

    test('less then 10 seconds', () => {
        expect(secondsToTime(8)).toBe("0:08");
    });

    test('seconds with some milliseconds', () => {
        expect(secondsToTime(53.28373)).toBe("0:53");
    });

    test('whole minutes', () => {
        expect(secondsToTime(1800)).toBe("30:00");
    });

    test('minutes and seconds', () => {
        expect(secondsToTime(1836)).toBe("30:36");
    });

    test('whole houres', () => {
        expect(secondsToTime(3600)).toBe("1:00:00");
    });

    test('houres and minutes', () => {
        expect(secondsToTime(3660)).toBe("1:01:00");
    });

    test('houres, minutes and seconds', () => {
        expect(secondsToTime(59482)).toBe("16:31:22");
    });
});
