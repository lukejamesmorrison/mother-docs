<template>
    <div class="card" :to="link">
        <!-- Graphic slot-->
        <div>
            <slot name="graphic"></slot>
        </div>
        <!-- <slot name="graphic"></slot> -->

        <!-- Title slot-->
        <div>
            <span>{{ title }}</span>
        </div>

        <!-- Description slot-->
        <div>
            <span :innerHTML="description"></span>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        title: String,
        description: String,
        link: String
    }
}
</script>

<style scoped>
.card {
    border: 1px solid #eaecef;
    border-radius: 5px;
    padding: 1rem;
    margin-bottom: 1rem;
    /* box-shadow: 0 2px 4px rgba(0,0,0,0.1); */
    transition: box-shadow 0.3s;
}
</style>