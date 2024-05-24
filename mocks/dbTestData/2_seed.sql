INSERT INTO
    users
VALUES
    (
        1,
        '54fc530b-3e54-4b73-84af-55f290817b7a',
        'Bob',
        false,
        '2024-04-02 19:19:23',
        3,
        '2023-01-25 14:34:24',
        '2023-01-26 10:34:24'
    ),
    (
        2,
        '2644ba8d-4421-4f0e-b5aa-0858701742ad',
        'Alice',
        true,
        NULL,
        0,
        '2023-01-25 14:34:24',
        '2023-01-25 14:34:24'
    );

INSERT INTO
    labels
VALUES
    (
        1,
        '#0c56c9',
        'Half Marathon',
        1,
        '2024-04-01 19:34:24',
        '2024-04-01 19:34:24'
    ),
    (
        2,
        '#b40813',
        'South Downs Way',
        1,
        '2024-04-01 19:34:24',
        '2024-04-01 19:34:24'
    ),
    (
        3,
        '#d6411d',
        'Chiltern Hills',
        2,
        '2024-04-01 19:34:24',
        '2024-04-01 19:34:24'
    );

INSERT INTO
    workouts
VALUES
    (
        1,
        'running',
        '2023-12-01 07:00:00',
        'Europe/London',
        false,
        1.0,
        300,
        300,
        12,
        NULL,
        ST_GeomFromText ('LINESTRING(0 0,1 1,2 2)'),
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        2,
        'running',
        '2023-12-02 09:15:00',
        'Europe/London',
        false,
        2.05,
        660,
        330,
        10.90909090909091,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        3,
        'running',
        '2023-12-03 08:10:00',
        'Europe/London',
        false,
        2.02,
        573,
        286.5,
        12.56544502617801,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        4,
        'running',
        '2023-12-04 06:00:00',
        'Europe/London',
        false,
        3.0,
        905,
        301.6666666666667,
        11.933701657458563,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        5,
        'running',
        '2023-12-05 12:00:00',
        'Europe/London',
        false,
        5.03,
        1980,
        396,
        9.09090909090909,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        6,
        'running',
        '2023-12-06 16:00:00',
        'Europe/London',
        false,
        5.0,
        1860,
        372,
        9.677419354838708,
        NULL,
        NULL,
        1,
        1,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        7,
        'running',
        '2023-12-07 10:00:00',
        'Europe/London',
        false,
        5.0,
        1740,
        348,
        10.344827586206897,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        8,
        'running',
        '2023-12-10 10:54:00',
        'Europe/London',
        false,
        5.008,
        1634,
        326.8,
        11.015911872705018,
        NULL,
        NULL,
        1,
        2,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        9,
        'running',
        '2023-12-12 12:18:00',
        'Europe/London',
        false,
        10.0,
        3720,
        372,
        9.677419354838708,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        10,
        'running',
        '2023-12-15 11:41:00',
        'Europe/London',
        false,
        10,
        3360,
        336,
        10.714285714285714,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        11,
        'running',
        '2023-12-31 06:09:00',
        'Europe/London',
        false,
        10,
        3382,
        338.2,
        10.644589000591367,
        'test notes',
        NULL,
        1,
        1,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        12,
        'running',
        '2023-12-23 10:57:00',
        'Europe/London',
        false,
        12,
        4800,
        400,
        9,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        13,
        'running',
        '2023-10-07 07:00:00',
        'Europe/London',
        false,
        10,
        3540,
        354,
        10.16949152542373,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        14,
        'running',
        '2023-10-31 15:00:00',
        'Europe/London',
        false,
        5,
        3360,
        672,
        5.357142857142857,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        15,
        'running',
        '2023-01-01 08:00:00',
        'Europe/London',
        false,
        21,
        7200,
        342.85714285714283,
        10.5,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        16,
        'running',
        '2022-07-07 10:00:00',
        'Europe/London',
        false,
        10,
        3600,
        360,
        10,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        17,
        'running',
        '2022-08-07 13:00:00',
        'Europe/London',
        false,
        12,
        3720,
        310,
        11.61290322580645,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        18,
        'running',
        '2021-04-07 16:00:00',
        'Europe/London',
        false,
        5,
        1980,
        396,
        9.09090909090909,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        19,
        'running',
        '2020-06-07 07:00:00',
        'Europe/London',
        false,
        6,
        1860,
        310,
        11.61290322580645,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        20,
        'running',
        '2022-07-09 08:09:00',
        'Europe/London',
        false,
        2,
        660,
        330,
        10.90909090909091,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        21,
        'running',
        '2022-07-11 16:13:00',
        'Europe/London',
        false,
        2,
        720,
        360,
        10,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        22,
        'running',
        '2022-07-13 14:00:00',
        'Europe/London',
        false,
        1,
        320,
        320,
        11.25,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        23,
        'running',
        '2022-07-14 13:00:00',
        'Europe/London',
        false,
        1,
        344,
        344,
        10.465116279069766,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        24,
        'running',
        '2022-07-15 12:00:00',
        'Europe/London',
        false,
        1,
        311,
        311,
        11.57556270096463,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        25,
        'running',
        '2022-07-17 11:00:00',
        'Europe/London',
        false,
        2,
        491,
        245.5,
        14.663951120162933,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        26,
        'running',
        '2022-07-18 10:00:00',
        'Europe/London',
        false,
        2,
        551,
        275.5,
        13.067150635208712,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        27,
        'running',
        '2022-07-30 08:00:00',
        'Europe/London',
        false,
        1,
        327,
        327,
        11.009174311926605,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        28,
        'running',
        '2022-07-31 07:00:00',
        'Europe/London',
        false,
        1,
        347,
        347,
        10.37463976945245,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    ),
    (
        29,
        'running',
        '2022-07-20 09:00:00',
        'Europe/London',
        false,
        2,
        685,
        342.5,
        10.51094890510949,
        NULL,
        NULL,
        1,
        NULL,
        '2024-04-06 13:02:50',
        '2024-04-06 13:02:50'
    );