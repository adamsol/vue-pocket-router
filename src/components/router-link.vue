
<template>
    <a :href="to" @click="navigate">
        <slot />
    </a>
</template>

<script>
    export default {
        props: {
            to: { type: String, required: true },
        },
        methods: {
            navigate(event) {
                this.$router.push(this.to);
                event.preventDefault();
            },
        },
    };
</script>
