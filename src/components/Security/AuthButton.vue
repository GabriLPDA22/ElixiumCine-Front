<template>
    <button type="submit" class="auth__button">
        {{ text }}
    </button>
</template>

<script>
export default {
    props: {
        text: { type: String, required: true },
    },
};
</script>

<style scoped>
.auth__button {
    padding: 0.8rem;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    background-color: #ff2c78;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #d45b8c;
    }
}
</style>