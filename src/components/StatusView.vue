<style scoped>
    .content {
        max-width: 1400px;
        margin: auto;
    }

    .nodelist, .incidents {
        padding: 0 2em;
        margin-bottom: 4em;
    }

    .chart {
        padding: 0 2em;
        margin-bottom: 0em;
        display: flex;
        flex-direction: row;
    }

    .charttext {
        padding: 0 2em;
        margin-bottom: -2em;
        width: 100%;
        display: flex;
        font-size: 1em;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }

    .instances {
        display: flex;
        flex-direction: row;
    }

    @media (max-width : 1000px) {
        .instances {
            flex-direction: column;
        }
    }

    .internet {
        border: dotted 3px #8c8273;
        text-align: center;
        margin: 4px;
        padding: 10px;
    }

    .connections {
        margin-top: -4px;
        margin-bottom: -4px;
        display: flex;
        flex-direction: row;
    }

    a:link {
        color: palevioletred;
        background-color: transparent;
        text-decoration: none;
    }

    a:visited {
        color: palevioletred;
        background-color: transparent;
        text-decoration: none;
    }

    a:hover {
        color: red;
        background-color: transparent;
        text-decoration: underline;
    }
</style>

<template>
    <div class="content">
        <h1>TEDUApp Cluster System Status</h1><br>
        <small>Based on <a href="https://status.gamemakerserver.com/">the status page of GameMakerServer</a> | <a href="https://github.com/TEDUAPP/statuspage">Source Code</a></small>
        <div class="chart">
            <Chart :points="cpuHistory" />
            <div style="width: 5em"></div>
            <Chart :points="ramHistory" />
        </div>
        <div class="charttext">
            <h2 style="width: 160px; align-items: center;">CPU Usage</h2>
            <div style="width: 5em"></div>
            <h2 style="width: 160px; align-items: center;">RAM Usage</h2>
        </div>
        <h1>Detailed view</h1>
        <div class="nodelist">
            <div class="internet">
                The Internet
            </div>
            <div class="connections">
                <svg width="100%" height="40">
                    <line x1="50%" y1="0" x2="50%" y2="350" stroke="#8c8273" stroke-width="15" />
                </svg>
            </div>
            <Node :status="status.proxy" :isProxy="true"></Node>
            <div class="connections">
                <svg width="100%" height="40"  v-for="(instance, index) in status.instances" :key="index">
                    <line x1="50%" y1="0" x2="50%" y2="350" :stroke="instance.error ? '#FF0000' : instance.highLoad ? '#FFFF00' : instance.isDefault ? '#1F85DE' : '#555'" stroke-width="8" />
                </svg>
            </div>
            <div class="instances">
                <Node :status="instance" :isProxy="false" v-for="(instance, index) in status.instances" :key="index"></Node>
            </div>
        </div>
        
        <h1>Incidents</h1>
        <div class="incidents">
            <Incident :data="incident" v-for="(incident, index) in incidents" :key="index"></Incident>
        </div>
    </div>
</template>

<script>
import Node from './Node.vue'
import Chart from './Chart.vue'
import Incident from './Incident.vue'

export default {
    name: 'StatusView',
    components: {
        Node,
        Chart,
        Incident,
    },
    props: {
        status: Object,
        cpuHistory: Array,
        ramHistory: Array,
        incidents: Array,
    }
}
</script>