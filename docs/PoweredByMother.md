<script setup>
import PoweredByMotherItem from '../../components/PoweredByMotherItem.vue'

const items = [
    {
        name: 'MoonBat Light Shuttle',
        author: 'Iron Fiore',
        author_link: '#',
        link:  'https://steamcommunity.com/sharedfiles/filedetails/?id=3445385227',
        image_link: 'https://images.steamusercontent.com/ugc/23187381868450836/83F32555DE89BB930E2802DCC40AA64921B04F2C/',
        description: 'The MoonBat has many automated systems controlled by the Mother OS script.',
    },
    {
        name: 'R.H.M.C. Iron Talon (Dreadnought-Class)',
        author: 'Tony',
        author_link: 'https://steamcommunity.com/profiles/76561198019509863/',
        link:  'https://steamcommunity.com/sharedfiles/filedetails/?id=3453629232',
        image_link: 'https://images.steamusercontent.com/ugc/5173159098383531/BC1CDA43C40F15E46BE4201612B419E03DB91BCC/',
        description: 'The Iron Talon serves as RHMC’s flagship, leading strike groups into hostile sectors and acting as a command center during high-profile operations. Its mere presence in a system is often enough to force opposing fleets into surrender. RHMC uses the Iron Talon not just as a weapon, but as a symbol of their unwavering power and dedication to maintaining balance in the void.',
    },
    {
        name: 'Lizzo - Terrestrial Mining Aircraft',
        author: 'Agentluke',
        author_link: '#',
        link:  'https://steamcommunity.com/sharedfiles/filedetails/?id=3463861021',
        image_link: 'https://images.steamusercontent.com/ugc/59217531467803836/1E5268EAF0CD8D59DF221516BB7549639FADEFC6/',
        description: 'The Lizzo is a terrestrial mining aircraft designed for use on planets. It is equipped with an array of drills and modest cargo hold for routine mining runs. It uses Mother OS for flight planning and automation.',
    },

]
</script>

# Powered By Mother

This section showcases some of the best grids that utilize the Mother OS script to run their operations. If you are using Mother OS, show it off by completing this [short questionnaire](https://docs.google.com/forms/d/e/1FAIpQLSfIK4i_UdRxobiCem7IqTA4Fc9fTmyq5Tg_vzdGWCdtuOOXYg/viewform?usp=dialog).

<div style="display: flex; flex-wrap: wrap; gap: 1rem; flex-direction: column;">
    <PoweredByMotherItem v-for="(item, index) in items" :key="index" :item="item"/>
</div>
