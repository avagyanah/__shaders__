export const pathPairs: Array<{ from: number; to: number; velocity: number; paths: string[] }> = [
    {
        from: 0,
        to: 0,
        velocity: 1,
        paths: ['p_cc1', 'p_cc2'],
    },
    {
        from: 0,
        to: 1,
        velocity: 1,
        paths: ['p_cr1', 'p_cr1'],
    },
    {
        from: 0,
        to: -1,
        velocity: 1,
        paths: ['p_cl1', 'p_cl1'],
    },

    {
        from: 1,
        to: 0,
        velocity: 1,
        paths: ['p_rc1', 'p_rc2', 'p_rc3'],
    },
    {
        from: 1,
        to: 1,
        velocity: 1,
        paths: ['p_rr1', 'p_rr2'],
    },
    {
        from: 1,
        to: -1,
        velocity: 1,
        paths: ['p_rl1', 'p_rl2'],
    },

    {
        from: -1,
        to: 0,
        velocity: 1,
        paths: ['p_rc1', 'p_rc2', 'p_rc3'],
    },
    {
        from: -1,
        to: 1,
        velocity: 1,
        paths: ['p_rr1', 'p_rr2'],
    },
    {
        from: -1,
        to: -1,
        velocity: 1,
        paths: ['p_rl1', 'p_rl2'],
    },
];

export const pathPairs3: any = {
    p_cc0: {
        velocity: 1,
        vector: { '1': [], '-1': [] },
        limit: [],
    },
};

export const pathPairs2: Record<string, Record<'1' | '-1', string[]>> = {
    p_0: { '1': ['p_1c'], '-1': ['p_1c'] },
    p_1c: { '1': ['p_1c', 'p_1s'], '-1': ['p_1c', 'p_1s'] },
    p_1s: { '1': ['p_2s'], '-1': [] },
    p_2s: { '1': ['p_1c', 'p_1s'], '-1': ['p_1c', 'p_1s'] },
};

