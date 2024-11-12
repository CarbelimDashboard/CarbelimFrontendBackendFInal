<script setup>
import { ref } from 'vue';

// Simulate fetching data from an API
const fetchAQIData = async () => {
    return [
        {
            id: '0',
            question: 'What is the optimum range of AQI for healthy air quality?',
            answer: 'The optimum range of AQI for healthy air quality is 0-50. This range is considered "Good" and poses little or no risk to health.'
        },
        {
            id: '1',
            question: 'What are the main pollutants measured to determine the AQI?',
            answer: 'The main pollutants measured to determine the AQI are particulate matter (PM10 and PM2.5), nitrogen dioxide (NO2), sulfur dioxide (SO2), carbon monoxide (CO), ozone (O3), and ammonia (NH3).'
        },
        {
            id: '2',
            question: 'What health advisories are issued when the AQI level is between 101 and 200?',
            answer: 'When the AQI level is between 101 and 200, it is categorized as "Moderate." People with respiratory diseases, children, and older adults may experience health effects, and they are advised to reduce prolonged outdoor exertion.'
        },
        {
            id: '3',
            question: 'What measures can individuals take to protect themselves during high AQI days?',
            answer: 'During high AQI days, individuals can protect themselves by staying indoors as much as possible, using air purifiers at home, wearing masks designed to filter out particulate matter when outdoors, avoiding strenuous outdoor activities, and keeping windows closed to prevent outdoor air from entering indoors.'
        },
        {
            id: '4',
            question: 'What is the AQI range that indicates unhealthy air quality for sensitive groups?',
            answer: 'The AQI range that indicates unhealthy air quality for sensitive groups is 101-150. This level is considered "Unhealthy for Sensitive Groups," and it may cause health effects in people with respiratory or heart conditions, children, and older adults. These groups should limit prolonged outdoor activities.'
        },
        {
            id: '5',
            question: 'How can the AQI affect individuals with asthma or heart conditions?',
            answer: 'Individuals with asthma or heart conditions are particularly vulnerable to air quality levels above 100 AQI. When the AQI reaches this level or higher, people with these conditions may experience difficulty breathing, wheezing, coughing, or chest pain. They should take extra precautions by staying indoors and following their medical advice.'
        },
    ];
};

const faqs = ref([]);

const loadAQIData = async () => {
    faqs.value = await fetchAQIData();
};

loadAQIData();
</script>

<template>
    <div>
        <div class="container my-4">
            <h4 class="text-center">FAQs of Air Quality Index</h4>
            <p class="text-center">Facts about air pollution and air quality</p>
            <div class="accordion accordion-flush" id="accordionFlushExample" role="tablist">
                <div v-for="(faq, index) in faqs" :key="faq.id" class="accordion-item">
                    <h2 class="accordion-header" :id="'flush-heading' + faq.id" role="tab">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            :data-bs-target="'#flush-collapse' + faq.id" aria-expanded="false"
                            :aria-controls="'flush-collapse' + faq.id">
                            {{ index + 1 }}. {{ faq.question }}
                        </button>
                    </h2>
                    <div :id="'flush-collapse' + faq.id" class="accordion-collapse collapse"
                        :aria-labelledby="'flush-heading' + faq.id" data-bs-parent="#accordionFlushExample"
                        role="tabpanel">
                        <div class="accordion-body">{{ faq.answer }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container{
    background-color: #ffffff;
    border-radius: 8px;
    padding: 12px 0px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h4,
h2,
button {
    color: #289BD1;
}
</style>
