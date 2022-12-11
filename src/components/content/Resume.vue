<template>
	<div class="resume-container">
		<img src="../../assets/files/Resume.png" />
        <a href="https://github.com/trentbrew/portfolio2022/raw/main/src/assets/files/Resume.pdf" class="download">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M3.5 13h9a.75.75 0 0 1 .102 1.493l-.102.007h-9a.75.75 0 0 1-.102-1.493L3.5 13h9h-9zM7.898 1.007L8 1a.75.75 0 0 1 .743.648l.007.102v7.688l2.255-2.254a.75.75 0 0 1 .977-.072l.084.072a.75.75 0 0 1 .072.977l-.072.084L8.53 11.78a.75.75 0 0 1-.976.073l-.084-.073l-3.536-3.535a.75.75 0 0 1 .977-1.133l.084.072L7.25 9.44V1.75a.75.75 0 0 1 .648-.743L8 1l-.102.007z" fill="currentColor"></path></g></svg>
        </a>
	</div>
</template>

<style lang="scss" scoped>
.download {
    position: absolute;
    width: 42px;
    height: 42px;
    color: white;
    font-weight: bold;
    background: #95D098;
    backdrop-filter: blur(20px);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    bottom: 32px;
    right: 36px;
    text-decoration: none;
    transition: 150ms;
    cursor: pointer;

    svg {
        width: 18px;
        height: 18px;
    }

    &:hover {
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.9);
    }
}

img {
    border-radius: 8px;
    width: 100%;
}

.resume-container {
    overflow: auto;
    width: 100%;
    height: 100%;
    padding-right: 6px;
    border-radius: 8px;
}
</style>