export const paths: Record<string, { points: number[] }> = {
    // CENTER => CENTER, VEL:1

    p_cc0: {
        points: [
            0, 64, 0, 0, 64.9, 0, 0, 67.2, 0, 0, 70.9, 0, 0, 76.1, 0, 0, 82.7, 0, 0, 90.7, 0, 0, 100.1, 0, 0, 110.9, 0,
            0, 123.2, 0, 0, 136.9, 0, 0, 152, 0, 0, 168.5, 0, 0, 175.6, 0,
        ],
    },

    p_cc1: {
        points: [
            2.3, 2.3, 0.1, 6.3, -6.3, 0.2, 10.2, -13.5, 0.3, 14.2, -19.4, 0.4, 18.1, -23.7, 0.6, 22.1, -26.7, 0.7, 26,
            -28.2, 0.8, 29.9, -28.3, 0.9, 33.9, -27, 1.1, 37.8, -24.3, 1.2, 41.8, -20.1, 1.3, 45.7, -14.6, 1.4, 49.6,
            -7.6, 1.6, 53.6, 0.8, 1.7, 57.5, 10.7, 1.8, 61.5, 22, 1.9, 65.4, 34.6, 2, 69.3, 48.7, 2.2, 73.3, 64.3, 2.3,
            77.2, 81.2, 2.4, 81.2, 99.6, 2.5, 85.1, 119.4, 2.7, 89, 140.6, 2.8, 93, 163.3, 2.9, 95, 175.6, 3,
        ],
    },
    p_cc2: {
        points: [
            0.3, 3.5, 0, 0.7, -3.1, 0, 1.1, -8.3, 0, 1.6, -12, 0, 2, -14.4, 0.1, 2.5, -15.3, 0.1, 2.9, -14.8, 0.1, 3.4,
            -12.9, 0.1, 3.8, -9.5, 0.1, 4.3, -4.8, 0.1, 4.7, 1.4, 0.1, 5.2, 8.3, 0.2, 6.8, 6, 0.2, 8.4, 5.1, 0.2, 10,
            5.6, 0.3, 11.6, 7.6, 0.3, 13.5, 9.8, 0.4, 15.9, 10.4, 0.4, 18.4, 11.3, 0.5, 21.3, 12.3, 0.6, 24.4, 13.7,
            0.7, 27.8, 15.4, 0.9, 31.4, 17.7, 1, 35.7, 20.2, 1.1, 40.2, 23.4, 1.3, 44.8, 28, 1.4, 49.3, 34.1, 1.5, 53.8,
            41.6, 1.7, 58.4, 50.5, 1.8, 62.9, 60.9, 1.9, 67.5, 72.7, 2.1, 72, 85.8, 2.2, 76.6, 100.5, 2.3, 81.1, 116.5,
            2.5, 85.7, 133.9, 2.6, 90.2, 152.8, 2.8, 94.8, 173.1, 2.9, 95.3, 175.6, 2.9,
        ],
    },

    // CENTER => RIGHT, VEL:1
    p_cr1: {
        points: [
            0.8, 2.9, 0, 2.1, -4.7, 0.1, 3.5, -10.9, 0.1, 4.8, -15.7, 0.2, 6.1, -19.1, 0.2, 7.5, -21, 0.2, 8.8, -21.5,
            0.3, 10.1, -20.6, 0.3, 11.5, -18.3, 0.4, 12.8, -14.5, 0.4, 14.2, -9.4, 0.4, 15.5, -2.8, 0.5, 16.8, 5.3, 0.5,
            19.8, 10.3, 0.6, 25.7, 9, 0.8, 31.5, 9, 0.9, 37.4, 10.5, 1.1, 43.3, 13.4, 1.2, 49.2, 17.7, 1.3, 55.1, 23.5,
            1.5, 60.9, 30.7, 1.6, 66.8, 39.2, 1.8, 72.7, 49.3, 1.9, 78.6, 60.7, 2.1, 84.5, 73.6, 2.2, 90.3, 87.8, 2.4,
            96.2, 103.6, 2.5, 102.1, 120.7, 2.7, 108, 139.2, 2.8, 113.9, 159.2, 3, 119.7, 180.6, 3.1, 120, 181.5, 3.1,
        ],
    },
    p_cr2: {
        points: [
            0.8, 2.9, 0, 2.1, -4.7, 0.1, 3.5, -10.9, 0.1, 4.8, -15.7, 0.2, 6.1, -19.1, 0.2, 7.5, -21, 0.2, 8.8, -21.5,
            0.3, 10.1, -20.6, 0.3, 11.5, -18.3, 0.4, 12.8, -14.5, 0.4, 14.2, -9.4, 0.4, 15.5, -2.8, 0.5, 16.8, 5.3, 0.5,
            19.8, 10.3, 0.6, 25.7, 9, 0.8, 31.5, 9, 0.9, 37.4, 10.5, 1.1, 43.3, 13.4, 1.2, 49.2, 17.7, 1.3, 55.1, 23.5,
            1.5, 60.9, 30.7, 1.6, 66.8, 39.2, 1.8, 72.7, 49.3, 1.9, 78.6, 60.7, 2.1, 84.5, 73.6, 2.2, 90.3, 87.8, 2.4,
            96.2, 103.6, 2.5, 102.1, 120.7, 2.7, 108, 139.2, 2.8, 113.9, 159.2, 3, 119.7, 180.6, 3.1, 120, 181.5, 3.1,
        ],
    },

    // CENTER => LEFT, VEL:1
    p_cl1: {
        points: [
            0.8, 4.5, 0, 2.2, -0.5, 0.1, 3.5, -4, 0.1, 4.9, -6.1, 0.2, 6.2, -6.8, 0.2, 7.6, -6.1, 0.2, 8.9, -4, 0.3,
            10.3, -0.4, 0.3, 11.7, 4.6, 0.4, 13.3, 9.4, 0.4, 16.2, 8.3, 0.5, 19.2, 8.7, 0.6, 22.1, 10.5, 0.6, 24.6,
            13.7, 0.7, 28, 15.2, 0.8, 31.3, 17.5, 0.9, 34.7, 20.1, 1, 38.3, 23.2, 1.2, 42, 27, 1.3, 45.8, 31.7, 1.5,
            49.4, 37.6, 1.6, 52.9, 44.9, 1.8, 56.1, 53.6, 2, 58.9, 63.7, 2.1, 61.4, 75.2, 2.3, 63.6, 88.1, 2.4, 65.5,
            102.5, 2.6, 67.1, 118.3, 2.8, 68.3, 135.5, 2.9, 69.3, 154.2, 3.1, 69.9, 174.2, 3.2, 70, 181.6, 3.3,
        ],
    },

    p_cl2: {
        points: [
            0.8, 2.6, 0, 2.2, -5.7, 0.1, 3.5, -12.5, 0.1, 4.9, -17.9, 0.2, 6.2, -21.9, 0.2, 7.6, -24.5, 0.2, 8.9, -25.6,
            0.3, 10.3, -25.3, 0.3, 11.7, -23.6, 0.4, 13, -20.5, 0.4, 14.4, -16, 0.5, 15.7, -10, 0.5, 17.1, -2.6, 0.5,
            18.1, 6.2, 0.6, 20.8, 9, 0.6, 25.4, 5.9, 0.7, 29.6, 4.1, 0.8, 33.6, 3.8, 0.9, 37.2, 4.9, 1, 40.5, 7.5, 1.1,
            43.5, 11.4, 1.2, 46.2, 16.8, 1.3, 48.7, 23.6, 1.4, 50.8, 31.8, 1.5, 52.5, 41.4, 1.6, 54.9, 52, 1.8, 57.9,
            63.4, 1.9, 60.5, 76.3, 2, 62.9, 90.6, 2.1, 65, 106.3, 2.2, 66.7, 123.5, 2.4, 68.1, 142, 2.5, 69.2, 162, 2.6,
            70, 181.6, 2.7,
        ],
    },

    // RIGHT => CENTER, VEL:1
    p_rc1: {
        points: [
            29.3, 13.1, 0.1, 44.6, 9.8, 0.5, 59.9, 7.9, 0.8, 75.2, 7.4, 1.2, 90.6, 8.4, 1.6, 105.9, 10.7, 1.9, 121.2,
            14.5, 2.3, 136.5, 19.7, 2.6, 150, 24.3, 3, 150.6, 15.4, 3.2, 151.1, 7.9, 3.5, 151.7, 1.8, 3.7, 152.2, -2.9,
            3.9, 152.8, -6.2, 4.2, 153.3, -8, 4.4, 153.8, -8.5, 4.6, 154.4, -7.5, 4.9, 154.9, -5, 5.1, 155.5, -1.2, 5.3,
            156, 4.1, 5.6, 156.6, 10.8, 5.8, 157.1, 18.9, 6, 153.2, 19.1, 6.2, 149.1, 20.3, 6.3, 145, 22.9, 6.4, 140.9,
            27, 6.5, 136.9, 32.5, 6.6, 132.8, 39.4, 6.7, 128.7, 47.7, 6.8, 124.7, 57.5, 6.9, 120.6, 68.7, 7, 116.5,
            81.3, 7.1, 112.5, 95.3, 7.2, 108.4, 110.7, 7.3, 104.3, 127.6, 7.4, 100.2, 145.9, 7.5, 96.2, 165.6, 7.6,
            94.2, 175.6, 7.6,
        ],
    },

    p_rc2: {
        points: [
            28.6, 12.8, 0.1, 41.3, 8.3, 0.3, 54.1, 5.3, 0.6, 66.8, 3.6, 0.9, 79.5, 3.4, 1.2, 92.3, 4.6, 1.4, 105, 7.3,
            1.7, 117.8, 11.3, 2, 130.5, 16.8, 2.3, 143.2, 23.7, 2.6, 147.1, 22.5, 2.7, 144.5, 15.8, 2.9, 141.8, 10.5, 3,
            139.2, 6.6, 3.2, 136.6, 4.2, 3.3, 134, 3.1, 3.5, 131.4, 3.5, 3.6, 128.8, 5.3, 3.7, 126.2, 8.5, 3.9, 123.6,
            13.2, 4, 121, 19.3, 4.2, 118.4, 26.8, 4.3, 115.8, 35.7, 4.4, 113.2, 46, 4.6, 110.6, 57.8, 4.7, 108, 71, 4.9,
            105.4, 85.6, 5, 102.8, 101.6, 5.1, 100.2, 119.1, 5.3, 97.6, 137.9, 5.4, 95, 158.2, 5.6, 92.9, 175.7, 5.7,
        ],
    },

    p_rc3: {
        points: [
            28.7, 13.2, 0.1, 41.8, 10.4, 0.4, 54.9, 9.1, 0.7, 68, 9.1, 1, 81.1, 10.6, 1.3, 94.2, 13.5, 1.6, 107.3, 17.8,
            1.9, 120.4, 23.5, 2.2, 133.5, 30.7, 2.6, 139.6, 33.9, 2.8, 132.8, 28.2, 2.9, 125.9, 23.9, 3, 119, 21, 3,
            112.1, 19.5, 3.1, 105.3, 19.5, 3.2, 98.4, 20.9, 3.3, 91.5, 23.7, 3.4, 84.6, 28, 3.4, 77.8, 33.6, 3.5, 70.9,
            40.7, 3.6, 64, 49.2, 3.7, 57.1, 59.1, 3.8, 59.4, 68.3, 4, 64.1, 78.3, 4.2, 68.8, 89.7, 4.4, 73.5, 102.5,
            4.6, 78.2, 116.7, 4.9, 82.9, 132.3, 5.1, 87.7, 149.4, 5.3, 92.4, 167.9, 5.5, 94.3, 175.6, 5.6,
        ],
    },

    // RIGHT => RIGHT, VEL:1
    p_rr1: {
        points: [
            29, 13, 0.1, 43.2, 9.5, 0.4, 57.4, 7.4, 0.7, 71.6, 6.7, 1.1, 85.8, 7.4, 1.4, 100, 9.5, 1.7, 114.2, 13.1,
            2.1, 128.4, 18.1, 2.4, 142.6, 24.5, 2.7, 146.3, 21.4, 3, 143, 12.3, 3.1, 139.7, 4.7, 3.3, 136.4, -1.5, 3.5,
            133.2, -6.2, 3.7, 129.9, -9.6, 3.9, 126.6, -11.5, 4.1, 123.3, -12, 4.3, 120.1, -11, 4.4, 116.8, -8.7, 4.6,
            113.5, -4.9, 4.8, 110.2, 0.3, 5, 107, 6.9, 5.2, 103.7, 14.9, 5.4, 100.4, 24.4, 5.5, 97.2, 35.3, 5.7, 93.9,
            47.6, 5.9, 90.6, 61.3, 6.1, 87.3, 76.4, 6.3, 84.1, 93, 6.5, 80.8, 111, 6.6, 77.5, 130.4, 6.8, 74.2, 151.3,
            7, 71, 173.5, 7.2, 69.8, 181.7, 7.3,
        ],
    },

    p_rr2: {
        points: [
            28.9, 13.5, 0.1, 42.7, 11.9, 0.4, 56.5, 11.7, 0.7, 70.4, 12.9, 1, 84.2, 15.5, 1.3, 98, 19.5, 1.5, 111.9, 25,
            1.8, 125.7, 31.9, 2.1, 139.6, 40.2, 2.4, 131.7, 35.6, 2.5, 123.4, 32, 2.5, 115.1, 29.9, 2.6, 106.8, 29.1,
            2.6, 98.5, 29.8, 2.7, 90.2, 32, 2.7, 81.9, 35.5, 2.8, 73.6, 40.5, 2.8, 65.3, 46.9, 2.9, 57, 54.7, 2.9, 60.2,
            60.8, 3, 66.5, 67.5, 3.2, 72.8, 75.6, 3.4, 79.1, 85.1, 3.6, 85.4, 96.1, 3.7, 91.7, 108.5, 3.9, 98, 122.3,
            4.1, 104.3, 137.5, 4.3, 110.6, 154.1, 4.4, 116.9, 172.2, 4.6, 119.9, 181.5, 4.7,
        ],
    },

    // RIGHT => LEFT, VEL:1
    p_rl1: {
        points: [
            28.8, 12.9, 0.1, 42.2, 8.8, 0.4, 55.5, 6.2, 0.7, 68.9, 5, 1, 82.3, 5.2, 1.3, 95.7, 6.8, 1.6, 109.1, 9.8,
            1.9, 122.5, 14.3, 2.2, 135.9, 20.2, 2.5, 148.4, 26.6, 2.8, 145, 17.5, 2.9, 141.6, 9.8, 3.1, 138.2, 3.6, 3.3,
            134.8, -1.2, 3.4, 131.5, -4.6, 3.6, 128.1, -6.5, 3.7, 124.7, -7, 3.9, 121.3, -6.2, 4.1, 117.9, -3.8, 4.2,
            114.5, -0.1, 4.4, 111.1, 5.1, 4.6, 107.7, 11.6, 4.7, 104.4, 19.6, 4.9, 101, 29.1, 5.1, 97.6, 39.9, 5.2,
            94.2, 52.2, 5.4, 90.8, 65.9, 5.5, 87.4, 81, 5.7, 84, 97.5, 5.9, 80.7, 115.5, 6, 77.3, 134.8, 6.2, 73.9,
            155.6, 6.4, 70.5, 177.9, 6.5, 69.9, 181.6, 6.5,
        ],
    },
    p_rl2: {
        points: [
            28.9, 13, 0.1, 42.7, 9.2, 0.4, 56.5, 6.8, 0.7, 70.3, 5.8, 1, 84.1, 6.3, 1.3, 97.9, 8.2, 1.7, 111.7, 11.5, 2,
            125.5, 16.2, 2.3, 139.3, 22.3, 2.6, 147.3, 23.9, 2.9, 144, 14.8, 3, 140.7, 7.2, 3.2, 137.4, 1, 3.4, 134.1,
            -3.8, 3.6, 130.8, -7.2, 3.7, 127.5, -9.1, 3.9, 124.2, -9.6, 4.1, 120.9, -8.8, 4.3, 117.6, -6.4, 4.4, 114.2,
            -2.7, 4.6, 110.9, 2.5, 4.8, 107.6, 9.1, 5, 104.3, 17.1, 5.1, 101, 26.5, 5.3, 97.7, 37.4, 5.5, 94.4, 49.6,
            5.7, 91.1, 63.3, 5.8, 87.8, 78.4, 6, 84.5, 95, 6.2, 81.2, 112.9, 6.3, 77.9, 132.3, 6.5, 74.6, 153.1, 6.7,
            71.3, 175.4, 6.9, 70.4, 181.2, 6.9,
        ],
    },
};
