<script>
  import Card from '@/components/content/Card.vue'

  const CATEGORY_BLOGS = 'Blog/Articles'
  const CATEGORY_WEBSITES = 'Websites/Inspiration'
  const CATEGORY_YOUTUBE = 'YouTube Videos'

  export default {
    name: 'Collections',
    components: {
      Card,
    },
    data() {
      return {
        category: '',
        CATEGORY_BLOGS,
        CATEGORY_WEBSITES,
        CATEGORY_YOUTUBE,
        bookmarks: [
          // ─────────────── BLOG / ARTICLES ───────────────
          {
            title: 'Maggie Appleton – Digital Garden',
            category: CATEGORY_BLOGS,
            description:
              'Visual essays on tools for thought and knowledge gardening.',
            stack: ['Essay'],
            thumb:
              'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://maggieappleton.com/garden' },
            newtab: true,
          },
          {
            title: 'Andy Matuschak – Evergreen Notes',
            category: CATEGORY_BLOGS,
            description:
              'Networked notes on learning, memory, and tools for thought.',
            stack: ['Notes'],
            thumb:
              'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=800&q=80',
            content: {
              link: 'https://notes.andymatuschak.org/About_these_notes',
            },
            newtab: true,
          },
          {
            title: 'Bret Victor – Media for Thinking the Unthinkable',
            category: CATEGORY_BLOGS,
            description:
              'Explorations of dynamic media and interactive explanations.',
            stack: ['Essay'],
            thumb:
              'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
            content: {
              link: 'https://worrydream.com/MediaForThinkingTheUnthinkable/',
            },
            newtab: true,
          },
          {
            title: 'Gordon Brander – Subconscious',
            category: CATEGORY_BLOGS,
            description:
              'Essays on tools for thought, feedback loops, and building blocks.',
            stack: ['Substack'],
            thumb:
              'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://subconscious.substack.com/' },
            newtab: true,
          },
          {
            title: 'Ink & Switch – Embark',
            category: CATEGORY_BLOGS,
            description:
              'Research lab exploring local-first software and creative tools.',
            stack: ['Research'],
            thumb:
              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://www.inkandswitch.com/embark/' },
            newtab: true,
          },
          {
            title: 'Riffle Systems – Essays',
            category: CATEGORY_BLOGS,
            description:
              'Deep dives on reactive databases and end-user programming.',
            stack: ['Essay'],
            thumb:
              'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://riffle.systems/essays' },
            newtab: true,
          },
          {
            title: 'Michael Nielsen – Reinventing Explanation',
            category: CATEGORY_BLOGS,
            description:
              'Interactive essays on new forms of explanation and understanding.',
            stack: ['Essay'],
            thumb:
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
            content: {
              link: 'https://michaelnielsen.org/reinventing_explanation/index.html',
            },
            newtab: true,
          },
          {
            title: 'Rauno Freiberg – Interaction Design',
            category: CATEGORY_BLOGS,
            description:
              'Craft notes on fidgetability and delightful interfaces.',
            stack: ['Design'],
            thumb:
              'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://rauno.me/craft/interaction-design' },
            newtab: true,
          },
          // ─────────────── WEBSITES / INSPIRATION ───────────────
          {
            title: '21st.dev',
            category: CATEGORY_WEBSITES,
            description:
              'Community-driven component library with beautiful examples.',
            stack: ['Components'],
            thumb:
              'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://21st.dev/' },
            newtab: true,
          },
          {
            title: 'Mobbin',
            category: CATEGORY_WEBSITES,
            description:
              'User flows and UI references from the latest mobile & web apps.',
            stack: ['Patterns'],
            thumb:
              'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://mobbin.com/browse/ios/apps' },
            newtab: true,
          },
          {
            title: 'Aceternity UI',
            category: CATEGORY_WEBSITES,
            description:
              'Beautiful Tailwind components with stunning animations.',
            stack: ['Components'],
            thumb:
              'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://ui.aceternity.com/' },
            newtab: true,
          },
          {
            title: 'Motion Primitives',
            category: CATEGORY_WEBSITES,
            description: 'Copy-paste animated components for React.',
            stack: ['Animation'],
            thumb:
              'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://motion-primitives.com/docs' },
            newtab: true,
          },
          {
            title: 'Eyecannndy',
            category: CATEGORY_WEBSITES,
            description:
              'Visual techniques and effects for creative inspiration.',
            stack: ['Inspiration'],
            thumb:
              'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://eyecannndy.com/' },
            newtab: true,
          },
          {
            title: 'Same Energy',
            category: CATEGORY_WEBSITES,
            description: 'Visual search engine for aesthetic discovery.',
            stack: ['Search'],
            thumb:
              'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://same.energy/' },
            newtab: true,
          },
          {
            title: 'Crafted',
            category: CATEGORY_WEBSITES,
            description: 'Curated collection of the finest digital products.',
            stack: ['Showcase'],
            thumb:
              'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://crafted.is/' },
            newtab: true,
          },
          {
            title: 'Amelia Wattenberger',
            category: CATEGORY_WEBSITES,
            description:
              'Thoughts on evolving the infinite canvas and data viz.',
            stack: ['Portfolio'],
            thumb:
              'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://wattenberger.com/' },
            newtab: true,
          },
          {
            title: 'Kinopio',
            category: CATEGORY_WEBSITES,
            description: 'Spatial thinking tool for ideas and connections.',
            stack: ['Tool'],
            thumb:
              'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://kinopio.club/' },
            newtab: true,
          },
          // ─────────────── YOUTUBE VIDEOS ───────────────
          {
            title: 'Herbie Hancock Teaches Jazz',
            category: CATEGORY_YOUTUBE,
            description:
              'Masterclass on improvisation and creative expression.',
            stack: ['Masterclass'],
            thumb:
              'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80',
            content: {
              link: 'https://www.masterclass.com/classes/herbie-hancock-teaches-jazz',
            },
            newtab: true,
          },
          {
            title: 'Linear – Why Quality Matters',
            category: CATEGORY_YOUTUBE,
            description:
              'Deep dive into building high-quality software products.',
            stack: ['Talk'],
            thumb:
              'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://www.youtube.com/watch?v=VcwhJaV6ZYs' },
            newtab: true,
          },
          {
            title: 'Cole Medin – AI Agents',
            category: CATEGORY_YOUTUBE,
            description: 'Tutorials on building AI agents and automation.',
            stack: ['Tutorial'],
            thumb:
              'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://www.youtube.com/@ColeMedin' },
            newtab: true,
          },
          {
            title: 'Developers Digest',
            category: CATEGORY_YOUTUBE,
            description: 'Quick tutorials on modern web development.',
            stack: ['Tutorial'],
            thumb:
              'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://www.youtube.com/@DevelopersDigest' },
            newtab: true,
          },
          {
            title: 'Cyan Voxel',
            category: CATEGORY_YOUTUBE,
            description: 'Creative coding and generative art explorations.',
            stack: ['Creative'],
            thumb:
              'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://www.youtube.com/@cyanvoxel' },
            newtab: true,
          },
          {
            title: 'Tools for Thought',
            category: CATEGORY_YOUTUBE,
            description: 'Interviews and discussions on knowledge tools.',
            stack: ['Podcast'],
            thumb:
              'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://www.youtube.com/@ToolsforThought' },
            newtab: true,
          },
          {
            title: 'Periscope Film',
            category: CATEGORY_YOUTUBE,
            description: 'Vintage educational and documentary films.',
            stack: ['Archive'],
            thumb:
              'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://www.youtube.com/@PeriscopeFilm' },
            newtab: true,
          },
          {
            title: 'Vusi Thembekwayo',
            category: CATEGORY_YOUTUBE,
            description: 'Business strategy and entrepreneurship insights.',
            stack: ['Business'],
            thumb:
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
            content: { link: 'https://www.youtube.com/@vthembekwayo' },
            newtab: true,
          },
        ],
      }
    },
    mounted() {
      this.updateCategory(CATEGORY_BLOGS)
    },
    methods: {
      updateCategory(category) {
        this.category = category
      },
    },
  }
