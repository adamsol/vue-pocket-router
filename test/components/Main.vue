
<template>
    <div>
        <router-link :to="$url('index')" class="index" />
        <router-link :to="$url('about')" class="about" />

        <router-view id="view" />
    </div>
</template>

<script>
    export default {
        watch: {
            $route() {
                this.$emit('route-changed');
            },
        },
    };
</script>
