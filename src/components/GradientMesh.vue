<template>
    <canvas :id="`gradient-canvas${index}`"></canvas>
</template>

<script>
import { Gradient } from 'whatamesh';

export default {
    props: {
        index: Number
    },
    mounted() {
        const gradient1 = new Gradient();
        const gradient2 = new Gradient();
        const gradient3 = new Gradient();
        gradient1.initGradient("#gradient-canvas1");
        gradient2.initGradient("#gradient-canvas2");
        gradient3.initGradient("#gradient-canvas3");
    },
}
</script>

<style lang='scss' scoped>
#gradient-canvas1, #gradient-canvas2, #gradient-canvas3 {
	width: 100%;
	height: 100%;
	/* Adjust the colors below to get a different gradient */
	/* You can use https://whatamesh.vercel.app/ to generate them */
	--gradient-color-1: #165576;
	--gradient-color-2: #196A88;
	--gradient-color-3: #1E88A0;
	--gradient-color-4: #2298B4;
}

#gradient-canvas3 {
    border-radius: 18px;
}
</style>