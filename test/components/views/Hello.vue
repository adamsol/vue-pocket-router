
<template>
    <span>{{ title }}, {{ user_name }}!</span>
</template>

<script>
    export default {
        props: {
            title: { type: String, default: 'Hello' },
            user_name: { type: String, required: true },
        },
    };
</script>
