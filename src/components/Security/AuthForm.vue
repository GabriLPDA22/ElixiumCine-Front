<template>
    <form @submit.prevent="submitForm" class="auth__form">
        <div class="auth__field">
            <label for="email" class="auth__label">Email</label>
            <input type="email" id="email" v-model="email" placeholder="Enter your email" class="auth__input"
                required />
        </div>

        <div class="auth__field">
            <label for="password" class="auth__label">Password</label>
            <input type="password" id="password" v-model="password" placeholder="Enter your password"
                class="auth__input" required />
        </div>

        <AuthButton :text="'Sign up'" />

        <div class="auth__options">
            <label class="auth__checkbox-label">
                <input type="checkbox" v-model="rememberMe" />
                Remember me
            </label>
        </div>
    </form>
</template>

<script>
import AuthButton from "/src/components/Security/AuthButton.vue";

export default {
    components: { AuthButton },
    data() {
        return {
            email: "",
            password: "",
            rememberMe: false,
        };
    },
    methods: {
        submitForm() {
            console.log("Email:", this.email, "Password:", this.password, "Remember Me:", this.rememberMe);
        },
    },
};
</script>

<style scoped>
.auth__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

}

.auth__field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.auth__label {
    font-size: 0.9rem;
    color: #dcdcdc;
}

.auth__input {
    padding: 0.8rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    background-color: #2e2e3b;
    color: #ffffff;

    &::placeholder {
        color: #888888;
    }

    &:focus {
        outline: 2px solid #ff2c78;
    }
}

.auth__options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
}

.auth__checkbox-label {
    font-size: 0.8rem;
    color: #dcdcdc;
    display: flex;
    align-items: center;

    & input {
        margin-right: 0.5rem;
    }
}
</style>