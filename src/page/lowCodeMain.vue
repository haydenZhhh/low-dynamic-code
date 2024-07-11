<template>
    <div class="codeMain">
        <div class="componentStack">
            <LowStack />
        </div>
        <div class="showcodeComponent">

        </div>
        <div class="configurationArea"></div>
    </div>
</template>

<script setup>
import LowStack from '../lowStack/index.vue'

</script>

<style scoped>
.codeMain {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}

.componentStack {
    width: 20vw;
    height: 100%;
    background-color: aqua;
}

.showcodeComponent {
    width: 60vw;
    background-color: rgb(237, 239, 243);
    height: 100%;

}

.configurationArea {
    width: 20vw;
    background-color: aqua;
    height: 100%;

}
</style>