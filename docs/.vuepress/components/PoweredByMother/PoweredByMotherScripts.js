/**
 * Powered By Mother Scripts
 *
 * This file contains an array of scripts that are powered by Mother Core.
 * Each object includes details such as the name, author, links, and description.
 * `page` accepts an internal documentation path or an external URL.
 * External URLs open in a new tab; `pageLabel` optionally overrides "Documentation".
 */
import printedByMotherPoster from '../../../PrintedByMother/Printed By Mother Poster.png';

export default [
    // Mother OS
    {
        name: 'Mother OS',
        author: 'Agentluke',
        author_link: '#',
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3411507973',
        image_link: 'https://images.steamusercontent.com/ugc/59210475763089790/09876B808A536945EDBED7536344F511E34C56D2/',
        description: 'Mother OS is a powerful automation and control script for Space Engineers. It provides a comprehensive command system, module architecture, and seamless integration with blocks on your grid.',
        tags: ['Automation'],
        page: '/IngameScript/IngameScript.html',
    },
    // Mother GUI
    {
        name: 'Mother GUI',
        author: 'Agentluke',
        author_link: '#',
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3724497528',
        image_link: 'https://images.steamusercontent.com/ugc/12753062783282397682/00B22E090DE5F4EC3A24365E3FA15DD8B577E2B5/',
        description: 'Mother GUI is a user-friendly interface Powered by Mother, providing an intuitive way to manage and control your automations. It offers a flexible menu system and seamless integration with Mother OS.',
        tags: ['Automation', 'User Interface', 'GUI'],
        page: '/MotherGUI/',
    },
    // MAPS (Mother Autopilot System)
    {
        name: 'Mother Autopilot System (MAPS)',
        author: 'Agentluke',
        author_link: '#',
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3724504005',
        image_link: 'https://images.steamusercontent.com/ugc/13629878544077338400/E8B8C406B5F63E9AECD2FE43C9B90024EEF53EE1/',
        description: 'Mother Autopilot System (MAPS) is an advanced autopilot system powered by Mother, providing automated navigation and control for your ships. It integrates seamlessly with Mother OS and manages customizable flight plans.',
        tags: ['Automation', 'Autopilot', 'Navigation'],
        page: '/MotherAutopilotSystem/',
    },
    // Printed by Mother
    {
        name: 'Printed by Mother',
        author: 'Malleus',
        author_link: '#',
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3836300920',
        image_link: 'https://images.steamusercontent.com/ugc/15493380310992603268/E248DD5A2DA76D7D4F885CB3EF8A55FF331CA54A/',
        description: 'Printed by Mother is a script that manages and controls 3D printing processes in Space Engineers, powered by Mother. It integrates with Mother OS to provide seamless automation and control over your printing tasks.',
        tags: ['Automation', 'Printing'],
        page: '/PrintedByMother/',
        pageLabel: 'Documentation',
    },
    // Mother HMI
    {
        name: 'Mother HMI',
        author: 'Dext3r09',
        author_link: '#',
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3835518776',
        image_link: 'https://images.steamusercontent.com/ugc/16240315160970027447/5696FC957D8D06227CFECAE76F5D8DCDF214823C/',
        description: "MotherHMI turns the LCDs of your base into an old-school control room. It draws your factory as a schematic made of cells: pipes, labels, lamps, arrows and level bars that show what the blocks are doing, plus buttons, switches and sorter controls that you operate with a cursor. Everything is set up by pasting text into Custom Data: you don't need to know any programming.",
        tags: ['Automation', 'User Interface', 'HMI'],
        page: 'https://dext3r09-engineering-public.gitlab.io/space-engineers/motherhmi/index.html',
        pageLabel: 'Documentation',
    },
];

