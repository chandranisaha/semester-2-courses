## Follow the File Structure and add Assumptions in this Readme file

- Write Insights in insights.txt
- Write all queries in q3.sql

ASSUMPTIONS:

a) The database is named PunjabWeather.
The table used for analysis is WeatherData with the structure:
sql
Copy
Edit
+------------+----------+-----------------+-----------------+
| date       | place    | max_temperature | min_temperature |
+------------+----------+-----------------+-----------------+
date: Stores the date of temperature recording (format: YYYY-MM-DD).
place: Stores the city/station name where temperature was recorded.
max_temperature: Stores the maximum temperature recorded for that date and place.
min_temperature: Stores the minimum temperature recorded for that date and place.

b) max_temperature and min_temperature are used for extreme temperature analysis.
For averaging, we assume the dataset has sufficient data per city and time period to avoid bias.
Decades, seasons, and months are correctly extracted from the date column.
The insights are based on historical data and do not reflect future trends.

c) INSIGHT 1: Hottest and Coldest Recorded Temperatures in Punjab
Assumptions:

The dataset contains historical temperature records without missing extreme values.
The hottest and coldest temperatures are determined only by max/min temperatures, not "feels-like" temperatures.
If there are multiple instances of the same extreme temperature, the query will not distinguish between years/cities unless modified.
The hottest temperature is the maximum value of max_temperature, and the coldest temperature is the minimum value of min_temperature.

d)  INSIGHT 2: Average Temperature for Each City
Assumptions:

The dataset has a sufficient number of temperature recordings per city to compute meaningful averages.
If any city has missing max_temperature or min_temperature, those records will be ignored in calculations.
The average temperature for each city is computed as: \text{Avg Temp} = \frac{\text{max_temperature} + \text{min_temperature}}{2}
Temperature values are in degrees Celsius and not converted to Fahrenheit or Kelvin.

e)  INSIGHT 3: Average Summer and Winter Temperatures
Assumptions:

Seasons are defined as:
Summer: June, July, August (06, 07, 08)
Winter: December, January, February (12, 01, 02)
The dataset covers multiple years and has sufficient data for seasonal analysis.
Missing values for max_temperature or min_temperature are ignored.
The query takes all years into account and provides a single average value per season.

f)  INSIGHT 4: Average Maximum and Minimum Temperatures over Decades
Assumptions:

Decades are grouped as:
1990-1999 → 1990s
2000-2009 → 2000s
2010-2019 → 2010s
2020-Present → 2020s
If there is insufficient data for a specific decade, that decade may not appear in the results.
Decades are determined using:
sql
Copy
Edit
LEFT(YEAR(date),3) || '0s'
which extracts the first three digits of the year (e.g., 199 → 1990s).
The query calculates average max and min temperatures for each decade.

g)INSIGHT 5: Months with the Most Temperature Extremes
Assumptions:

Temperature extremes are defined as:
Hottest months → Months with the highest max_temperature values
Coldest months → Months with the lowest min_temperature values
The dataset must have temperature records for all months to avoid bias.
The results are aggregated at the month level, ignoring specific years.
If there are multiple months with the same extreme temperatures, all are included.