</script>

<template>
  <div class="app">
    <div class="wrapper">
      <div class="left-side">
        <div class="side-wrapper">
          <div class="side-title">Collections</div>
          <div class="side-menu">
            <a
              :class="category == CATEGORY_BLOGS && 'category-active'"
              @click="updateCategory(CATEGORY_BLOGS)"
              href="#"
            >
              <div class="item-left">
                <svg viewBox="0 0 512 512" fill="currentColor">
                  <path
                    d="M497 3.4l-181 57.16V362c-18.938-6.59-39.4-10-61-10-89.64 0-162.5 54-170.4 123.1-.46 3.94 3.32 6.85 7.11 5.4L189 437l125 72 125-72 97.29 39.93c3.15 1.29 6.71-.62 7.11-3.82C548.1 360.4 497 304 497 304z"
                  />
                </svg>
                Blog / Articles
              </div>
            </a>
            <a
              :class="category == CATEGORY_WEBSITES && 'category-active'"
              @click="updateCategory(CATEGORY_WEBSITES)"
              href="#"
            >
              <div class="item-left">
                <svg viewBox="0 0 512 512" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15 300H211V360H136H133C124.716 360 118 366.716 118 375C118 383.284 124.716 390 133 390H136H271H318C326.284 390 333 383.284 333 375C333 366.716 326.284 360 318 360H271H241V300H256H271H436C444.284 300 451 293.284 451 285V90V15C451 10.858 449.321 7.108 446.607 4.3935C443.933 1.7197 440.254 0.0505867 436.186 0.00113106C436.124 0.000377655 436.062 0 436 0H256H15C6.716 0 0 6.716 0 15V285C0 293.284 6.716 300 15 300ZM25 32C25 28.6863 27.6863 26 31 26H420C423.314 26 426 28.6863 426 32V266C426 269.314 423.314 272 420 272H31C27.6863 272 25 269.314 25 266V32ZM403 47H49V252H403V47Z"
                  />
                </svg>
                Websites / Inspiration
              </div>
            </a>
            <a
              :class="category == CATEGORY_YOUTUBE && 'category-active'"
              @click="updateCategory(CATEGORY_YOUTUBE)"
              href="#"
            >
              <div class="item-left">
                <svg viewBox="0 0 512 512" fill="currentColor">
                  <path
                    d="M490.24,113.37a61.07,61.07,0,0,0-43.06-43.28C414.75,64,256,64,256,64s-158.75,0-191.18,6.09a61.07,61.07,0,0,0-43.06,43.28C16,145.92,16,256,16,256s0,110.08,5.76,142.63a61.07,61.07,0,0,0,43.06,43.28C97.25,448,256,448,256,448s158.75,0,191.18-6.09a61.07,61.07,0,0,0,43.06-43.28C496,366.08,496,256,496,256S496,145.92,490.24,113.37ZM208,336V176l160,80Z"
                  />
                </svg>
                YouTube Videos
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="main-container">
        <div class="content-wrapper">
          <div class="content-section">
            <Card
              v-for="(bookmark, index) in bookmarks"
              :key="index"
              :activeCategory="category"
              :project="bookmark"
              transition="expand"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="overlay-app"></div>
  </div>
