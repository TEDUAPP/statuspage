<style scoped>
    .box {
        border: 1px solid rgb(82, 88, 92);
        box-shadow: rgb(43, 47, 49) 0px 0px 16px;
        background: rgb(27, 29, 30);
        position: relative;
        color: rgb(232, 230, 227);
    }

    .node {
        flex: 1 1 0;
        padding: 0;
        margin: 4px;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
    }
    .box.error, .error .box {
        background: #d7b000;
        color: #ffffff;
        border-color: #9e6c00;
    }
    .box.danger, .danger .box {
        background: #d73000;
        color: #ffffff;
        border-color: #9e2000;
    }
    .danger td {
        color: #ffffff;
    }

    .error td {
        color: #ffffff;
    }

    .node h3 {
        font-weight: 900;
        font-size: 1em;
        text-align: center;
        margin: 0;
        padding: 0;
    }

    .node .header {
        display: grid;
        grid-template-columns: [first] 20% auto [last] 20%;
        color: rgb(232, 230, 227);
        background-color: rgb(83, 88, 4);
    }

    .node.default .header {
        background: rgb(25, 106, 178);
        color: rgb(232, 230, 227);
    }

    .node.error .header {
        background: rgb(172, 141, 0);
        color: rgb(232, 230, 227);
    }

    .node.danger .header {
        background: rgb(172, 38, 0);
        color: rgb(232, 230, 227);
    }
    
    .node .header .title {
        text-align: center;
    }

    .node .header div:first-child {
        text-align: left;
    }

    .node .header div:last-child {
        text-align: right;
    }

    .node .header > * {
        padding: 0.8em;
    }

    .value-table {
        padding: 0;
        border: 0;
        border-spacing: 0;
        border-collapse: collapse;
        width: 100%;
    }

    .value-table td {
        padding: 4px;
        white-space: nowrap;
    }

    .value-table .count {
        background: rgba(0, 0, 0, 0.2);
        padding: 4px;
    }
    .value-table .error, .value-table .error a {
        background: rgb(172, 141, 0);
        color: rgb(232, 230, 227);
    }
    .value-table .danger, .value-table .danger a {
        background: rgb(172, 38, 0);
        color: rgb(232, 230, 227);
    }

    .expandable {
        position: relative;
        cursor: default;
        text-decoration: underline; 
        text-underline-position: under; 
        text-decoration-style: dotted;
    }

    .expandable .expanded {
        position: absolute;
        display: block;
        pointer-events: none;

        right: 0;
        top: 0;

        z-index: 99;
        transition: all .15s;
        opacity: 0;
        transform: rotateX(20deg) rotateY(20deg) scale(0.8);
        transform-origin: 100% 0;
    }

    .expandable.left .expanded {
        left: 0;
        right: auto;
        transform: rotateX(20deg) rotateY(-20deg) scale(0.8);
        transform-origin: 0 0;
    }

    .expandable:hover .expanded, .expandable .expanded:hover {
        padding: 0;
        opacity: 1;
        transform: rotateX(0) rotateY(0);
    }

    .overlay {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        pointer-events: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .seethrough {
        background: rgba(0, 0, 0, 0.3);
    }

    .sideways {
        transform: rotateZ(-20deg);
    }

    .seethrough * {
        opacity: 0.7;
    }

    .scale-5x {
        transform: scale(5);
    }

    .full {
        font-size: 3.5em;
        font-weight: 900;
    }

    a {
        text-decoration: none;
        color: #000000;
    }

    .other {
        color: #aaa;
        cursor: default;
    }

    .tooltip {
        width: 300px;
    }

    .tooltip p {
        padding: 16px !important;
        margin: 0;
        text-align: justify;
        font-weight: 100;
    }
</style>

<template>
   <div :class="[
       'node', 'box',
        { 
           'danger': status.error,
           'error': status.highLoad,
           'default': status.isDefault,
        }
    ]">
        <div class="header">
            <div class="expandable left">
                {{ status.cpu | cpu }}%
                <div class="expanded box">
                    <table class="value-table">
                        <Indicator item-name="CPU" good=".25" bad=".75" :value="status.cpu">{{ status.cpu | cpu }}%</Indicator>
                        <Indicator item-name="RAM" :good="isProxy ? 300 : 200" :bad="isProxy ? 600 : 400" :value="status.ram">{{ status.ram }}MiB</Indicator>
                        <Indicator v-if="!isProxy" item-name="Avg. ping" good="200" bad="500" :value="status.avgPing">{{ status.avgPing }}ms</Indicator>
                        <Indicator v-if="!isProxy" item-name="Avg. loop" good="5" bad="10" :value="status.loop">{{ status.loop | twoDigits }}ms</Indicator>
                        <Indicator item-name="Error rate" good=".2" bad=".75" :value="status.errorRate">{{ status.errorRate | twoDigits }}</Indicator>
                    </table>
                </div>
            </div>
            <h3 class="title" v-if="!isProxy">
                Cluster #{{ status.nodeId }}
                <span class="expandable left" v-if="status.isDefault">
                *
                <div class="box expanded tooltip">
                    <p>
                        This is the default node for new connections. Most likely, new incoming connections will handled on this cluster.
                    </p>
                </div>
                </span>
            </h3>
            <h3 class="title" v-if="isProxy">Load Balancer</h3>
        </div>
        <div v-if="isProxy">
            <p>
                The loadbalancer is the entry point for all connections to the app server. Here, all incoming connections are inspected and sent on to the right cluster. Outgoing messages are sent back to the correct destination.
            </p>
        </div>
        <div class="overlay seethrough" v-if="status.locked">
            <svg class="scale-5x" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path d="m3,9v11h14V9M4,9V6c0-3.3 2.7-6 6-6c3.3,0 6,2.7 6,6v3H14V6c0-2.2-1.8-4-4-4-2.2,0-4,1.8-4,4v3"/>
            </svg>
            <div class="overlay sideways full">
                Disabled
            </div>
        </div>
    </div>
</template>

<script>
import Indicator from './Indicator.vue'

export default {
    name: 'Node',
    components: {
        Indicator,
    },
    props: {
        status: Object,
        isProxy: Boolean,
    }
}
</script>