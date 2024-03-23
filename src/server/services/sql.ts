export const sqlTotalBest = `
SELECT
    COUNT(id) AS counts,
    SUM(distance) AS distance,
    SUM(duration) AS duration,
    AVG(pace) AS pace,
    AVG(speed) AS speed
FROM workouts
WHERE type = :type AND user_id = :user`;

export const sqlYears = `
SELECT
    EXTRACT (year FROM timestamp) AS year,
    COUNT(id) AS counts,
    SUM(distance) AS distance,
    SUM(duration) AS duration,
    AVG(pace) AS pace,
    AVG(speed) AS speed
FROM workouts
WHERE type = :type AND user_id = :user
GROUP BY EXTRACT(year FROM timestamp)
ORDER BY EXTRACT(year FROM timestamp);`;

export const sqlMonths = `
SELECT
    EXTRACT (year FROM timestamp) AS year,
    EXTRACT (month FROM timestamp) AS month,
    COUNT(id) AS counts,
    SUM(distance) AS distance,
    SUM(duration) AS duration,
    AVG(pace) AS pace,
    AVG(speed) AS speed
FROM workouts
WHERE type = :type AND user_id = :user
GROUP BY
    EXTRACT (year FROM timestamp),
    EXTRACT (month FROM timestamp)
ORDER BY
    EXTRACT (year FROM timestamp),
    EXTRACT (month FROM timestamp);`;
