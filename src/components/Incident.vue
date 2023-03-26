<style scoped>
    ul {
        list-style-type: none;
        padding-left: 0;
    }

    li {
        text-align: left;
        padding: 1em;
    }

    li small {
        display: block;
        margin-bottom: 2px;
    }

    .closed {
        opacity: 0.3;
    }

    h3 {
        margin: 0;
    }

    small {
        padding: 0;
        color: rgb(168, 160, 149);
    }

    b.tag {
        display: inline-block;
        padding: 2px;
        border: 2px solid #000;
        border-radius: 4px;
        padding-left: 8px;
        padding-right: 8px;
        cursor: default;
    }

    b.entry-Notice {
        background: rgb(72, 78, 81);
        border-color: rgb(140, 130, 115);
    }

    b.entry-Proactive, b.entry-Update {
        background: rgb(88, 130, 23);
        border-color: rgb(95, 181, 18);
    }

    b.entry-Minor {
        background: rgb(100, 86, 11);
        border-color: rgb(165, 142, 18);
    }

    b.entry-Major {
        background: rgb(156, 79, 0);
        border-color: rgb(165, 92, 18);
    }

    b.entry-Critical {
        background: rgb(204, 0, 0);
        color: rgb(232, 230, 227);
        border-color: rgb(214, 0, 0);
    }

    div {
        text-align: left;
    }

    .root {
        margin-bottom: 40px;
    }

    .human-needed {
        background: rgb(97, 18, 0);
    }
</style>

<template>
    <div :class="{
            'root': true,
            'closed': data.closed != null
        }">
        <h3>{{ data.title }}</h3>
        <small>Started {{ data.started | relativeTime }}</small>
        <div v-if="data.closed != null">
            <small>Resolved {{ data.closed | relativeTime }}</small>
        </div>
        <ul>
            <li :class="{
                'human-needed': log.humanNeeded,    
            }" v-for="(log, index) in data.logs" :key="index">
                <small>{{ log.loggedAt | relativeTime }}</small>
                <b :class="'tag entry-' + log.severity">{{ log.severity }}</b>
                {{ log.description }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Node',
    props: {
        data: Object,
    }
}
</script>