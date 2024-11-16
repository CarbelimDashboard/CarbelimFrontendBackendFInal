import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import cron from 'node-cron';

dotenv.config();

const app = express();
app.use(cookieParser());

const allowedOrigins = [
    // 'https://carbelimdashboardfrontenddeploy.onrender.com',
    // 'http://localhost:8080', // To run locally
    'capacitor://localhost', // To allow requests from the Capacitor Android app
    // 'https://localhost'
];

const corsOptions = {
    origin: function (origin, callback) {
        console.log('Origin:', origin); // Log the origin
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

const servercheck = express.Router();
const userRouter = express.Router();
const realtimData = express.Router();
const relayControl = express.Router();
const graphData = express.Router();
const DownloadData = express.Router();

app.use('/', servercheck);
app.use('/dashboardverify', userRouter);
app.use('/togetrealtimedata', realtimData);
app.use('/relaycontrol', relayControl);
app.use('/graphdata', graphData);
app.use('/downloaddata', DownloadData);


servercheck
.route('/')
.get(toCheckServer);

userRouter
.route('/')
.post(toHandleDevice);

realtimData
.route('/')
.get(toHandleRealtimData);

relayControl
.route('/')
.post(toHandleRelayControl);

graphData
.route('/')
.get(toHandleGraphData);

DownloadData
.route('/')
.get(toHandleDownloadRequest);

const cities = {
    india: 'India',
    newDelhi: 'NewDelhi',
    mumbai: 'Mumbai',
    kolkata: 'Kolkata',
    newYork: 'NewYork',
    paris: 'Paris',
    tokyo: 'Tokyo',
    london: 'London',
    dubai: 'Dubai',
    singapore: 'Singapore',
    hongKong: 'HongKong',
    sydney: 'Sydney',
    rome: 'Rome',
    losAngeles: 'LosAngeles'
};

const API_TOKEN = process.env.API_TOKEN; // Make sure to set this in your .env file

let aqiData = {};

// List of top 30 countries and their top 3 cities
const countries = {
    USA: ['LosAngeles', 'NewYork', 'Chicago'],
    China: ['Shanghai', 'Beijing', 'Guangzhou'],
    India: ['Delhi', 'Mumbai', 'Bangalore'],
    Japan: ['Tokyo', 'Osaka', 'Nagoya'],
    Germany: ['Berlin', 'Munich', 'Frankfurt'],
    Brazil: ['SaoPaulo', 'RiodeJaneiro', 'Brasilia'],
    UK: ['London', 'Manchester', 'Birmingham'],
    France: ['Paris', 'Marseille', 'Lyon'],
    Italy: ['Rome', 'Milan', 'Naples'],
    Canada: ['Toronto', 'Vancouver', 'Montreal'],
    Russia: ['Moscow', 'SaintPetersburg', 'Novosibirsk'],
    SouthKorea: ['Seoul', 'Busan', 'Incheon'],
    Australia: ['Sydney', 'Melbourne', 'Brisbane'],
    Mexico: ['MexicoCity', 'Guadalajara', 'Monterrey'],
    Indonesia: ['Jakarta', 'Surabaya', 'Bandung'],
    Spain: ['Madrid', 'Barcelona', 'Valencia'],
    Turkey: ['Istanbul', 'Ankara', 'Izmir'],
    SaudiArabia: ['Riyadh', 'Jeddah', 'Mecca'],
    SouthAfrica: ['Johannesburg', 'CapeTown', 'Durban'],
    Argentina: ['BuenosAires', 'Cordoba', 'Rosario'],
    Nigeria: ['Lagos', 'Abuja', 'Kano'],
    Egypt: ['Cairo', 'Alexandria', 'Giza'],
    Pakistan: ['Karachi', 'Lahore', 'Islamabad'],
    Vietnam: ['Hanoi', 'HoChiMinhCity', 'DaNang'],
    Thailand: ['Bangkok', 'ChiangMai', 'Pattaya'],
    Philippines: ['Manila', 'CebuCity', 'DavaoCity'],
    Malaysia: ['KualaLumpur', 'GeorgeTown', 'JohorBahru'],
    Ukraine: ['Kyiv', 'Kharkiv', 'Odessa'],
    Poland: ['Warsaw', 'Krakow', 'Wroclaw'],
    UAE: ['Dubai', 'AbuDhabi', 'Sharjah'],
    Top: ['London', 'Dubai', 'Seoul', 'HongKong', 'NewYork', 'Sydney', 'Paris', 'Rome', 'Tokyo', 'Delhi' ],
  };


async function toCheckServer(req, res) {
    res.json("Carbelim Dashboard Server running");
}

// Function to fetch AQI data for a city and extract the required pollutants
const fetchAQIData = async (city) => {
    try {
        const response = await axios.get(`http://api.waqi.info/feed/${city}/?token=${API_TOKEN}`);
        const data = response.data;
        
        if (data.status === 'ok') {
            const iaqi = data.data.iaqi;
            const aqi = data.data.aqi;
            
            // Return an object containing the necessary pollutants and AQI
            return {
                aqi: aqi || 'N/A',  // AQI value
                pm25: iaqi.pm25?.v || 'N/A',  // PM2.5 value
                pm10: iaqi.pm10?.v || 'N/A',  // PM10 value
                so2: iaqi.so2?.v || 'N/A',    // SO2 value
                co: iaqi.co?.v || 'N/A',      // CO value
                o3: iaqi.o3?.v || 'N/A',      // Ozone value (O3)
                no2: iaqi.no2?.v || 'N/A'     // NO2 value
            };
        }
        return null;  // Return null if data is not available
    } catch (error) {
        console.error(`Error fetching data for ${city}:`, error.message);
        return null;
    }
};

// Function to fetch AQI data for the top 3 cities of each country
const updateAQIData = async () => {
    console.log('Fetching AQI data...');

    // Fetch data for all cities in parallel using Promise.all
    const fetchPromises = [];
    for (const country in countries) {
        aqiData[country] = {};  // Initialize the country object
        for (const city of countries[country]) {
            fetchPromises.push(
                fetchAQIData(city).then(cityData => {
                    if (cityData) {
                        aqiData[country][city] = cityData;
                    }
                })
            );
        }
    }

    // Wait for all fetch requests to complete
    await Promise.all(fetchPromises);
    console.log('AQI data updated.');
};

// Fetch data every 45 minutes using node-cron
cron.schedule('*/45 * * * *', updateAQIData);

// Initial data fetch when the server starts
updateAQIData();

// Route to get AQI data for a specific country
app.get('/togetdata/:country', async (req, res) => {
    const { country } = req.params;

    if (country === 'Top') {
        // Fetch AQI data for the top cities
        let topCitiesData = {};
        for (const city of countries['Top']) {
            if (aqiData[city]) {
                topCitiesData[city] = aqiData[city];
            } else {
                const cityData = await fetchAQIData(city); // Fetch data if not already available
                if (cityData) {
                    topCitiesData[city] = cityData;
                    aqiData[city] = cityData; // Cache the fetched data
                }
            }
        }
        res.json(topCitiesData);
    } else {
        const countryData = aqiData[country];
        if (countryData) {
            res.json(countryData);
        } else {
            res.status(404).json({ error: 'Country not found or data not available' });
        }
    }
});

async function toHandleDevice(req, res) {
    const deviceId = req.body.data;
    try {
        console.log(deviceId);
        const response = await axios.get(`https://eezywisf5h.execute-api.ap-south-1.amazonaws.com/prod/data/realtime?deviceid=${deviceId}`);
        if (response.data === "No data found for the given device ID") {
            console.log('Device Invalid');
            res.status(404).json({ message: 'DeviceIdError', error: 'No data found for the given device ID' });
        } else {
            console.log('Device Connected');
            res.json({
                success: true,
                deviceIsValid: true,
                deviceId: deviceId
            });
            console.log('Response sent');
        }
    } catch (error) {
        console.error('Error fetching device data:', error.message);
        res.status(500).json({ message: 'DeviceIdError', error: 'Failed to fetch device data' });
    }
}

async function toHandleRealtimData(req, res) {
    const { deviceid } = req.query;
    try {
        const response = await axios.get(`https://eezywisf5h.execute-api.ap-south-1.amazonaws.com/prod/data/realtime?deviceid=${deviceid}`);
        res.json(response.data);
        console.log("Data retrieved successfully and sent");
    } catch (error) {
        console.error('Error fetching real-time data:', error.message);
        res.status(500).json({ error: 'Failed to fetch real-time data from external API' });
    }
}

async function toHandleRelayControl(req, res) {
    const { deviceid } = req.query; 
    const body = req.body;

    try {
        const response = await axios.post(`https://eezywisf5h.execute-api.ap-south-1.amazonaws.com/prod/commands?deviceid=${deviceid}`, body);
        console.log('Response from external command API:', response.data);
        console.log("body", )
        res.json({ success: true, message: 'Command sent successfully', data: response.data });
    } catch (error) {
        console.error('Error sending command:', error.message);
        res.status(500).json({ error: 'Failed to send command to external API' });
    }
}

async function toHandleGraphData(req, res) {
    const { deviceid, range, parameterId } = req.query;
    const url = `https://eezywisf5h.execute-api.ap-south-1.amazonaws.com/prod/data/${range}?deviceid=${deviceid}`;
    try {
        const response = await axios.get(url);
        const data = response.data;

        // Function to format the timestamp based on the range
        const formatTimestamp = (timestamp, range) => {
            const date = new Date(timestamp);
            // Convert to IST by adding 5 hours and 30 minutes
            date.setHours(date.getUTCHours() + 5);
            date.setMinutes(date.getUTCMinutes() + 30);

            if (range === 'hourly' || range === 'daily') {
                return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            } else if (range === 'weekly') {
                return `${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}`;
            }
        };

        // Extract the latest timestamp from the data
        const latestTimestamp = new Date(Math.max(...data.map(item => new Date(item.timestamp))));

        // Generate the target timestamps at 48-minute intervals for the last 24 hours
        const targetTimestamps = [];
        if (range === 'daily') {
            for (let i = 0; i < 30; i++) {
                const targetTime = new Date(latestTimestamp.getTime() - i * 48 * 60 * 1000);
                targetTimestamps.push(targetTime);
            }
        }

        // Function to find the closest data point for each target timestamp
        const findClosestData = (timestamp, data) => {
            const closestData = data.reduce((closest, item) => {
                const itemTime = new Date(item.timestamp);
                const closestTime = new Date(closest.timestamp);
                return Math.abs(itemTime - timestamp) < Math.abs(closestTime - timestamp) ? item : closest;
            });

            // If the closest data point is within a 24-minute interval (either way), return it
            if (Math.abs(new Date(closestData.timestamp) - timestamp) <= 24 * 60 * 1000) {
                return closestData;
            } else {
                return null;
            }
        };

        let filteredData;

        if (range === 'daily') {
            // Process the data to include the parameter value (or 0) and formatted timestamp for each target timestamp
            filteredData = targetTimestamps.map(targetTime => {
                const closestData = findClosestData(targetTime, data);
                return {
                    ts: formatTimestamp(targetTime, range),
                    value: closestData ? closestData[parameterId] !== undefined ? closestData[parameterId] : 0 : 0
                };
            });

            // Sort the data by timestamp in ascending order
            filteredData.sort((a, b) => new Date(a.ts) - new Date(b.ts));
            
            // Reverse the order of the filtered data
            filteredData.reverse();
        } else {
            // For other ranges (e.g., hourly, weekly), process the data as before
            filteredData = data.map(item => ({
                ts: formatTimestamp(item.ts || item.timestamp, range),
                value: item[parameterId] !== undefined ? item[parameterId] : 0
            }));

            // Sort the data by timestamp in descending order for hourly
            if (range === 'hourly') {
                filteredData.sort((a, b) => new Date(b.ts) - new Date(a.ts));
            } else if (range === 'weekly') {
                // Reverse the data order for weekly
                filteredData.reverse();
            }
        }

        res.json(filteredData);
        console.log(`Filtered data for ${range} with parameter ${parameterId} fetched and sent to frontend`);
    } catch (error) {
        console.error('Error fetching data from external API:', error);
        res.status(500).json({ error: 'Failed to fetch data from external API' });
    }
}

async function toHandleDownloadRequest(req, res) {
    const { deviceid, range } = req.query;
  
    try {
      // Make request to the external API
      const apiResponse = await axios.get('https://eezywisf5h.execute-api.ap-south-1.amazonaws.com/prod/data/download', {
        params: { deviceid, range }
      });
  
      const { download_link } = apiResponse.data;
  
      // Fetch the CSV file from the provided download link
      const fileResponse = await axios.get(download_link, { responseType: 'arraybuffer' });
  
      // Set appropriate headers to send the file back to the frontend
      res.setHeader('Content-Disposition', `attachment; filename=data_${range}.csv`);
      res.setHeader('Content-Type', 'text/csv');
      res.send(fileResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}!`);
});