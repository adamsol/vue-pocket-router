
<template>
    <span>Error {{ code }}</span>
</template>

<script>
    export default {
        props: {
            code: { type: Number, required: true },
        },
    };
</script>
