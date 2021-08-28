
<template>
    <span>Index page</span>
</template>

<script>
    export default {
        data: () => ({
            number: 0,
            created: false,
        }),
        created() {
            this.created = true;
        },
    };
</script>
