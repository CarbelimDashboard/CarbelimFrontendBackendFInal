import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        isLoading: false,
        deviceIsValid: false,
        deviceId: '',
        deviceName: '',
        time: 'Time Loading ...',
        timeRange: 'hourly',  // Default to 1 hour
        timeRangeData: [
          { id: 'hourly', name: '1hr' },
          { id: 'daily', name: '1day' },
          { id: 'weekly', name: '1week' }
        ],
        parameterSelected: '',
        devices: {
            C201: {
                A: [
                    { id: 'Aaq', name: 'AQI', unit: '', value: 0, icon: 'AAQI',  low:0, mid: 30, high: 100, disp: 'This is a composite measure that reflects the overall air quality and the potential impact on human health. The scale typically ranges from 0 to 500, with lower values indicating better air quality and higher values indicating worse air quality'},
                    { id: 'Aco', name: 'CO2', unit: 'ppm', value: 0, icon: 'ACo2',  low: 300, mid: 500, high:700, disp: 'Measured in parts per million (ppm), this represents the concentration of CO2 in the air. Elevated CO2 levels can affect health, especially in indoor environments, and are also an indicator of poor air ventilation.'} ,
                    { id: 'Ap1', name: 'PM1.0', unit: 'µg/m³', value: 0, icon: 'APM1',  low: 5, mid: 18, high: 30, disp: 'These are fine particles smaller than 1 micrometer, which can easily penetrate deep into the lungs and bloodstream, causing respiratory issues and health problems.'},
                    { id: 'Ap25', name: 'PM2.5', unit: 'µg/m³', value: 0, icon: 'APM25',  low: 5, mid: 18, high: 30, disp: 'Fine particulate matter smaller than 2.5 micrometers. PM2.5 can lead to heart disease, lung problems, and other health risks, particularly for vulnerable populations like children and the elderly.'},
                    { id: 'Ap10', name: 'PM10', unit: 'µg/m³', value: 0, icon: 'APM10',  low: 10, mid: 36, high: 60, disp: 'Larger particles that are still small enough to be inhaled and cause respiratory issues. They are typically generated from dust, pollen, and other outdoor pollutants.'},
                    { id: 'Atvo', name: 'TVOC', unit: 'ppm', value: 0, icon: 'ATVOC',  low: 0.1, mid: 0.4, high: 0.8, disp: 'A group of organic chemicals that can easily evaporate into the air. High levels can lead to health issues such as headaches, dizziness, and even long-term respiratory problems.'},
                    { id: 'Ahch', name: 'HCHO', unit: 'ppm', value: 0, icon: 'AHCHO',  low: 0.01, mid: 0.03, high: 0.06, disp: 'A volatile organic compound that is often found in building materials and household products. It can be harmful in higher concentrations and is a known carcinogen.'},
                    { id: 'Atem', name: 'Temp', unit: '°C', value: 0, icon: 'ATemp',  low: 10, mid: 25, high: 45, disp: 'Air temperature in Celsius. Temperature can influence air quality and the rate of chemical reactions in the atmosphere, affecting pollutants like ozone and particulate matter.'},
                ],
                W: [
                    { id: 'Wwq', name: 'WQI', unit: '', value: 0, icon: 'WTDs', low: 0, mid: 150, high: 300, disp: 'This index gives an overall assessment of water quality based on various parameters such as pH, temperature, dissolved oxygen, and turbidity. A lower score indicates better water quality.'},
                    { id: 'Wph', name: 'pH', unit: '', value: 0, icon: 'WPh', low: 5, mid: 7, high: 9, disp: 'The measure of acidity or alkalinity in the water. A pH of 7 is neutral, values lower than 7 are acidic, and values above 7 are alkaline. Extreme pH levels can harm aquatic life.'},
                    { id: 'Wtem', name: 'Temp', unit: '°C', value: 0, icon: 'WTemp', low: 5, mid: 17, high: 40, disp: 'Water temperature in Celsius, which influences the solubility of gases (like oxygen) and affects aquatic life. Extreme temperatures can be harmful to marine organisms.' },
                    { id: 'Wdo', name: 'DO', unit: 'mg/L', value: 0, icon: 'WDo', low: 1, mid: 5, high: 12, disp: 'The amount of oxygen present in water. Higher levels are vital for the survival of fish and other aquatic organisms. Low levels can indicate pollution or an unhealthy ecosystem.'},
                    { id: 'Wtur', name: 'Turb', unit: 'NTU', value: 0, icon: 'WTurb', low: 0, mid: 5, high: 10, disp: 'The cloudiness or haziness of water, caused by particles suspended in it. High turbidity can harm aquatic life by reducing light penetration and affecting the health of organisms.'},
                    { id: 'Wtds', name: 'TDS', unit: 'ppm', value: 0, icon: 'WTDs', low: 100, mid: 200, high: 400, disp: 'The total concentration of dissolved substances in water, such as minerals, salts, and metals. High TDS levels can affect water taste and quality, and may also indicate pollution.'},
                ],
                R: [
                    { id: 'rel-1', name: 'Relay-1', value: 0 },
                    { id: 'rel-2', name: 'Relay-2', value: 0 },
                    { id: 'rel-3', name: 'Relay-3', value: 0 },
                    { id: 'rel-4', name: 'Relay-4', value: 0 },
                    { id: 'rel-5', name: 'Relay-5', value: 0 },
                    { id: 'rel-6', name: 'Relay-6', value: 0 },
                ],
                G: [
                    { id: 'Aaq', name: 'Air-AQI'}, { id: 'Aco', name: 'Air-CO2'},{ id: 'Ap1', name: 'Air-PM1.0'},{ id: 'Ap25', name: 'Air-PM2.5'},
                    { id: 'Ap10', name: 'Air-PM10'},{ id: 'Atvo', name: 'Air-TVOC'},{ id: 'Ahch', name: 'Air-HCHO'},{ id: 'Atem', name: 'Air-Temp'},
                    { id: 'Wph', name: 'Water-pH'}, { id: 'Wtem', name: 'Water-Temp'},{ id: 'Wdo', name: 'Water-DO'},{ id: 'Wtur', name: 'Water-Turb'},
                    { id: 'Wtds', name: 'Water-TDS'}, { id: 'Wwq', name: 'Water-WQI'}
                ]
            },
            C202: {
                W: [
                    { id: 'Wwq', name: 'WQI', unit: '', value: 0, icon: 'WTDs', low: 0, mid: 150, high: 300, disp: 'This index gives an overall assessment of water quality based on various parameters such as pH, temperature, dissolved oxygen, and turbidity. A lower score indicates better water quality.'},
                    { id: 'Wph', name: 'pH', unit: '', value: 0, icon: 'WPh', low: 5, mid: 7, high: 9, disp: 'The measure of acidity or alkalinity in the water. A pH of 7 is neutral, values lower than 7 are acidic, and values above 7 are alkaline. Extreme pH levels can harm aquatic life.'},
                    { id: 'Wtem', name: 'Temp', unit: '°C', value: 0, icon: 'WTemp', low: 5, mid: 17, high: 40, disp: 'Water temperature in Celsius, which influences the solubility of gases (like oxygen) and affects aquatic life. Extreme temperatures can be harmful to marine organisms.' },
                    { id: 'Wdo', name: 'DO', unit: 'mg/L', value: 0, icon: 'WDo', low: 1, mid: 5, high: 12, disp: 'The amount of oxygen present in water. Higher levels are vital for the survival of fish and other aquatic organisms. Low levels can indicate pollution or an unhealthy ecosystem.'},
                    { id: 'Wtur', name: 'Turb', unit: 'NTU', value: 0, icon: 'WTurb', low: 0, mid: 5, high: 10, disp: 'The cloudiness or haziness of water, caused by particles suspended in it. High turbidity can harm aquatic life by reducing light penetration and affecting the health of organisms.'},
                    { id: 'Wtds', name: 'TDS', unit: 'ppm', value: 0, icon: 'WTDs', low: 100, mid: 200, high: 400, disp: 'The total concentration of dissolved substances in water, such as minerals, salts, and metals. High TDS levels can affect water taste and quality, and may also indicate pollution.'},
                ],
                R: [
                    { id: 'rel-1', name: 'Relay-1', value: 0 },
                    { id: 'rel-2', name: 'Relay-2', value: 0 },
                    { id: 'rel-3', name: 'Relay-3', value: 0 },
                    { id: 'rel-4', name: 'Relay-4', value: 0 },
                    { id: 'rel-5', name: 'Relay-5', value: 0 },
                    { id: 'rel-6', name: 'Relay-6', value: 0 },
                    { id: 'rel-7', name: 'Relay-7', value: 0 },
                    { id: 'rel-8', name: 'Relay-8', value: 0 },
                    { id: 'rel-9', name: 'Relay-9', value: 0 },
                ],
                G: [
                    { id: 'Wph', name: 'Water-pH'}, { id: 'Wtem', name: 'Water-Temp'},{ id: 'Wdo', name: 'Water-DO'},{ id: 'Wtur', name: 'Water-Turb'},
                    { id: 'Wtds', name: 'Water-TDS'}, { id: 'Wwq', name: 'Water-WQI'}
                ]
            },
            C203: {
                A: [
                    { id: 'Aaq', name: 'AQI', unit: '', value: 0, icon: 'AAQI',  low:0, mid: 30, high: 100, disp: 'This is a composite measure that reflects the overall air quality and the potential impact on human health. The scale typically ranges from 0 to 500, with lower values indicating better air quality and higher values indicating worse air quality'},
                    { id: 'Aco', name: 'CO2', unit: 'ppm', value: 0, icon: 'ACo2',  low: 300, mid: 500, high:700, disp: 'Measured in parts per million (ppm), this represents the concentration of CO2 in the air. Elevated CO2 levels can affect health, especially in indoor environments, and are also an indicator of poor air ventilation.'} ,
                    { id: 'Ap1', name: 'PM1.0', unit: 'µg/m³', value: 0, icon: 'APM1',  low: 5, mid: 18, high: 30, disp: 'These are fine particles smaller than 1 micrometer, which can easily penetrate deep into the lungs and bloodstream, causing respiratory issues and health problems.'},
                    { id: 'Ap25', name: 'PM2.5', unit: 'µg/m³', value: 0, icon: 'APM25',  low: 5, mid: 18, high: 30, disp: 'Fine particulate matter smaller than 2.5 micrometers. PM2.5 can lead to heart disease, lung problems, and other health risks, particularly for vulnerable populations like children and the elderly.'},
                    { id: 'Ap10', name: 'PM10', unit: 'µg/m³', value: 0, icon: 'APM10',  low: 10, mid: 36, high: 60, disp: 'Larger particles that are still small enough to be inhaled and cause respiratory issues. They are typically generated from dust, pollen, and other outdoor pollutants.'},
                    { id: 'Atvo', name: 'TVOC', unit: 'ppm', value: 0, icon: 'ATVOC',  low: 0.1, mid: 0.4, high: 0.8, disp: 'A group of organic chemicals that can easily evaporate into the air. High levels can lead to health issues such as headaches, dizziness, and even long-term respiratory problems.'},
                    { id: 'Ahch', name: 'HCHO', unit: 'ppm', value: 0, icon: 'AHCHO',  low: 0.01, mid: 0.03, high: 0.06, disp: 'A volatile organic compound that is often found in building materials and household products. It can be harmful in higher concentrations and is a known carcinogen.'},
                    { id: 'Atem', name: 'Temp', unit: '°C', value: 0, icon: 'ATemp',  low: 10, mid: 25, high: 45, disp: 'Air temperature in Celsius. Temperature can influence air quality and the rate of chemical reactions in the atmosphere, affecting pollutants like ozone and particulate matter.'},
                ],
                R: [
                    
                ],
                G: [
                    { id: 'Aaq', name: 'Air-AQI'}, { id: 'Aco', name: 'Air-CO2'},{ id: 'Ap1', name: 'Air-PM1.0'},{ id: 'Ap25', name: 'Air-PM2.5'},
                    { id: 'Ap10', name: 'Air-PM10'},{ id: 'Atvo', name: 'Air-TVOC'},{ id: 'Ahch', name: 'Air-HCHO'},{ id: 'Atem', name: 'Air-Temp'},
                ]
            },
            graphData: [], // New state property for graph data
            
        },
        countryName: 'India',  // Default country
        city1name: '',
        city1aqi: 0,
        city1pm25: 0,
        city1pm10: 'N/A',
        city1so2: 'N/A',
        city1co: 'N/A',
        city1o3: 'N/A',
        city1no2: 'N/A',
        city2name: '',
        city2aqi: 0,
        city2pm25: 0,
        city2pm10: 'N/A',
        city2so2: 'N/A',
        city2co: 'N/A',
        city2o3: 'N/A',
        city2no2: 'N/A',
        city3name: '',
        city3aqi: 0,
        city3pm25: 0,
        city3pm10: 'N/A',
        city3so2: 'N/A',
        city3co: 'N/A',
        city3o3: 'N/A',
        city3no2: 'N/A',

        top10London: 0,
        top10Dubai: 0,
        top10Seoul: 0,
        top10HongKong: 0,
        top10NewYork: 0,
        top10Sydney: 0,
        top10Paris: 0,
        top10Rome: 0,
        top10Tokyo: 0,
        top10Delhi: 0,
    },
    mutations: {
        setCountryName(state, countryName) {
            state.countryName = countryName;
        },
        setCityData(state, { cityIndex, cityData }) {
            state[`city${cityIndex}name`] = cityData.name;
            state[`city${cityIndex}aqi`] = cityData.aqi;
            state[`city${cityIndex}pm25`] = cityData.pm25;
            state[`city${cityIndex}pm10`] = cityData.pm10;
            state[`city${cityIndex}so2`] = cityData.so2;
            state[`city${cityIndex}co`] = cityData.co;
            state[`city${cityIndex}o3`] = cityData.o3;
            state[`city${cityIndex}no2`] = cityData.no2;
        },
        setTopCityAQI(state, { city, aqi }) {
            state[`top10${city}`] = aqi;
        },

        SET_DEVICE_VALIDITY(state, isValid) {
            state.deviceIsValid = isValid;
        },
        SET_DEVICE_ID(state, id) {
            state.deviceId = id;
        },
        UPDATE_DEVICE_DATA(state, { deviceId, data }) {
            const device = state.devices[`C${deviceId}`];
            if (device) {
                // Concatenate A, W, and R arrays into a single array
                const allMetrics = [...(device.A || []), ...(device.W || []), ...(device.R || [])];
    
                // Update the values in the concatenated array
                Object.keys(data).forEach(key => {
                    // Handle relay update separately
                    if (key === 'rel') {
                        // Convert relay value to binary string, pad to 12 bits
                        const relayBinary = data.rel.toString(2).padStart(12, '0');
                        // Iterate over each relay in the binary string
                        relayBinary.split('').reverse().forEach((bit, index) => {
                            const relay = device.R.find(relay => relay.id === `rel-${index + 1}`);
                            if (relay) {
                                relay.value = parseInt(bit);
                            }
                        });
                    } else {
                        const found = allMetrics.find(item => item.id.toLowerCase() === key.toLowerCase());
                        if (found) {
                            found.value = data[key];
                        }
                    }
                });
            } else {
                console.error(`Device with ID C${deviceId} not found in state.`);
            }
        },
        
        // Mutation to update the countryname
        SET_COUNTRY_NAME(state, countryName) {
            state.countryName = countryName;
        },
        // Mutation to update city air quality
        UPDATE_CITY_AQI(state, { cityIndex, aqiData }) {
            const cityKeyPrefix = `city${cityIndex}`;
            Object.keys(aqiData).forEach((key) => {
                state[`${cityKeyPrefix}${key}`] = aqiData[key];
            });
        },

        UPDATE_TIME(state, timegiven) {
            state.time = timegiven;
        },
        UPDATE_TIME_RANGE(state, timeRangeGiven) {
            state.timeRange = timeRangeGiven;
        },
        UPDATE_PARAMETER_SELECTED(state, parameterGiven) {
            state.parameterSelected = parameterGiven;
        },
        SET_GRAPH_DATA(state, data) {
            state.graphData = data;
        },
        SET_LOADING(state, payload) {
            state.isLoading = payload;
        },
        updateRelayName(state, { id, name }) {
            // Find the relay switch by id and update its name
            for (const device of Object.values(state.devices)) {
                const relay = device.R.find(r => r.id === id);
                if (relay) {
                    relay.name = name;
                    break;
                }
            }
        }
    },
      actions: {

        async fetchCountryData({ commit, state }) {
            try {
              const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/togetdata/${state.countryName}`);
              const cities = Object.keys(response.data);
      
              cities.forEach((city, index) => {
                const cityData = response.data[city];
                commit('setCityData', {
                  cityIndex: index + 1,
                  cityData: { 
                    name: city, 
                    aqi: cityData.aqi, 
                    pm25: cityData.pm25, 
                    pm10: cityData.pm10, 
                    so2: cityData.so2, 
                    co: cityData.co, 
                    o3: cityData.o3, 
                    no2: cityData.no2 
                  }
                });
              });
            } catch (error) {
              console.error('Error fetching country data:', error);
            }
          },
          async fetchTopCityData({ commit }) {
            try {
              const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/togetdata/Top`);
              const topCities = Object.keys(response.data);
      
              topCities.forEach(city => {
                const aqi = response.data[city].aqi;
                commit('setTopCityAQI', { city, aqi });
              });
            } catch (error) {
              console.error('Error fetching top city data:', error);
            }
          },
          setLoading({ commit }, payload) {
            commit('SET_LOADING', payload);
          },
    },
    getters: {

        getCountryName(state) {return state.countryName;},
        getCountryAqi(state) {return state.city1aqi;},
        
        getcity1name(state) { return state.city1name;},
        getcity2name(state) { return state.city2name;},
        getcity3name(state) { return state.city3name;},

        getcity1Aqi(state) { return state.city1aqi;},
        getcity2Aqi(state) { return state.city2aqi;},
        getcity3Aqi(state) { return state.city3aqi;},

        getCountrypm25(state) {return state.city1pm25;},
        getCountrypm10(state) {return state.city1pm10;},
        getCountryso2(state) {return state.city1so2;},
        getCountryco(state) {return state.city1co;},
        getCountryo3(state) {return state.city1o3;},
        getCountryno2(state) {return state.city1no2;},

        gettopcity1(state) {return state.top10London;},
        gettopcity2(state) {return state.top10Dubai;},
        gettopcity3(state) {return state.top10Seoul},
        gettopcity4(state) {return state.top10HongKong;},
        gettopcity5(state) {return state.top10NewYork;},
        gettopcity6(state) {return state.top10Sydney;},
        gettopcity7(state) {return state.top10Paris;},
        gettopcity8(state) {return state.top10Rome;},
        gettopcity9(state) {return state.top10Tokyo;},
        gettopcity10(state) {return state.top10Delhi;},        

        cityData: state => index => ({
          name: state[`city${index}name`],
          aqi: state[`city${index}aqi`],
          pm25: state[`city${index}pm25`],
          pm10: state[`city${index}pm10`],
          so2: state[`city${index}so2`],
          co: state[`city${index}co`],
          o3: state[`city${index}o3`],
          no2: state[`city${index}no2`]
        }),
        topCityAQI: state => city => state[`top10${city}`],
        
        toGetDeviceValid(state) {
            return state.deviceIsValid;
        },
        toGetDeviceId(state) {
            return state.deviceId;
        },
        toGetTime(state) {
            return state.time;
        },
        toGetTimeRange(state) {
            return state.timeRange;
        },
        toGetParameterSelected(state) {
            return state.parameterSelected;
        },
        toGetGraphData(state) {
            return state.graphData;
        },
    }
});

export default store;