<style>
:root {
    background-color: #181a1b;
    color: aliceblue;
}
</style>

<template>
    <div id="app">
        <StatusView :status="status" :cpuHistory="cpuHistory" :ramHistory="ramHistory" :incidents="incidents"/>
    </div>
</template>

<script>
import StatusView from './components/StatusView.vue'

export default {
    name: 'App',
    components: {
        StatusView
    },
    data: () => {
        return {
            cpuHistory: [
                54, 40, 66, 77,
                54, 67, 13
            ],
            ramHistory: [
                44, 46, 55, 58,
                54, 49, 50
            ],
            status: {
                proxy: {},
                instances: []
            }
        };
    },
    mounted: async function () {
        var self = this;
        async function update() {
            var response = await fetch('https://teduapp.tedu.edu.tr/status/data2.json');
            var json = await response.json();

            self.cpuHistory = json.cpuHistory;
            self.ramHistory = json.ramHistory;
            self.incidents = json.incidents;
            self.status = {
                proxy: json.status.filter(x => x.isProxy)[0],
                instances: json.status.filter(x => !x.isProxy),
            };
        }

        await update();
        window.setInterval(update, 10 * 1000);
    }
}
</script>

<style>
* {
    box-sizing: border-box;
}

body {
    padding: 0;
    margin: 0;
}

#app {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-align: center;
}
</style>
