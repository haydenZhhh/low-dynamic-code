<template>
    <div class="setIteamPanenl">
        <div class="setTitle">
            <div class="icon" />
            <div>表单提交接口</div>
        </div>
        <div class="setInput">
            <el-input style="width: 100%" placeholder="Please input" />
        </div>
    </div>

</template>

<script setup>

</script>

<style>
.titlePanenl {
    width: 100%;
}

.icon {
    background-color: rgb(47, 136, 225);
    height: 14px;
    width: 4px;
    margin-right: 4px;
}
.setTitle{
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    margin-bottom: 10px;
    height: 16px;
}
</style>