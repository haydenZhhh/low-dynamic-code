<script setup>

// import Dustbin from './dustbin.vue'
import Box from './lowBox.vue'

</script>

<template>
  <div>
    <!-- <div :style="{ overflow: 'hidden', clear: 'both' }">
      <Dustbin />
    </div> -->
    <div :style="{ overflow: 'hidden', clear: 'both' }">
      <Box name="Glass" />
      <Box name="Banana" />
      <Box name="Paper" />
    </div>
  </div>
</template>