
<template>
    <component :is="$route.component" :key="$route.key" v-bind="{ ...$route.params, ...$route.props }" />
</template>
