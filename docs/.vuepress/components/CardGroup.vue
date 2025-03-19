<template>
    <div class="card-group">
        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.card-group {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 1rem;
    margin: 1rem 0;
}
</style>