</template>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono&display=swap');

  .expand-transition {
    transition: all 0.3s ease;
    height: 30px;
    padding: 10px;
    background-color: #eee;
    overflow: hidden;
  }

  .expand-enter,
  .expand-leave {
    height: 0;
    padding: 0 10px;
    opacity: 0;
  }

  .item-left {
    display: flex;
    align-items: center;

    svg {
      width: 14px !important;
      height: 14px !important;
      min-width: 14px;
      min-height: 14px;
      flex-shrink: 0;
    }
  }

  :root {
    --theme-bg-color: rgba(16 18 27 / 40%);
    --border-color: rgba(113 119 144 / 25%);
    --theme-color: #f9fafb;
    --inactive-color: rgb(113 119 144 / 78%);
    --body-font: 'Inter', sans-serif;
    --hover-menu-thumb: rgba(12 15 25 / 30%);
    --content-title-color: #999ba5;
    --content-thumb: rgb(146 151 179 / 13%);
    --button-inactive: rgb(249 250 251 / 55%);
    --dropdown-thumb: #21242d;
    --dropdown-hover: rgb(42 46 60);
    --popup-thumb: rgb(22 25 37);
    --search-thumb: #14162b;
    --overlay-thumb: rgba(36, 39, 59, 0.3);
    --scrollbar-thumb: rgb(1 2 3 / 40%);
  }

  .app {
    background-color: var(--theme-bg-color);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 500;
  }

  .wrapper {
    display: flex;
    flex-grow: 1;
    overflow: auto;
  }

  .left-side {
    flex-basis: 180px;
    border-right: 1px solid var(--border-color);
    padding: 26px;
    overflow: auto;
    flex-shrink: 0;

    @media screen and (max-width: 945px) {
      display: none;
    }
  }

  .side-title {
    color: $active_text;
    opacity: 0.2;
    font-weight: bold;
    margin-bottom: 14px;
    margin-top: 14px;
  }

  .side-menu {
    display: flex;
    flex-direction: column;
    white-space: nowrap;

    a {
      text-decoration: none;
      color: $active_text;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 400;
      padding: 10px;
      font-size: 14px;
      border-radius: $rad;

      &:hover {
        background-color: rgba(black, 0.3);
        transition: 0ms;
      }
    }

    .category-active {
      background-color: rgba(white, 0.1);

      &:hover {
        background-color: rgba(white, 0.06);
      }
    }

    svg {
      width: 14px;
      height: 14px;
      min-width: 14px;
      min-height: 14px;
      margin-left: 4px;
      margin-right: 8px;
      flex-shrink: 0;
    }
  }

  .main-container {
    background: #222222;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    color: var(--theme-color);
    padding: 20px 40px 40px 40px;
    height: 100%;
    overflow: auto;

    @media screen and (max-width: 510px) {
      padding: 20px;
    }
  }

  .content-section {
    margin-top: 18px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 36px;
  }

  .overlay-app {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    pointer-events: all;
    background-color: rgba(36, 39, 59, 0.8);
    opacity: 0;
    visibility: hidden;
    transition: 100ms;

    &.is-active {
      visibility: visible;
      opacity: 1;
    }
  }
</style>
