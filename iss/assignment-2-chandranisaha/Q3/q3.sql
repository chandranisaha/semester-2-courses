-- Write all sql commands here, write comments for all of them too

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS PunjabWeather;

-- Step 2: Use the created database
USE PunjabWeather;

-- Step 3: Create the WeatherData table
CREATE TABLE IF NOT EXISTS WeatherData (
    date DATE NOT NULL,  -- Date of the temperature record
    place VARCHAR(100) NOT NULL,  -- City or station name
    max_temperature FLOAT,  -- Maximum temperature (nullable for missing values)
    min_temperature FLOAT,  -- Minimum temperature (nullable for missing values)
    PRIMARY KEY (date, place)  -- Composite primary key to avoid duplicate records
);

-- Step 4: Loading CSV files data

-- Create a Temporary Table for Import
CREATE TEMPORARY TABLE TempWeatherData (
    date DATE,
    place VARCHAR(100),
    max_temperature FLOAT NULL,
    min_temperature FLOAT NULL
);


-- Load Maximum Temperatures
LOAD DATA INFILE '/var/lib/mysql-files/maximum.csv'
INTO TABLE TempWeatherData
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'  
LINES TERMINATED BY '\n'  
IGNORE 1 ROWS
(@date, @temperature, @station)
SET 
    date = STR_TO_DATE(@date, '%Y-%m-%d'),
    place = @station,
    max_temperature = NULLIF(@temperature, '');

-- Load Minimum Temperatures
LOAD DATA INFILE '/var/lib/mysql-files/minimum.csv'
INTO TABLE TempWeatherData
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'  
LINES TERMINATED BY '\n'  
IGNORE 1 ROWS
(@date, @temperature, @station)
SET 
    date = STR_TO_DATE(@date, '%Y-%m-%d'),
    place = @station,
    min_temperature = NULLIF(@temperature, '');
-- Merge the Data Into WeatherData
INSERT INTO WeatherData (date, place, max_temperature, min_temperature)
SELECT 
    t.date, 
    t.place, 
    COALESCE(t.max_temperature, w.max_temperature),
    COALESCE(t.min_temperature, w.min_temperature)
FROM TempWeatherData AS t
LEFT JOIN WeatherData AS w 
ON t.date = w.date AND t.place = w.place
ON DUPLICATE KEY UPDATE 
    max_temperature = COALESCE(t.max_temperature, WeatherData.max_temperature),
    min_temperature = COALESCE(t.min_temperature, WeatherData.min_temperature);

-- Drop the Temporary Table
DROP TEMPORARY TABLE IF EXISTS TempWeatherData;

-- INSIGHT 1:  Hottest and Coldest Recorded Temperatures in Punjab
-- Find the hottest recorded temperature along with the date and place
SELECT date, place, max_temperature AS temperature, 'Max' AS type
FROM WeatherData
WHERE max_temperature = (SELECT MAX(max_temperature) FROM WeatherData)
UNION
-- Find the coldest recorded temperature along with the date and place
SELECT date, place, min_temperature AS temperature, 'Min' AS type
FROM WeatherData
WHERE min_temperature = (SELECT MIN(min_temperature) FROM WeatherData);


-- INSIGHT 2:  Average Temperature for Each City
SELECT place, 
       ROUND(AVG(max_temperature), 2) AS avg_max_temp, 
       ROUND(AVG(min_temperature), 2) AS avg_min_temp
FROM WeatherData
GROUP BY place
ORDER BY avg_max_temp DESC;


-- INSIGHT 3: Average Summer and Winter Temperatures
-- Average maximum temperature in summer months (May - July)
SELECT ROUND(AVG(max_temperature), 2) AS avg_summer_max
FROM WeatherData
WHERE MONTH(date) BETWEEN 5 AND 7;

-- Average minimum temperature in winter months (December - February)
SELECT ROUND(AVG(min_temperature), 2) AS avg_winter_min
FROM WeatherData
WHERE MONTH(date) IN (12, 1, 2);

-- INSIGHT 4:  Average maximum and minimum temperatures over Decades
-- Average maximum temperature per decade
SELECT CONCAT(FLOOR(YEAR(date) / 10) * 10, 's') AS decade,
       ROUND(AVG(max_temperature), 2) AS avg_max_temp
FROM WeatherData
GROUP BY decade
ORDER BY decade;

-- Average minimum temperature per decade
SELECT CONCAT(FLOOR(YEAR(date) / 10) * 10, 's') AS decade,
       ROUND(AVG(min_temperature), 2) AS avg_min_temp
FROM WeatherData
GROUP BY decade
ORDER BY decade;

-- INSIGHT 5: Months with the Most Temperature Extremes
SELECT MONTH(date) AS month,
       MAX(max_temperature) AS highest_temp,
       MIN(min_temperature) AS lowest_temp
FROM WeatherData
GROUP BY MONTH(date)
ORDER BY highest_temp DESC;

