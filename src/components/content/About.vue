<template>
    <div class="about">
        <img id="ohai" src="../../content/animations/ohai2.gif" width="120" height="120" alt="hello">
        <h1>Hello</h1>
        <p>Thank you for visiting my site</p>
        <p>This concept started out as a smol sketch, and I had no idea what it would morph into, but it is a work in progress and has been a lot of fun to build 🌱 Your feedback is welcome!</p>
        <br><br><br>
        <b>A bit about me</b>
        <ul>
            <li><span>I grew up in St. Louis, Missouri, and moved to Chicago in 2017 where I currently reside. I've been freelancing since 2018, and most recently have been re-discovering the joys of game development.</span></li>
            <li><span>When I was 11 I discovered GameMaker on our old Dell PC, and became hooked on making Sonic the Hedgehog fan games, and sharing them on what was then <i>yoyogames.com</i>. GameMaker is still around and isn't much different from how it was in 2007, but I'm having a lot of fun discovering new tools like Unity and JS game dev frameworks.</span></li>
            <li><span>When I'm not coding I'm most likely doodling. I doodle a lot and it's become kind of a therapy for me.</span></li>
            <li><span>I'm an INTP personality type, so it's easiest for me to find flow when I'm by myself buliding things that I'm excited about. However, I'm working towards spending more time outside my shell 🐢</span></li>
        </ul>
        <br>
        <b>What I'm reading</b>
        <ul>
            <a href="https://amishi.com/books/peak-mind"><li><span>Peak Mind</span>: Find Your Focus, Own Your Attention</li></a>
            <a href="https://en.wikipedia.org/wiki/Talking_to_Strangers"><li><span>Talking to Strangers</span>: What We Should Know About People We Don't Know</li></a>
            <a href="http://www.theannotatedturing.com"><li><span>The Annotated Turing</span></li></a>
        </ul><br>
        <b>My favorite stuff on the web</b>
        <ul class="faves">
            <a target="_blank" href="https://same.energy"><li><span>Same Energy</span> | Visual Search Engine</li></a>
            <a target="_blank" href="https://coolors.co"><li><span>Coolors</span> | The super fast color palettes generator</li></a>
            <a target="_blank" href="https://toolhunt.dev"><li><span>Toolhunt</span> | Quality Devtools</li></a>
            <a target="_blank" href="https://youworkforthem.com"><li><span>YouWorkForThem</span> | Creative fonts and stock art</li></a>
            <a target="_blank" href="https://mnmll.ist"><li><span>Mnmllist</span> | Listing all things minimal</li></a>
            <a target="_blank" href="https://manuelmoreale.com"><li><span>Manu</span> | A lovely blog</li></a>
            <a target="_blank" href="https://minimalissimo.com"><li><span>Minimalissimo</span> | Minimalism in Design</li></a>
            <a target="_blank" href="https://flow.rest"><li><span>Flow</span> | Clear your mind through expressive writing</li></a>
        </ul>
    </div>
</template>

<style lang='scss' scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

.about {
    pointer-events: all !important;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    overflow: auto;
    width: 100%;
    height: 100%;
    color: white;
    background: #fff;
    border-radius: 8px;
    padding: 36px 240px 32px 64px;
    box-sizing: border-box;
}

#ohai {
    position: fixed;
    bottom: 12px;
    right: 96px;
    //filter: invert(1) contrast(0.73);
}

h1, h2, h3, b {
    //color: $japanese_indigo;
    color: black;
}

.faves {
    span {
        margin: 0px !important;
    }
}

img {
    border-radius: 6px;
    width: auto;
}

p, li {
    color: #999999;
    max-width: 550px;
}

a {
    color: black;
}
</style>