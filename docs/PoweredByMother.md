<script setup>
import PoweredByMotherItem from '../../components/PoweredByMotherItem.vue'

const items = [
    {
        name: 'R.H.M.C. Iron Talon (Dreadnought-Class)',
        author: 'Tony',
        author_link: 'https://steamcommunity.com/profiles/76561198019509863/',
        link:  'https://steamcommunity.com/sharedfiles/filedetails/?id=3453629232',
        image_link: 'https://images.steamusercontent.com/ugc/5173159098383551/E6E9101E89BB9E801F5216E0C7C56E640EBBDCCE/',
        description: 'The Iron Talon serves as RHMC’s flagship, leading strike groups into hostile sectors and acting as a command center during high-profile operations. Its mere presence in a system is often enough to force opposing fleets into surrender. RHMC uses the Iron Talon not just as a weapon, but as a symbol of their unwavering power and dedication to maintaining balance in the void.',
    },
    {
        name: 'MoonBat Light Shuttle',
        author: 'Iron Fiore',
        author_link: '#',
        link:  'https://steamcommunity.com/sharedfiles/filedetails/?id=3445385227',
        image_link: 'https://images.steamusercontent.com/ugc/23187381868450836/83F32555DE89BB930E2802DCC40AA64921B04F2C/',
        description: 'The MoonBat has many automated systems controlled by the Mother OS script.',
    }

]
</script>

# Powered By Mother

<div style="display: flex; flex-wrap: wrap; gap: 1rem; flex-direction: column;">
    <PoweredByMotherItem v-for="(item, index) in items" :key="index" :item="item"/>
</div>

<!-- ## MoonBat Light Shuttle -->

